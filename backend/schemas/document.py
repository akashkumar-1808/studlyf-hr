from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class DocumentBase(BaseModel):
    title: Optional[str] = "Untitled Document"
    type: str
    status: str = "draft"
    template_id: Optional[str] = None
    candidateDetails: Dict[str, Any]
    contentJSON: Dict[str, Any]
    brandingId: Optional[str] = None
    exportUrl: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None
    template_id: Optional[str] = None
    candidateDetails: Optional[Dict[str, Any]] = None
    contentJSON: Optional[Dict[str, Any]] = None
    brandingId: Optional[str] = None
    exportUrl: Optional[str] = None
    last_opened_at: Optional[datetime] = None
    export_count: Optional[int] = None

class DocumentResponse(DocumentBase):
    id: str
    userId: str
    last_opened_at: datetime
    export_count: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
