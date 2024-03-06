import express, { Express, Request, Response } from "express";
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());


mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.get('/login',(req: Request, res: Response) =>{
    res.send('OK')
})