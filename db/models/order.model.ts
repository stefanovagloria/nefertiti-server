import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: { type: Object },
    products: [{
        name: { type: String },
        price: { type: Number },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number }
    }],
    totalPrice: { type: Number },
    date: { type: Date },
    status: { type: String }
});

export const Order = mongoose.model('Order', orderSchema, 'orders');