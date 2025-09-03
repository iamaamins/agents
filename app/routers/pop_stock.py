from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.lib.constants import MAX_SHORT_INPUT_LENGTH
from app.agents.crewai.pop_stock import create_crew

router = APIRouter(prefix="/agents/pop-stock")


class Request(BaseModel):
    sector: str


@router.post("/")
async def run_pop_stock(request: Request) -> JSONResponse:
    sector = request.sector.strip()

    if not sector:
        raise HTTPException(status_code=400, detail="Sector is required")

    if len(sector) > MAX_SHORT_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail="Sector is too long")

    crew = create_crew(sector=sector)
    result = crew.kickoff()

    return JSONResponse(status_code=200, content={"content": result.raw})
