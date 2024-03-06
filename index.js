const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors());
app.use('/', router);

router.post('/procedures', async (req, res) => {

    console.log('From Server...');
    //const {categoryName, procedures} = req.body;
   res.send('..');
})


mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => console.log(error));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})