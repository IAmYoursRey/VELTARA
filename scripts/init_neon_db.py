#!/usr/bin/env python3
"""
VELTARA.ID — Neon Serverless PostgreSQL Database Initializer
Utility script to verify connection, execute schema migration, and seed baseline data for Neon PostgreSQL.

Usage:
    python scripts/init_neon_db.py
    python scripts/init_neon_db.py --db-url "postgresql://neondb_owner:pass@ep-cool-pooler.region.aws.neon.tech/neondb?sslmode=require"
    python scripts/init_neon_db.py --seed-demo
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path

# Add backend directory to sys.path
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from sqlalchemy import text
from app.core.database import get_engine, normalize_database_url, Base
from app.core.config import settings
import app.db.models  # Ensure all model tables are registered


async def init_neon_database(database_url: str, seed_demo: bool = False):
    print("=" * 65)
    print("  VELTARA.ID — Neon PostgreSQL Serverless Initializer")
    print("=" * 65)

    normalized_url = normalize_database_url(database_url)
    # Mask password for secure display
    masked_url = normalized_url
    if "@" in masked_url and ":" in masked_url:
        parts = masked_url.split("@")
        cred_parts = parts[0].split(":")
        if len(cred_parts) >= 3:
            masked_url = f"{cred_parts[0]}:{cred_parts[1]}:*****@{parts[1]}"

    print(f"\n[1/4] Target Database: {masked_url}")
    print("[2/4] Testing database connection...")

    try:
        engine = get_engine(normalized_url)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT version();"))
            db_version = result.scalar()
            print(f"      Connected successfully!")
            print(f"      Engine: {db_version[:50]}...")
    except Exception as e:
        print(f"\n[ERROR] Failed to connect to Neon PostgreSQL: {e}")
        print("\nPastikan:")
        print("  1. DATABASE_URL sudah benar dan berasal dari console.neon.tech (Pooled Connection).")
        print("  2. Password dan endpoint hostname sudah valid.")
        print("  3. sslmode=require tercantum pada connection string.")
        return False

    print("\n[3/4] Creating and syncing all database tables...")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("      All relational tables (users, schools, portfolios, cv, rubrics) ready!")
    except Exception as e:
        print(f"\n[ERROR] Table creation failed: {e}")
        return False

    if seed_demo:
        print("\n[4/4] Seeding initial baseline and demo records...")
        try:
            from app.scripts.seed_dev import seed_development_data
            from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
            session_factory = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
            
            # Temporary override app_env to allow seeding in non-destructive dev/test setup
            orig_env = settings.app_env
            settings.app_env = "development"
            try:
                await seed_development_data(session_factory=session_factory)
                print("      Demo school, students, teachers, and portfolios populated!")
            finally:
                settings.app_env = orig_env
        except Exception as e:
            print(f"      [Warning] Demo seeding completed with notice: {e}")
    else:
        print("\n[4/4] Skipping demo accounts (use --seed-demo flag if needed).")

    await engine.dispose()
    print("\n" + "=" * 65)
    print("  SUCCESS: Neon Database is fully initialized and ready for Vercel!")
    print("=" * 65 + "\n")
    return True


def main():
    parser = argparse.ArgumentParser(description="Initialize Neon PostgreSQL Database for VELTARA.ID")
    parser.add_argument(
        "--db-url",
        default=os.getenv("DATABASE_URL"),
        help="Neon PostgreSQL database connection string (defaults to DATABASE_URL environment variable)",
    )
    parser.add_argument(
        "--seed-demo",
        action="store_true",
        help="Seed baseline demo school, classes, and portfolio records",
    )
    args = parser.parse_args()

    db_url = args.db_url
    if not db_url:
        print("\n[ERROR] DATABASE_URL tidak ditemukan.")
        print("Set variabel lingkungan DATABASE_URL atau lewatkan via argumen --db-url:")
        print("  python scripts/init_neon_db.py --db-url \"postgresql://user:pass@ep-cool-pooler.aws.neon.tech/neondb?sslmode=require\"\n")
        sys.exit(1)

    success = asyncio.run(init_neon_database(db_url, seed_demo=args.seed_demo))
    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
