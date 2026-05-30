from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    companyName: str

class UserResponse(BaseModel):
    id: str
    fullName: str
    email: str
    companyName: str
    createdAt: datetime
    profilePhoto: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    designation: Optional[str] = None
    companyAddress: Optional[str] = None
    companyPhone: Optional[str] = None
    companyEmail: Optional[str] = None
    companyWebsite: Optional[str] = None
    defaultFont: Optional[str] = "Times New Roman"
    defaultBorderColor: Optional[str] = "#2D136F"
    defaultLineSpacing: Optional[str] = "1.25"
    defaultLetterSpacing: Optional[str] = "0px"
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    fullName: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    designation: Optional[str] = None
    companyName: Optional[str] = None
    companyAddress: Optional[str] = None
    companyPhone: Optional[str] = None
    companyEmail: Optional[str] = None
    companyWebsite: Optional[str] = None
    defaultFont: Optional[str] = None
    defaultBorderColor: Optional[str] = None
    defaultLineSpacing: Optional[str] = None
    defaultLetterSpacing: Optional[str] = None

class ChangePasswordRequest(BaseModel):
    currentPassword: str
    newPassword: str
    

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
