import asyncio
from websockets.asyncio.server import serve

async def handle_new_websocket(Websocket):
    print("client connected")
    try:
        message = await websocket.recv()
        print(f"client received: {message}")
    except Websocket.ConnectionClosed:
        print("client disconnected")

async def main():
    async with serve(handle_new_websocket, "localhost", 8000) as server:
        await server.serve_forever()

asyncio.run(main())
