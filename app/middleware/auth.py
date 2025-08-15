from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.config.env import ACCESS_TOKEN


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app) -> None:
        super().__init__(app)
        self.excluded_routes = {"/utils", "/docs", "/redoc"}

    async def dispatch(self, request: Request, call_next) -> Response:
        if any(
            request.url.path.startswith(excluded_route)
            for excluded_route in self.excluded_routes
        ):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JSONResponse(
                status_code=401,
                content={"detail": "Missing Authorization header"},
            )

        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != "Bearer":
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid Authorization header format"},
            )

        token = parts[1]
        if token != ACCESS_TOKEN:
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid token"},
            )

        response = await call_next(request)
        return response
