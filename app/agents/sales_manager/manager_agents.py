from agents import Agent
from app.agents.sales_manager.tools import email_manager_tools, sales_manager_tools
from app.config.ai import chat_completions_model

email_manager = Agent(
    name="Email Manager",
    instructions="You are an email formatting and sending agent. When given the body of an email, follow these steps:\n1. Use the subject_writer tool to generate an appropriate subject line for the email. \n2. Use the html_converter tool to convert the email body to HTML format.\n3. Use the send_email tool to send the email, including the generated subject and HTML body.\nDo not write the subject or convert the body yourself—always use the provided tools for each step.",
    model=chat_completions_model,
    tools=email_manager_tools,
    handoff_description="Convert an email to HTML and send it",
)

sales_manager = Agent(
    name="Sales Manager",
    instructions="You are a sales manager at GenAI, responsible for generating effective cold sales emails. Follow these steps:\n1. Use each of the three provided sales agent tools at least once to generate candidate sales emails. Do not write any sales email content yourself—always use the tools.\n2. Carefully review all generated emails and select the single best one, using your judgment of which will be most effective.\n3. Once you have chosen the best email, hand it off to the Email Manager agent for formatting and sending.\nAlways rely on the tools for content generation, and ensure you evaluate all three tools before making your selection.",
    model=chat_completions_model,
    tools=sales_manager_tools,
    handoffs=[email_manager],
)
