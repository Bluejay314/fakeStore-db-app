const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
})

module.exports = mongoose.model("rating", ratingSchema);