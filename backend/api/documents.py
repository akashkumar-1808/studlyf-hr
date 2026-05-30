from fastapi import APIRouter, HTTPException, Depends, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from datetime import datetime

from db.database import get_db
from db.models import Document, User, RecentEdit
from schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse
from core.security import verify_token

router = APIRouter()

async def get_current_user_id(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = verify_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload.get("sub")

@router.post("/create", response_model=DocumentResponse)
async def create_document(doc: DocumentCreate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    new_doc = Document(
        userId=user_id,
        title=doc.title,
        type=doc.type,
        status=doc.status,
        template_id=doc.template_id,
        candidateDetails=doc.candidateDetails,
        contentJSON=doc.contentJSON,
        brandingId=doc.brandingId,
        exportUrl=doc.exportUrl
    )
    db.add(new_doc)
    await db.commit()
    await db.refresh(new_doc)

    # Log recent edit
    recent_edit = RecentEdit(userId=user_id, documentId=new_doc.id)
    db.add(recent_edit)
    await db.commit()

    return new_doc

@router.get("/", response_model=List[DocumentResponse])
async def list_documents(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.userId == user_id).order_by(Document.updatedAt.desc()))
    documents = result.scalars().all()
    return documents

@router.get("/{doc_id}", response_model=DocumentResponse)
async def get_document(doc_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.id == doc_id, Document.userId == user_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Update last_opened_at
    doc.last_opened_at = datetime.utcnow()
    await db.commit()
    await db.refresh(doc)
    
    return doc

@router.put("/update/{doc_id}", response_model=DocumentResponse)
async def update_document(doc_id: str, doc_update: DocumentUpdate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.id == doc_id, Document.userId == user_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    update_data = doc_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(doc, key, value)
        
    await db.commit()
    await db.refresh(doc)
    
    # Update or Create Recent Edit
    result_edit = await db.execute(select(RecentEdit).where(RecentEdit.documentId == doc_id, RecentEdit.userId == user_id))
    recent_edit = result_edit.scalars().first()
    if recent_edit:
        recent_edit.lastEditedAt = datetime.utcnow()
    else:
        new_edit = RecentEdit(userId=user_id, documentId=doc_id)
        db.add(new_edit)
    
    await db.commit()

    return doc

@router.delete("/delete/{doc_id}")
async def delete_document(doc_id: str, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.id == doc_id, Document.userId == user_id))
    doc = result.scalars().first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    await db.delete(doc)
    await db.commit()
    return {"message": "Document deleted successfully"}
