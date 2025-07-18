from app.config.ai import claude_client
from agents import Agent, OpenAIChatCompletionsModel, Runner
from app.agents.sales_manager.tools import sales_manager_tools, email_manager_tools

email_manager = Agent(
    name="Email Manager",
    instructions="You are an email formatter and sender. You receive the body of an email to be sent. You first use the subject_writer tool to write a subject for the email, then use the html_converter tool to convert the body to HTML. Finally, you use the send_email tool to send the email with the subject and HTML body.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
    tools=email_manager_tools,
    handoff_description="Convert an email to HTML and send it",
)

sales_manager = Agent(
    name="Sales manager",
    instructions="You are a sales manager working for GenAI. You use the tools given to you to generate cold sales emails. You never generate sales emails yourself; you always use the tools. You try all 3 sales agent tools at least once before choosing the best one. You can use the tools multiple times if you're not satisfied with the results from the first try. You select the single best email using your own judgement of which email will be most effective. After picking the email, you handoff to the Email Manager agent to format and send the email.",
    model=OpenAIChatCompletionsModel(
        model="claude-3-5-haiku-latest", openai_client=claude_client
    ),
    tools=sales_manager_tools,
    handoffs=[email_manager],
)


async def run_sales_manager():
    result = await Runner.run(
        sales_manager,
        "Send out a cold sales email addressed to Dear CEO from Alice",
    )
    return result.final_output
