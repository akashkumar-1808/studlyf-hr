import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def test_connection():
    try:
        print(f"Connecting to: {DATABASE_URL.split('@')[-1]}")
        engine = create_async_engine(DATABASE_URL)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Connection successful! Result:", result.scalar())
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
