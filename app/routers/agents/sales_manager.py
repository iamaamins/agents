from fastapi import APIRouter
from agents import ItemHelpers
from fastapi.responses import StreamingResponse
from app.agents.sales_manager.managers import run_sales_manager_streamed

router = APIRouter()


@router.get("/sales-manager/stream-actions")
async def stream_actions():
    async def event_generator():
        results = await run_sales_manager_streamed()
        async for event in results.stream_events():
            if event.type == "agent_updated_stream_event":
                message = f"Agent: {event.new_agent.name}"
                yield f"data: {message}\n\n"
            elif event.type == "run_item_stream_event":
                if event.item.type == "tool_call_item":
                    message = ""
                    tool_name = getattr(event.item.raw_item, "name")
                    if tool_name == "professional_sales_agent":
                        message = f"Generating professional email"
                    elif tool_name == "engaging_sales_agent":
                        message = f"Generating engaging email"
                    elif tool_name == "busy_sales_agent":
                        message = f"Generating concise email"
                    elif tool_name == "subject_writer":
                        message = f"Generating email subject"
                    elif tool_name == "html_converter":
                        message = f"Converting email into HTML"
                    elif tool_name == "send_email":
                        message = f"Sending email to the user"
                    yield f"data: {message}\n\n"
                elif event.item.type == "tool_call_output_item":
                    tool_output = f"{event.item.output}"
                    if tool_output.endswith("successfully"):
                        yield f"data: {tool_output} 🚀\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
