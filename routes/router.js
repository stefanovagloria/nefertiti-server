const express = require('express');
const router = express.Router();
const schemas = require('../db/models/schemas');
const { Schema } = require('mongoose');

router.post('/procedures', async (req, res) => {

    const newCategory = req.body;
    const myData = new MyModel(newData);
    myData.save()
      .then(() => res.send('Data saved successfully'))
      .catch(err => res.status(500).send('Error saving data: ' + err));
})

module.exports = router;