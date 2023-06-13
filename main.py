from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = "TRAIN"


class ans(BaseModel):
    content: str


@app.post("/answer")
def change(item: ans):
    answer = item.content
    return answer


@app.get("/answer")
def get_answer():
    return answer


app.mount("/", StaticFiles(directory="static", html=True), name="static")
