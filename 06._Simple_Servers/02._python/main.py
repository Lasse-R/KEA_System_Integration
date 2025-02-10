from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello Word"}


@app.get("/greetings")
def greetings():
    return {"data": "hello from the greetings route!"}