from fastapi import FastAPI

app = FastAPI(
    title="Мой первый API",
    description="Урок 4: GitHub Codespaces + FastAPI для детей",
    version="1.0",
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
