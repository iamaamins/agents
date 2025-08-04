from crewai import Agent, Task, Crew, Process
from app.config.ai import get_crewai_llm

llm = get_crewai_llm()


def create_crew(topic: str) -> Crew:
    """Creates and returns a CrewAI Crew based on a given topic"""

    debater_agent = Agent(
        role="A compelling debater",
        goal=f"Present a clear argument either in favor of or against the topic. The topic is: {topic}",
        backstory=f"You're an experienced debator with a knack for giving concise but convincing arguments. The topic is: {topic}",
        llm=llm,
    )

    judge_agent = Agent(
        role="A fair judge",
        goal=f"Given arguments for and against this topic: {topic}, decide which side is more convincing, based purely on the arguments presented.",
        backstory="You are a fair judge with a reputation for weighing up arguments without factoring in your own views, and making a decision based purely on the merits of the argument. The topic is: {topic}",
        llm=llm,
    )

    propose_task = Task(
        description=f"You are proposing the topic: {topic}. Come up with a clear argument in favor of the topic. Be very convincing.",
        expected_output="Your clear argument in favor of the topic, in a concise manner.",
        agent=debater_agent,
    )

    oppose_task = Task(
        description=f"You are in opposition to the topic: {topic}. Come up with a clear argument against the topic. Be very convincing.",
        expected_output="Your clear argument against the topic, in a concise manner.",
        agent=debater_agent,
    )

    decide_task = Task(
        description="Review the arguments presented by the debaters and decide which side is more convincing.",
        expected_output="Your decision on which side is more convincing, and why.",
        agent=judge_agent,
    )

    crew = Crew(
        agents=[debater_agent, judge_agent],
        tasks=[propose_task, oppose_task, decide_task],
        process=Process.sequential,
    )

    return crew
