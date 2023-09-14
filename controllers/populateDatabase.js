/**
 * @module controllers/populateDatabase
 * @description The functions provided by this model handle synchronising the
 *              database with the data provided by the store API.
 */

const axios = require("axios");;
const Models = require("../models");
const bcrypt = require("bcrypt");
const rootURL = "https://fakestoreapi.com";

/**
 * @description Fetches all users from the store API, resets the user collection
 *              in the database and repopulates with the user collection from the API.
 *              Passwords are securely stored as a hash.
 */
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

        console.log(`Users populated...`)
    } catch(err) {
        console.log(`Failed to populate users. ${err}`)
    }
}

/**
 * @description Fetches all products from the store API, resets the user collection
 *              in the database and repopulates with the user collection from the API.
 */
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

        console.log(`Products populated...`)
    } catch(err) {
        console.log(`Failed to populate products. ${err}`)
    }
}

/**
 * @description Fetches all carts and from the store API, resets the both the cart and
 *              cartItems collection in the database and rebuilds new carts and cart items.
 */
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

        console.log(`Carts populated...`)
    } catch(err) {
        console.log(`Failed to populate Carts. ${err}`)
    }
}

module.exports = {
    populateUsers,
    populateProducts,
    populateCarts
}