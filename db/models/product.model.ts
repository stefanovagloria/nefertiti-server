import mongoose from "mongoose";
const Schema = mongoose.Schema;


const productSchema = new Schema({
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
    relatedProducts: [{ type: Object }],
});

export const Product = mongoose.model('Product', productSchema, 'products');