import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // rreturn index.html from public folder
    res.sendFile('index.html', { root: 'public' });
}
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });