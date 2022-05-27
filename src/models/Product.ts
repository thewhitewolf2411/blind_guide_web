import mongoose, { Schema } from "mongoose";
import User from "./User";

const productScheema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    barcode: { type: Number, required: true },
    audioLink: { type: String, required: true },
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
});

export default mongoose.model('Product', productScheema);