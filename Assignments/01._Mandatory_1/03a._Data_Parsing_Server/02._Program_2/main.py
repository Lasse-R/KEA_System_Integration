from fastapi import FastAPI, File, UploadFile
import uvicorn, xmltodict, yaml, json, requests, pandas as pd

app = FastAPI()
NODE_SERVER_URL = "http://localhost:3000/receive"

def parse_file(file: UploadFile):
    content = file.file.read().decode("utf-8")
    if file.filename.endswith(".json"):
        return json.loads(content)
    if file.filename.endswith((".yaml", ".yml")):
        return yaml.safe_load(content)
    if file.filename.endswith(".xml"):
        return xmltodict.parse(content)
    if file.filename.endswith(".csv"):
        file.file.seek(0)
        return pd.read_csv(file.file).to_dict(orient="records")
    if file.filename.endswith(".txt"):
        return {"text": content}
    return {"error": "Unsupported format"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    data = parse_file(file)
    requests.post(NODE_SERVER_URL, json=data)
    return {"status": "sent to node", "parsed": data}

@app.post("/receive")
async def receive(data: dict):
    print("[Python] Received from Node:", data)
    return {"status": "python received"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
