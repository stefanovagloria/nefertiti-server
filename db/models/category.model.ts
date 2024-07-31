import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String },
    procedures: [{
        type: Schema.Types.ObjectId,
        ref: 'Procedure', // Name of the referenced model (collection)
    }]

});

export const Category = mongoose.model('Category', categorySchema, 'categories');