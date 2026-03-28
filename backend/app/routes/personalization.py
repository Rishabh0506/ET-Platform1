from fastapi import APIRouter
from pydantic import BaseModel
from app.services.impact_service import generate_impact

router = APIRouter(prefix="/impact", tags=["personalization"])


class ImpactRequest(BaseModel):
    article: dict
    persona: str


class ImpactResponse(BaseModel):
    impact: str


@router.post("/", response_model=ImpactResponse)
def get_impact(request: ImpactRequest):
    insight = generate_impact(request.article, request.persona)
    return {"impact": insight}
