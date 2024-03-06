const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    entryDate: { type: Date, default: Date.now }
});

const categorySchema = new Schema({
    name: { type: String },
});

const Users = mongoose.model('Users', userSchema, 'users');
const Categories = mongoose.model('Categories', categorySchema, 'categories');

const mySchemas = { 'Users': Users, 'Categories': Categories };

module.exports = mySchemas;