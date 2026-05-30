from fastapi import APIRouter, HTTPException, Depends, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from db.database import get_db
from db.models import Document, Template, EmailLog
from core.security import verify_token

router = APIRouter()

async def get_current_user_id(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = verify_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload.get("sub")

@router.get("/metrics")
async def get_dashboard_metrics(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # 1. Documents Created
    doc_count_query = await db.execute(select(func.count(Document.id)).where(Document.userId == user_id))
    documents_created = doc_count_query.scalar() or 0
    
    # 2. Recent Exports
    # Option 1: export_count in Documents. Option 2: count EmailLog for user's documents.
    # We added export_count to Document, so we can sum that up.
    export_sum_query = await db.execute(select(func.sum(Document.export_count)).where(Document.userId == user_id))
    recent_exports = export_sum_query.scalar() or 0
    
    # 3. Active Templates
    template_count_query = await db.execute(select(func.count(Template.id)))
    active_templates = template_count_query.scalar() or 0
    
    # 4. Time Saved (10 mins per document)
    time_saved_mins = documents_created * 10
    time_saved_hrs = time_saved_mins // 60
    time_saved_remaining_mins = time_saved_mins % 60
    
    if time_saved_hrs > 0:
        time_saved_str = f"{time_saved_hrs} hr {time_saved_remaining_mins} min" if time_saved_remaining_mins > 0 else f"{time_saved_hrs} hrs"
    else:
        time_saved_str = f"{time_saved_remaining_mins} mins"

    return {
        "documentsCreated": documents_created,
        "recentExports": recent_exports,
        "activeTemplates": active_templates,
        "timeSaved": time_saved_str
    }
