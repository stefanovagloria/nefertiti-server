const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
const { Schema } = require('mongoose');

router.post('/procedures', async (req, res) => {

    console.log('From Server...');
    //const {categoryName, procedures} = req.body;
   res.send('..');
})

module.exports = router;