import { WebSocket } from "ws";

const websocketClient = new WebSocket("ws://localhost:8080");

websocketClient.on("open", () => {
    websocketClient.send("Hello from the client!");

    websocketClient.on("message", (message) => {
        console.log(`message received from the server: ${message}`);

        
        // websocketClient.close();
    });
});