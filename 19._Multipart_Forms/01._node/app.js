import express from 'express';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 8080;
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(undefined, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type' + file.mimetype), false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20 MB
    },
    fileFilter
});

app.use(express.urlencoded({ extended: true }));

app.post("/form", (req, res) => {
    console.log(req.body);
    delete req.body.password;
    res.send(req.body);
});

app.post("/fileform", upload.single('file'), (req, res) => {
    res.send({ });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});