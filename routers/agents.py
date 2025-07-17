from fastapi import APIRouter, Response, HTTPException, Cookie

router = APIRouter()


@router.get('/chat')
def chat():
    return {"message": "hello"}
