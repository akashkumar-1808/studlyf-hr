import asyncio
from sqlalchemy import select
from db.database import AsyncSessionLocal
from db.models import User
import uuid

async def test_crud():
    print("Starting CRUD test...")
    try:
        async with AsyncSessionLocal() as session:
            # Create
            test_email = f"test_{uuid.uuid4()}@example.com"
            new_user = User(
                email=test_email,
                hashedPassword="fakehashedpassword",
                fullName="Test User",
                companyName="Test Company"
            )
            session.add(new_user)
            await session.commit()
            print(f"Created user with email: {new_user.email}")
            
            # Read
            result = await session.execute(select(User).where(User.email == test_email))
            fetched_user = result.scalar_one_or_none()
            if fetched_user:
                print(f"Successfully fetched user: {fetched_user.fullName}")
            else:
                print("Failed to fetch user.")
                return False
                
            # Update (optional but good)
            fetched_user.fullName = "Updated Test User"
            await session.commit()
            print("Successfully updated user.")
            
            # Delete
            await session.delete(fetched_user)
            await session.commit()
            print("Successfully deleted user.")
            
            return True
            
    except Exception as e:
        print(f"CRUD test failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_crud())
