from collections.abc import AsyncGenerator
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.agents.openai.deep_research.agents import (
    research_assistant,
    search_agent,
    writer_agent,
)
from app.lib.utils import run_agent_streamed

router = APIRouter(prefix="/deep-research")


@router.get(path="/streaming/{topic}")
async def streaming(topic: str) -> StreamingResponse:
    if not topic or not topic.strip():
        raise HTTPException(status_code=400, detail="Research topic is required")

    async def event_generator() -> AsyncGenerator[str]:
        search_items_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=research_assistant,
            prompt=f"Generate search items for the following topic: {topic}",
            response_chunks=search_items_chunks,
        ):
            yield value

        search_result_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=search_agent,
            prompt=f"Run web search for the following search items: {"".join(search_items_chunks)}",
            response_chunks=search_result_chunks,
        ):
            yield value

        report_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=writer_agent,
            prompt=f"Write a research report with the following data: {"".join(search_result_chunks)}",
            response_chunks=report_chunks,
        ):
            yield value

    return StreamingResponse(content=event_generator(), media_type="text/event-stream")
