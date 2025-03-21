import { WebSocketServer } from "ws";

const PORT = process.env.PORT ?? 8080;

const server = new WebSocketServer({ port: PORT });

server.on("connection", (ws) => {
    console.log("Client connected", server.clients.size);

    ws.on("message", (message) => {
        console.log(`message received: ${message}`);

        // Broadcast message to all clients
        server.clients.forEach((client) => {
            client.send(String(message));
        });


    });

    ws.on("close", () => {
        console.log("Client disconnected", server.clients.size);
    });
});