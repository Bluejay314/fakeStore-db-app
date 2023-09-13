const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, trim: true, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    category: {type: String},

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model("product", productSchema);