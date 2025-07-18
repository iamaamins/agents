from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class ExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as exc:
            print(exc)

            if "not a valid ObjectId" in str(exc):
                return JSONResponse(
                    status_code=500, content={"detail": "Invalid ObjectId"}
                )

            return JSONResponse(
                status_code=500, content={"message": "Internal server error"}
            )
