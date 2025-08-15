from traceback import print_exception
from typing import override
from fastapi import HTTPException, Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from fastapi.exceptions import RequestValidationError


class ExceptionMiddleware(BaseHTTPMiddleware):
    @override
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        try:
            return await call_next(request)

        except HTTPException as http_exc:
            raise http_exc

        except Exception as exc:
            print_exception(exc)

            if "not a valid ObjectId" in str(exc):
                return JSONResponse(
                    status_code=500, content={"detail": "Invalid ObjectId"}
                )

            return JSONResponse(
                status_code=500, content={"detail": "Internal server error"}
            )
