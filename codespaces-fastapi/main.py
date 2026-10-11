from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Мой первый API",
    description="Уроки 4–5: FastAPI в Codespace и связка с HTML на Pages",
    version="1.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "Привет из FastAPI! Открой /docs в браузере",
        "hint": "Попробуй GET /hello?name=ТвоёИмя",
    }


@app.get("/hello")
def say_hello(name: str = "друг"):
    return {"hello": name}
