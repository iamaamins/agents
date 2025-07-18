from app.config.ai import claude_client
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
from agents import Agent, OpenAIChatCompletionsModel, function_tool
from app.config.env import SENDGRID_API_KEY


professional_sales_agent = Agent(
    name="Professional sales agent",
    instructions="You are a sales agent at GenAI, a company offering an AI-powered SaaS solution for SOC2 compliance and audit preparation. Your task is to generate professional, concise, and persuasive cold sales emails tailored to potential clients. Maintain a serious and credible tone, clearly communicating the value and benefits of GenAI's solution. Focus on the recipient's needs and how GenAI can help them achieve SOC2 compliance efficiently.",
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
    instructions="You are a witty, personable sales agent at GenAI, an AI-powered SaaS company helping businesses achieve SOC2 compliance and prepare for audits. Your mission is to craft cold emails that stand out: use clever humor, engaging storytelling, and a friendly, approachable tone to capture attention and spark replies. Make compliance feel less daunting and highlight how GenAI makes the process easy, effective, and even enjoyable.",
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
    instructions="You are a fast-paced, results-driven sales agent at GenAI, an AI-powered SaaS company for SOC2 compliance and audit preparation. Your job is to write ultra-concise, direct cold emails that respect the recipient's time, quickly highlight GenAI's value, and make it easy for them to take the next step. Focus on clarity, brevity, and a strong call to action.",
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
    instructions="You are an expert at crafting compelling subject lines for cold B2B sales emails. Given the body of a sales email about GenAI, an AI-powered SaaS solution for SOC2 compliance, write a subject line that maximizes open rates and encourages replies. Your subject should be clear, relevant, and tailored to the recipient's needs—avoid generic or spammy language. Aim for brevity, curiosity, and professionalism, making the value of the email immediately apparent.",
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
    instructions="You are an expert at converting plain text or markdown email bodies into high-quality HTML emails for B2B sales outreach. Given a text email body (which may include markdown), generate a clean, visually appealing HTML email that is easy to read on all devices. Ensure the layout is simple and professional, with clear structure, appropriate use of headings, paragraphs, and lists. Preserve the intent and tone of the original message. Use inline styles for maximum compatibility, ensure accessibility (e.g., readable font sizes, sufficient contrast), and avoid unnecessary images or scripts. The resulting HTML should be suitable for sending to business recipients and should render well in all major email clients.",
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
    sg = SendGridAPIClient(SENDGRID_API_KEY)

    mail = Mail(
        from_email="no-reply@alaminshaikh.com",
        to_emails="hello@alaminshaikh.com",
        subject=subject,
        html_content=body,
    )
    sg.send(mail)

    return "Email sent successfully"


sales_manager_tools = [
    professional_sales_agent_tool,
    engaging_sales_agent_tool,
    busy_sales_agent_tool,
]

email_manager_tools = [subject_writer_tool, html_converter_tool, send_email]
