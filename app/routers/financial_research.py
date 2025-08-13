from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.agents.crewai.financial_research import create_crew

router = APIRouter(prefix="/financial_research")


class Request(BaseModel):
    company: str


@router.post("/")
async def run_financial_research(request: Request) -> JSONResponse:
    if not request.company or not request.company.strip():
        raise HTTPException(status_code=400, detail="Company name is required")

    crew = create_crew(company=request.company)
    result = crew.kickoff()

    return JSONResponse(status_code=200, content=result.raw)
