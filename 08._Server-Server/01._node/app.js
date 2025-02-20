import express from 'express';

const app = express();

app.get('/expressData', (req, res) => {
    res.send({ data: "This is data from the express server" });
});

app.get("/requestFastAPIData", (req, res) => {
    fetch("http://localhost:8000/fastapiData")
        .then(response => response.json())
        .then(result => {
            res.send({data : result.data});
        })

});

app.get("/names/:name", (req, res) => {
    console.log(req.params.name);
    res.send({data : `your name is ${req.params.name}`});
});

app.get("/taskone", (req, res) => {
    res.send({data : "first part of the path is hello"});
});

app.get("/tasktwo", (req, res) => {
    res.send({data : "second part of the path is david"});
});

app.get("/hellodavid" , (req, res) => {
    res.send({data : "Tillykke mr. David-sama, du har fulført opgaven!"});
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});