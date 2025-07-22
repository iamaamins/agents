from app.agents.sales_manager.worker_agents import (
    busy_sales_agent,
    engaging_sales_agent,
    html_converter,
    professional_sales_agent,
    subject_writer,
)
from agents import function_tool
from app.lib.utils import send_email


professional_sales_agent_tool = professional_sales_agent.as_tool(
    tool_name="professional_sales_agent",
    tool_description="Write a professional sales email",
)

engaging_sales_agent_tool = engaging_sales_agent.as_tool(
    tool_name="engaging_sales_agent",
    tool_description="Write an engaging sales email",
)

busy_sales_agent_tool = busy_sales_agent.as_tool(
    tool_name="busy_sales_agent",
    tool_description="Write a concise sales email",
)

subject_writer_tool = subject_writer.as_tool(
    tool_name="subject_writer",
    tool_description="Write a subject for a cold sales email",
)

html_converter_tool = html_converter.as_tool(
    tool_name="html_converter",
    tool_description="Convert a text email body to an HTML email body",
)


@function_tool
def send_html_email(subject: str, body: str):
    send_email(subject=subject, body=body)


sales_manager_tools = [
    professional_sales_agent_tool,
    engaging_sales_agent_tool,
    busy_sales_agent_tool,
]

email_manager_tools = [subject_writer_tool, html_converter_tool, send_html_email]
