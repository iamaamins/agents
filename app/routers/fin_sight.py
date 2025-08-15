from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.agents.crewai.fin_sight import create_crew
from app.lib.constants import MAX_SHORT_INPUT_LENGTH

router = APIRouter(prefix="/agents/fin-sight")


class Request(BaseModel):
    company: str


@router.post("")
async def run_fin_sight(request: Request) -> JSONResponse:
    company = request.company.strip()

    if not company:
        raise HTTPException(status_code=400, detail="Company name is required")

    if len(company) > MAX_SHORT_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail="Company name is too long")

    crew = create_crew(company=company)
    result = crew.kickoff()

    return JSONResponse(status_code=200, content={"content": result.raw})
