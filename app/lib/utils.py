from agents import Agent, Runner
from sendgrid import Mail, SendGridAPIClient
from app.config.env import SENDGRID_API_KEY


def send_email(subject: str, body: str, recipient: str):
    """Send an email with the given body to the recipient"""

    sg = SendGridAPIClient(SENDGRID_API_KEY)

    mail = Mail(
        from_email="no-reply@alaminshaikh.com",
        to_emails=recipient,
        subject=subject,
        html_content=body,
    )
    sg.send(mail)

    return "Email sent successfully"


async def run_agent_streamed(agent: Agent, prompt: str, response_chunks: list):
    """Stream the agent response and get the chunks in a list"""

    separator = "\\n\\n"

    yield f"data: 🤹 [AGENT] Running {agent.name}\n\n"
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
