const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String },
    procedures: [{
        type: Schema.Types.ObjectId,
        ref: 'Procedure', // Name of the referenced model (collection)
    }]

});

const procedureSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: { type: String },
    photos: { type: Array },
    price: { type: Number },
    promoPrice: { type: Number },
    characteristics: [{ type: Object }],
    description: { type: String },
    relatedProducts: [{ type: Object }]
});


const productSchema = new Schema({

    name: { type: String },
    photos: { type: Array },
    price: { type: Number },
    promoPrice: { type: Number },
    characteristics: [{ type: Object }],
    description: { type: String },
    relatedProducts: [{ type: Object }]
});


const Category = mongoose.model('Category', categorySchema, 'categories');
const Procedure = mongoose.model('Procedure', procedureSchema, 'procedures');
const Product = mongoose.model('Product', procedureSchema, 'products');

const mySchemas = { 'Category': Category, 'Procedure': Procedure , 'Product': Product};

module.exports = mySchemas;