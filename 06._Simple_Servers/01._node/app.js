import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send({data: "root route"});
});


app.get("/greetings", (req, res) => {
    res.send({data: "greetings from express!"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("server is running on port" , PORT));