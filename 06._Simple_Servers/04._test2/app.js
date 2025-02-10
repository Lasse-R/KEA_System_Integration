import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.send({data: "hello from the 2nd test!"})
});

const PORT = 8080;
app.listen(PORT, () => console.log("server is running on port ", 8080));


// npm init -y
// type: "module";
// npm i express
// import express from "express"
// set port 8080
