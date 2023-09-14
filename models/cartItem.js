const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
    cart_id: {type: mongoose.Schema.Types.ObjectId, ref: "cart"},
    quantity: {type:Number, required: true, default: 1},
});

module.exports = mongoose.model("cartItem", cartItemSchema);