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

const User = mongoose.model('User', userSchema, 'users');
const Category = mongoose.model('Category', categorySchema, 'categories');

const mySchemas = { 'User': User, 'Category': Category };

module.exports = mySchemas;