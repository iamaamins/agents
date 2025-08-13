from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from app.middleware.exception import ExceptionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.limiter import RateLimiter
from app.routers import financial_research, sales_flow
from app.config.env import initialize_app_config
from app.routers import utils
from app.routers import debate
from app.routers import deep_research


# Initialize app config
initialize_app_config()

# Create rate limiter instance
limiter = RateLimiter()


# Define the lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Handles application startup and shutdown events"""

    app.state.limiter = limiter
    yield


# Initialize the FastAPI app with the lifespan manager
app = FastAPI(lifespan=lifespan)

# Supported origins
origins = [
    "http://localhost:3000",
    "https://www.alaminshaikh.com",
    "https://dev.alaminshaikh.com",
]


# Middlewares
app.add_middleware(middleware_class=ExceptionMiddleware)
app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(middleware_class=BaseHTTPMiddleware, dispatch=limiter.dispatch)


# Routers
app.include_router(router=sales_flow.router)
app.include_router(router=utils.router)
app.include_router(router=debate.router)
app.include_router(router=deep_research.router)
app.include_router(router=financial_research.router)
