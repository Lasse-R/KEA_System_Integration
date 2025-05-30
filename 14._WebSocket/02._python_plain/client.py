# from websockets.sync.client import connect

# def send_message():
#    with connect("ws://localhost:8000") as websocket:
#        websocket.send("Hello, world!")
#        
#        message = websocket.recv()
#        print(f"server received: {message}")
        
# send_message()


import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("this is a message from the client")
        print(await websocket.recv())
        
        
asyncio.run(send_message())