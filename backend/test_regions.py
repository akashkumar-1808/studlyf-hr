import asyncio
import asyncpg

regions = [
    "us-east-1", "us-west-1", "us-west-2", "eu-west-1", "eu-west-2", 
    "eu-west-3", "eu-central-1", "ap-southeast-1", "ap-southeast-2", 
    "ap-northeast-1", "ap-northeast-2", "ap-south-1", "sa-east-1", "ca-central-1"
]

password = "3qk4hpuz@HR"
user = "nwcstetmvwhfrzmhgpxw"
database = "postgres"
port = 6543

async def test_region(region):
    host = f"aws-0-{region}.pooler.supabase.com"
    try:
        conn = await asyncio.wait_for(
            asyncpg.connect(user=user, password=password, database=database, host=host, port=port),
            timeout=5.0
        )
        print(f"SUCCESS on region: {region}")
        await conn.close()
        return True
    except Exception as e:
        print(f"Failed {region}: {type(e).__name__} - {e}")
    return False

async def main():
    tasks = [test_region(r) for r in regions]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
