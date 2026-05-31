from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Cookie,
    Request,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import os

from db.database import get_db
from db.models import User, CompanyBranding
from schemas.user import (
    UserCreate,
    UserResponse,
    LoginRequest,
)
from core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    verify_token,
)
from core.ratelimit import limiter

router = APIRouter()

# Production check
is_prod = (
    os.getenv("ENVIRONMENT", "")
    .lower()
    == "production"
)


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("3/minute")
async def signup(
    request: Request,
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    # Check if email exists
    result = await db.execute(
        select(User).where(
            User.email == user_in.email
        )
    )
    existing_user = (
        result.scalars().first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(
        user_in.password
    )

    new_user = User(
        fullName=user_in.fullName,
        email=user_in.email,
        hashedPassword=hashed_password,
        companyName=user_in.companyName,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Create branding profile
    new_branding = CompanyBranding(
        userId=new_user.id
    )

    db.add(new_branding)
    await db.commit()

    return new_user


@router.post("/login")
@limiter.limit("5/minute")
async def login(
    request: Request,
    response: Response,
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.email == login_data.email
        )
    )

    user = result.scalars().first()

    if (
        not user
        or not verify_password(
            login_data.password,
            user.hashedPassword,
        )
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = (
        create_access_token(
            data={
                "sub": str(user.id)
            }
        )
    )

    refresh_token = (
        create_refresh_token(
            data={
                "sub": str(user.id)
            }
        )
    )

    # Access token cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=24 * 60 * 60,
        path="/",
    )

    # Refresh token cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7 * 24 * 60 * 60,
        path="/",
    )

    return {
        "message":
            "Login successful",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "fullName":
                user.fullName,
        },
    }


@router.post("/refresh")
async def refresh_token_route(
    response: Response,
    refresh_token: str = Cookie(
        None
    ),
    db: AsyncSession = Depends(get_db),
):
    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail=
                "No refresh token",
        )

    payload = verify_token(
        refresh_token
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail=
                "Invalid or expired refresh token",
        )

    user_id = payload.get("sub")

    result = await db.execute(
        select(User).where(
            User.id == user_id
        )
    )

    user = result.scalars().first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail=
                "User not found",
        )

    new_access_token = (
        create_access_token(
            data={
                "sub":
                    str(user.id)
            }
        )
    )

    response.set_cookie(
        key="access_token",
        value=
            new_access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=24 * 60 * 60,
        path="/",
    )

    return {
        "message":
            "Token refreshed successfully"
    }


@router.post("/logout")
async def logout(
    response: Response,
):
    response.delete_cookie(
        key="access_token",
        secure=True,
        httponly=True,
        samesite="none",
        path="/",
    )

    response.delete_cookie(
        key="refresh_token",
        secure=True,
        httponly=True,
        samesite="none",
        path="/",
    )

    return {
        "message":
            "Logged out successfully"
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
async def get_current_user(
    access_token: str = Cookie(
        None
    ),
    db: AsyncSession = Depends(get_db),
):
    if not access_token:
        raise HTTPException(
            status_code=401,
            detail=
                "Not authenticated",
        )

    payload = verify_token(
        access_token
    )

    if not payload:
        raise HTTPException(
            status_code=401,
            detail=
                "Invalid or expired token",
        )

    user_id = payload.get("sub")

    result = await db.execute(
        select(User).where(
            User.id == user_id
        )
    )

    user = result.scalars().first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail=
                "User not found",
        )

    return user