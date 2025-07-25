from agents import Runner
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from app.agents.openai.sales_flow.worker_agents import (
    best_email_picker,
    busy_sales_agent,
    engaging_sales_agent,
    html_converter,
    professional_sales_agent,
    subject_writer,
    html_converter,
)
from app.agents.openai.sales_flow.manager_agents import sales_manager
from app.lib.utils import run_agent_streamed, send_email

router = APIRouter()


@router.post("/sales-flow/autonomous/{email}")
async def autonomous(email: str):
    if not email or not email.strip():
        raise HTTPException(status_code=400, detail="Email is required")

    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Invalid email format")

    result = await Runner.run(
        sales_manager,
        f"Send out a cold sales email addressed to Dear CEO from Head of Business Development to: {email}",
    )
    return JSONResponse(content=result.final_output, status_code=200)


@router.get("/sales-flow/streaming/{email}")
async def streaming(email: str):
    if not email or not email.strip():
        raise HTTPException(status_code=400, detail="Email is required")

    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Invalid email format")

    async def event_generator():
        emails: list[str] = []

        # Generate professional email
        professional_email_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=professional_sales_agent,
            prompt="Write a professional sales email",
            response_chunks=professional_email_chunks,
        ):
            yield value
        emails.append("".join(professional_email_chunks))

        # Generate engaging email
        engaging_email_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=engaging_sales_agent,
            prompt="Write an engaging sales email",
            response_chunks=engaging_email_chunks,
        ):
            yield value
        emails.append("".join(engaging_email_chunks))

        # Generate concise email
        concise_email_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=busy_sales_agent,
            prompt="Write a concise sales email",
            response_chunks=concise_email_chunks,
        ):
            yield value
        emails.append("".join(concise_email_chunks))

        # Pick the best email
        best_email_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=best_email_picker,
            prompt=f"Pick the best email from the following options:\n\n{"\n\n---\n\n".join(emails)}",
            response_chunks=best_email_chunks,
        ):
            yield value

        # Generate email subject
        subject_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=subject_writer,
            prompt=f"Write a subject for the following cold sales email: \n\n{"".join(best_email_chunks)}",
            response_chunks=subject_chunks,
        ):
            yield value

        # Convert email to html
        html_chunks: list[str] = []
        async for value in run_agent_streamed(
            agent=html_converter,
            prompt=f"Convert the following text email body to an HTML email body: {''.join(best_email_chunks)}",
            response_chunks=html_chunks,
        ):
            yield value

        # Send email
        yield "data: 📤 [ACTION] Sending email\n\n"
        yield "data: \\n\\n\n\n"
        send_email(
            subject="".join(subject_chunks), body="".join(html_chunks), recipient=email
        )
        yield "data: ✅ [SUCCESS] Email sent successfully\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
