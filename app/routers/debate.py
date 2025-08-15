from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.agents.crewai.debate import create_crew
from app.lib.constants import MAX_MEDIUM_INPUT_LENGTH

router = APIRouter(prefix="/agents/debate")


class Request(BaseModel):
    topic: str


@router.post(path="")
async def run_debate(request: Request) -> JSONResponse:
    if not request.topic or not request.topic.strip():
        raise HTTPException(status_code=400, detail="Debate topic is required")

    if len(request.topic) > MAX_MEDIUM_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail="Debate topic is too long")

    crew = create_crew(topic=request.topic)
    result = crew.kickoff()

    return JSONResponse(status_code=200, content={"content": result.raw})
