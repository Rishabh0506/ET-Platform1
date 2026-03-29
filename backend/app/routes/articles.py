from fastapi import APIRouter
from app.services.data_pipeline import get_cached_articles, initialize_cache

router = APIRouter(prefix="/articles", tags=["articles"])

@router.on_event("startup")
async def startup_event():
    # Warm up the cache on server start
    pass

@router.get("/")
def get_articles():
    # Fetch from memory, if empty, initializes the RSS Fetch + LLM pipeline
    return get_cached_articles()

@router.post("/refresh")
def refresh_articles():
    # Expose an endpoint to force a cache refresh without restarting the server
    initialize_cache()
    return {"message": "Articles refreshed successfully."}
