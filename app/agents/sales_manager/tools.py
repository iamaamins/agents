import os
from app.config.ai import claude_client
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
from agents import Agent, OpenAIChatCompletionsModel, function_tool


professional_sales_agent = Agent(
    name="Professional sales agent",
    instructions="You are a sales agent working for GenAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write professional, serious cold emails.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
)
professional_sales_agent_tool = professional_sales_agent.as_tool(
    tool_name="professional_sales_agent",
    tool_description="Write a professional sales email",
)

engaging_sales_agent = Agent(
    name="Engaging sales agent",
    instructions="You are a humorous, engaging sales agent working for GenAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write witty, engaging cold emails that are likely to get a response.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
)
engaging_sales_agent_tool = engaging_sales_agent.as_tool(
    tool_name="engaging_sales_agent",
    tool_description="Write an engaging sales email",
)

busy_sales_agent = Agent(
    name="Busy sales agent",
    instructions="You are a busy sales agent working for GenAI, a company that provides a SaaS tool for ensuring SOC2 compliance and preparing for audits, powered by AI. You write concise, to the point cold emails.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
)
busy_sales_agent_tool = busy_sales_agent.as_tool(
    tool_name="busy_sales_agent",
    tool_description="Write a concise sales email",
)

subject_writer = Agent(
    name="Email subject writer",
    instructions="You can write a subject for a cold sales email. You are given a message and you need to write a subject for an email that is likely to get a response.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
)
subject_writer_tool = subject_writer.as_tool(
    tool_name="subject_writer",
    tool_description="Write a subject for a cold sales email",
)

html_converter = Agent(
    name="HTML email body converter",
    instructions="You can convert a text email body to an HTML email body. You are given a text email body which might have some markdown and you need to convert it to an HTML email body with simple, clear, compelling layout and design",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
)
html_converter_tool = html_converter.as_tool(
    tool_name="html_converter",
    tool_description="Convert a text email body to an HTML email body",
)


@function_tool
def send_email(subject: str, body: str):
    """Send an email with the given body to all sales prospects"""
    sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

    mail = Mail(
        from_email="no-reply@alaminshaikh.com",
        to_emails="hello@alaminshaikh.com",
        subject=subject,
        html_content=body,
    )
    sg.send(mail)

    return {"status": "success"}


sales_manager_tools = [
    professional_sales_agent_tool,
    engaging_sales_agent_tool,
    busy_sales_agent_tool,
]

email_manager_tools = [subject_writer_tool, html_converter_tool, send_email]
