from typing import Optional
from agents import Agent, Runner
from sendgrid import Mail, SendGridAPIClient
from app.config.env import SENDGRID_API_KEY


def send_email(subject: str, body: str):
    """Send an email with the given body to all sales prospects"""

    sg = SendGridAPIClient(SENDGRID_API_KEY)

    mail = Mail(
        from_email="no-reply@alaminshaikh.com",
        to_emails="hello@alaminshaikh.com",
        subject=subject,
        html_content=body,
    )
    sg.send(mail)

    return "Email sent successfully"


async def run_task(agent: Agent, prompt: str, response_chunks: list):
    """Stream an agent response and get the chunks in a list"""

    separator = "\\n\\n"

    yield f"data: 🚀 [AGENT] Running {agent.name}\n\n"
    yield f"data: {separator}\n\n"

    results = Runner.run_streamed(agent, prompt)

    async for event in results.stream_events():
        if event.type == "raw_response_event":
            delta = getattr(event.data, "delta", None)
            if delta:
                escaped_delta = delta.replace("\n", "\\n")
                response_chunks.append(delta)
                yield f"data: {escaped_delta}\n\n"

    yield f"data: {separator}\n\n"
