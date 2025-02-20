from fastapi import FastAPI
import httpx

app = FastAPI()

express_server = "http://localhost:8080"

@app.get("/fastapiData")
def getFastApiData():
    return {"data": "data from the FastAPI server"}


@app.get("/get-data")
async def get_data():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{express_server}/expressData")
        return response.json()
    
    
@app.get("/taskone")
def getFastApiData():
    return {"hello"}

@app.get("/tasktwo")
def getFastApiData():
    return {"david"}

@app.get("/hellodavid")
def getFastApiData():
    return {"Tillykke mr. David-sama, du har fulført opgaven!"}





