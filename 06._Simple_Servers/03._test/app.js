import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.send({data: "You're on the root page of the second express server!" })
});

const PORT = 8080;
app.listen(PORT, () => console.log("server is runnong on port ", PORT))