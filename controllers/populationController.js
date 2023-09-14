const axios = require("axios");;
const Models = require("../models");
const rootURL = "https://fakestoreapi.com";
const bcrypt = require("bcrypt");

const populateUsers = async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/users");
        await Models.User.deleteMany({});
        for(const user of response.data) { 
            (async function() {
                bcrypt.hash(user.password, 10)
                    .then(hash => {
                        Models.User({
                            key: user.id,
                            name: user.username,
                            email: user.email,
                            password: hash
                        }).save();
                    });
            }());
        }

        console.log(`Users populated`)
    } catch(err) {
        console.log(`failed to populate users. ${err}`)
    }
}

const populateProducts = async () => {
    try {
        const response = await axios.get(`${rootURL}/products`);
        await Models.Product.deleteMany({});
        response.data.map(product => {
            Models.Product({
                key: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category 
            }).save();
        });

        console.log(`Products populated`)
    } catch(err) {
        console.log(`failed to populate products. ${err}`)
    }
}

const populateCarts = async () => {
    try {
        const response = await axios.get(`${rootURL}/carts`);
        await Models.Cart.deleteMany({});
        for(const cart of response.data) {
            (async function () {
                const user = await Models.User.findOne({key: cart.userId})
                const newCart = await Models.Cart({
                    key: cart.id,
                    user_id: user._id
                }).save();

                await Models.CartItem.deleteMany({});
                for(const cartItem of cart.products) {
                    const product = await Models.Product.findOne({key: cartItem.productId});
                    await Models.CartItem({
                        product_id: product._id,
                        cart_id: newCart._id,
                        quantity: cartItem.quantity
                    }).save();
                }
            }());
        };

        console.log(`Carts populated`)
    } catch(err) {
        console.log(`failed to populate Carts. ${err}`)
    }
}

const populateCartItems = async () => {
    try {
        await Models.CartItem.deleteMany({});
        const carts = await Models.Cart.find({});
        for(const cart of carts) {
            for(const cartItem of cart["products"]) {
                const product = Models.Product.findOne({key: cartItem["productId"]});
                Models.CartItem({
                    product_id: product._id,
                    cart_id: cart._id,
                    quantity: cartItem["quantity"]
                }).save();
            }
        };

        console.log(`CartItems populated`)
    } catch(err) {
        console.log(`failed to populate CartItems. ${err}`)
    }
}

module.exports = {
    populateUsers,
    populateProducts,
    populateCarts,
    populateCartItems
}