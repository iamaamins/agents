from collections.abc import AsyncGenerator
from agents import Runner
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from app.agents.openai.deep_research.manager_agents import research_manager
from app.agents.openai.deep_research.worker_agents import (
    research_assistant_agent,
    research_agent,
    report_writer_agent,
)
from app.lib.utils import run_agent_streamed
from app.lib.constants import MAX_MEDIUM_INPUT_LENGTH

router = APIRouter(prefix="/agents/deep-research")


class Request(BaseModel):
    topic: str


@router.post(path="/autonomous")
async def autonomous(request: Request) -> JSONResponse:
    if not request.topic or not request.topic.strip():
        raise HTTPException(status_code=400, detail="Research topic is required")

    if len(request.topic) > MAX_MEDIUM_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail="Research topic is too long")

    try:
        result = await Runner.run(
            starting_agent=research_manager,
            input=f"Conduct a deep research for the following topic: {request.topic}",
        )

        return JSONResponse(
            status_code=200, content={"content": result.final_output.model_dump()}
        )
    except:
        raise


@router.get(path="/streaming")
async def streaming(request: Request) -> StreamingResponse:
    if not request.topic or not request.topic.strip():
        raise HTTPException(status_code=400, detail="Research topic is required")

    async def event_generator() -> AsyncGenerator[str]:
        search_items_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=research_assistant_agent,
            prompt=f"Generate search items for the following topic: {request.topic}",
            response_chunks=search_items_chunks,
        ):
            yield value

        search_result_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=research_agent,
            prompt=f"Run web search for the following search items: {"".join(search_items_chunks)}",
            response_chunks=search_result_chunks,
        ):
            yield value

        report_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=report_writer_agent,
            prompt=f"Write a research report with the following data: {"".join(search_result_chunks)}",
            response_chunks=report_chunks,
        ):
            yield value

    return StreamingResponse(content=event_generator(), media_type="text/event-stream")
