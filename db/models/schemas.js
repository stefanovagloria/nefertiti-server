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
    name: { type: String },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: { type: Number },
    promotionPrice: { type: Number },
    description: { type: String },
    characteristics: { type: Object },
    relatedProducts: {}
});

const Category = mongoose.model('Category', categorySchema, 'categories');
const Procedure = mongoose.model('Procedure', procedureSchema, 'procedures');

const mySchemas = { 'Category': Category, 'Procedure': Procedure };

module.exports = mySchemas;