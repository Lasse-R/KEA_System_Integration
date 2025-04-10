from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"]
)

@app.get("/")
async def root():
    return { "message": "Hello World" } 

@app.get("/timestamp")
def timestamp():
    return { "data": datetime.now() }
