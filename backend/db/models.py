import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    fullName = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashedPassword = Column(String, nullable=False)
    companyName = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Personal Profile Additions
    profilePhoto = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    country = Column(String, nullable=True)
    designation = Column(String, nullable=True)

    # Company Additions
    companyAddress = Column(String, nullable=True)
    companyPhone = Column(String, nullable=True)
    companyEmail = Column(String, nullable=True)
    companyWebsite = Column(String, nullable=True)

    # Preferences Additions
    defaultFont = Column(String, default="Times New Roman")
    defaultBorderColor = Column(String, default="#2D136F")
    defaultLineSpacing = Column(String, default="1.25")
    defaultLetterSpacing = Column(String, default="0px")

    branding = relationship("CompanyBranding", back_populates="user", uselist=False)
    documents = relationship("Document", back_populates="user")
    recentEdits = relationship("RecentEdit", back_populates="user")


class CompanyBranding(Base):
    __tablename__ = "company_branding"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id"), unique=True)
    logoUrl = Column(String, nullable=True)
    primaryColor = Column(String, default="#2D136F")
    secondaryColor = Column(String, default="#5D22D8")
    letterheadUrl = Column(String, nullable=True)
    signatureUrl = Column(String, nullable=True)
    sealUrl = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="branding")


class Template(Base):
    __tablename__ = "templates"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # 'OFFER_LETTER', 'JOINING_LETTER'
    baseJSON = Column(JSON, nullable=False)
    isReusable = Column(Boolean, default=False)
    thumbnailUrl = Column(String, nullable=True)
    isPremium = Column(Boolean, default=False)
    layoutType = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)


class Document(Base):
    __tablename__ = "documents"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id"))
    type = Column(String, nullable=False) # 'OFFER_LETTER', 'JOINING_LETTER'
    
    # New Fields for Dashboard
    title = Column(String, nullable=True)
    status = Column(String, default="draft") # 'draft', 'completed', 'exported', 'archived'
    last_opened_at = Column(DateTime, default=datetime.utcnow)
    export_count = Column(Integer, default=0) # Need to import Integer from sqlalchemy
    template_id = Column(String, ForeignKey("templates.id"), nullable=True)

    candidateDetails = Column(JSON, nullable=False)
    contentJSON = Column(JSON, nullable=False)
    brandingId = Column(String, ForeignKey("company_branding.id"), nullable=True)
    exportUrl = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="documents")
    branding = relationship("CompanyBranding")
    emailLogs = relationship("EmailLog", back_populates="document")
    recentEdits = relationship("RecentEdit", back_populates="document")


class RecentEdit(Base):
    __tablename__ = "recent_edits"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id"))
    documentId = Column(String, ForeignKey("documents.id"))
    lastEditedAt = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recentEdits")
    document = relationship("Document", back_populates="recentEdits")


class EmailLog(Base):
    __tablename__ = "email_logs"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    documentId = Column(String, ForeignKey("documents.id"))
    recipientEmail = Column(String, nullable=False)
    status = Column(String, nullable=False) # 'SENT', 'FAILED', 'PENDING'
    sentAt = Column(DateTime, default=datetime.utcnow)

    document = relationship("Document", back_populates="emailLogs")
