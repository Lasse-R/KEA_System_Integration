import express from "express";
import { readNewFile } from "./fileReader.js";

const app = express();

app.get("/", (req, res) => {
    res.send({ data: "Greetings from 01a_program2!" })
});

app.get("/xml", async (req, res) => {
    try {
        const xmlData = await readNewFile("rockstar.xml");

        res.set("Content-Type", "application/xml");

        res.send(xmlData);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/json", async (req, res) => {
    try {
        const jsonData = await readNewFile("plane.json");

        res.set("Content-Type", "application/json");

        res.send(jsonData);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/yaml", async (req, res) => {
    try {
        const yamlData = await readNewFile("school.yaml");

        res.set("Content-Type", "text/plain");

        res.send(yamlData);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/csv", async (req, res) => {
    try {
        const csvData = await readNewFile("motorcycle.csv");

        // shameless GPT generated code
        const formattedData = `<pre>${csvData}</pre>`;

        res.set("Content-Type", "text/html");
        res.send(formattedData);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get("/txt", async (req, res) => {
    try {
        const txtData = await readNewFile("city.txt");

        res.set("Content-Type", "text/plain");

        res.send(txtData);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log("server is running on port ", 8080));
