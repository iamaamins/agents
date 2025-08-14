---
title: AI Agents
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
sdk_version: '1.0'
app_file: main.py
pinned: false
---

# AI Agents Service

This is a FastAPI-based service that provides various AI agents for tasks like financial research, sales, and deep research.

## Features

- Financial Research Agent
- Sales Flow Agent
- Deep Research Agent
- Debate Agent
- Rate Limiting
- CORS Support

## Technical Stack

- Python 3.12
- FastAPI
- CrewAI
- Docker
- Hugging Face Spaces

## Environment Variables Required

- `ANTHROPIC_API_KEY`: For Claude AI integration
- `MISTRAL_API_KEY`: For Mistral AI integration
- `SENDGRID_API_KEY`: For email services
- `SERPER_API_KEY`: For web search capabilities
- `ENVIRONMENT`: Set to 'production' for deployment

## Deployment

This project is deployed on Hugging Face Spaces using Docker. The service runs on port 7860 as per Hugging Face Spaces requirements.

## API Documentation

When the service is running, you can find the API documentation at:

- Swagger UI: `/docs`
- ReDoc: `/redoc`

## Local Development

To run this project locally:

```bash
docker build -t fastapi-agents .
docker run -p 7860:7860 fastapi-agents
```
