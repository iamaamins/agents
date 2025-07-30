from typing import override
from fastapi import HTTPException, Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint


class ExceptionMiddleware(BaseHTTPMiddleware):
    @override
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        try:
            return await call_next(request)

        except HTTPException:
            raise

        except Exception as exc:
            if "not a valid ObjectId" in str(exc):
                return JSONResponse(
                    status_code=500, content={"detail": "Invalid ObjectId"}
                )

            return JSONResponse(
                status_code=500, content={"detail": "Internal server error"}
            )
