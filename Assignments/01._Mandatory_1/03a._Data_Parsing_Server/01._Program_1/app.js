import express from "express";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import xml2js from "xml2js";
import YAML from "yaml";
import { parse as csvParse } from "csv-parse/sync";

const app = express();
const upload = multer({ dest: "uploads/" });
const PYTHON_SERVER_URL = "http://localhost:8000/receive";

app.use(express.json());

function parseFile(path, name) {
    const content = fs.readFileSync(path, "utf-8");

    if (name.endsWith(".json")) return JSON.parse(content);
    if (name.endsWith(".yaml") || name.endsWith(".yml")) return YAML.parse(content);
    if (name.endsWith(".xml")) {
        let parsed;
        xml2js.parseString(content, { explicitArray: false }, (err, obj) => {
            if (err) throw err;
            parsed = obj;
        });
        return parsed;
    }
    if (name.endsWith(".csv")) return csvParse(content, { columns: true, skip_empty_lines: true });
    if (name.endsWith(".txt")) return { text: content };
    return { error: "Unsupported format" };
}

app.post("/upload", upload.single("file"), async (req, res) => {
    const data = parseFile(req.file.path, req.file.originalname);
    await axios.post(PYTHON_SERVER_URL, data); // send to Python
    res.send({ status: "sent to python", parsed: data });
});

app.post("/receive", (req, res) => {
    console.log("[Node] Received from Python:", req.body);
    res.send({ status: "node received" });
});

app.listen(3000, () => console.log("Node server running on port 3000"));
