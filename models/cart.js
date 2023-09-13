const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
})

module.exports = mongoose.model("cart", cartSchema);