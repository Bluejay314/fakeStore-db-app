"use strict";

let { Cart, CartItem } = require("../models");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.id});
        const cartItems = await CartItem.find({cart_id: cart._id});
        res.send({ result: 200, data: cartItems });
    } catch(err) {
        res.send({ result: 500, error: err.message });
    }
}

const getCarts = async (res) => {
    try {
        const data = await Cart.find({});
        res.send({ result: 200, data: data });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

const createCart = async (data, res) => {
    try {
        const newCart = await new Cart(data).save();
        res.send({ result: 200, data: newCart });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user_id: req.params.id});
        const cartItem = await CartItem.findOneAndUpdate({
            product_id: req.body.product_id,
            cart_id: cart._id
        }, {
            quantity: req.body.quantity
        }, {
            upsert: true
        });

        res.send({ result: 200, data: cartItem })
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }

    Cart.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    });
};

const deleteCart = async (req, res) => {
    try {
        const data = await Cart.findByIdAndRemove(req.params.id, req.body, {
            useFindAndModify: false,
        });

        res.send({ result: 200, data: data })
    } catch(err) {
        res.send({ result: 500, error: err.message });
    }
};

module.exports = {
    getCart,
    getCarts,
    createCart,
    updateCart,
    deleteCart
};