from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.agents.crewai.debate import create_crew

router = APIRouter(prefix="/debate")


class Request(BaseModel):
    topic: str


@router.post(path="/autonomous")
async def autonomous(request: Request) -> JSONResponse:
    if not request.topic or not request.topic.strip():
        raise HTTPException(status_code=400, detail="Topic is required")

    crew = create_crew(topic=request.topic)
    result = crew.kickoff()

    return JSONResponse(status_code=200, content=result.raw)
