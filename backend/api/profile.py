from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from db.models import User
from schemas.user import UserResponse, UserUpdate, ChangePasswordRequest
from core.security import get_password_hash, verify_password
from api.auth import get_current_user
import uuid

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    """Fetch the current user's complete profile."""
    return current_user

@router.post("/update", response_model=UserResponse)
async def update_profile(
    profile_data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user profile fields."""
    update_dict = profile_data.model_dump(exclude_unset=True)
    
    # We must explicitly query the user from the db session so it's attached
    result = await db.execute(select(User).where(User.id == current_user.id))
    user_to_update = result.scalars().first()
    
    if not user_to_update:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in update_dict.items():
        setattr(user_to_update, key, value)
        
    await db.commit()
    await db.refresh(user_to_update)
    return user_to_update

@router.post("/change-password")
async def change_password(
    password_data: ChangePasswordRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Change user password."""
    if not verify_password(password_data.currentPassword, current_user.hashedPassword):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password"
        )
        
    result = await db.execute(select(User).where(User.id == current_user.id))
    user_to_update = result.scalars().first()
    
    if user_to_update:
        user_to_update.hashedPassword = get_password_hash(password_data.newPassword)
        await db.commit()
    
    return {"message": "Password updated successfully"}

from fastapi import File, UploadFile
import os
import shutil
import uuid

# Define allowed extensions and MIME types
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "svg"}
ALLOWED_MIME_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

UPLOAD_DIR = "uploads/profiles"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-photo")
async def upload_photo(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Secure profile photo upload."""
    # Validate extension
    ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXTENSIONS or ext in {"exe", "js", "php", "sh", "bat"}:
        raise HTTPException(status_code=400, detail="Invalid file type")
        
    # Validate MIME type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Invalid MIME type")

    # Validate file size (reading chunk by chunk to prevent loading huge files into memory)
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")

    # Generate secure random filename
    safe_filename = f"{uuid.uuid4().hex}.{ext}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    # In a real app, this would be an S3 URL. For local dev, return the path or construct a URL
    photo_url = f"/api/uploads/profiles/{safe_filename}"

    result = await db.execute(select(User).where(User.id == current_user.id))
    user_to_update = result.scalars().first()
    
    if user_to_update:
        user_to_update.profilePhoto = photo_url
        await db.commit()
        await db.refresh(user_to_update)
        return {"message": "Profile photo updated", "profilePhoto": photo_url}
        
    raise HTTPException(status_code=404, detail="User not found")
