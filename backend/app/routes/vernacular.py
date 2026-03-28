from fastapi import APIRouter
from pydantic import BaseModel
from app.services.vernacular_service import generate_vernacular

router = APIRouter(prefix="/vernacular", tags=["vernacular"])


class VernacularRequest(BaseModel):
    article: dict
    language: str


class VernacularResponse(BaseModel):
    content: str


@router.post("/", response_model=VernacularResponse)
def get_vernacular(request: VernacularRequest):
    content = generate_vernacular(request.article, request.language)
    return {"content": content}
