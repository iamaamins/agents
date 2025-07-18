from fastapi import FastAPI
from app.middleware.exception import ExceptionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.routers.agents import sales_manager
from app.config.env import initialize_app_config

initialize_app_config()

app = FastAPI()

origins = ["http://localhost:3000"]

# Middlewares
app.add_middleware(ExceptionMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(sales_manager.router)
