import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export const Procedure = mongoose.model('Procedure', procedureSchema, 'procedures');