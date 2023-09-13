const axios = require("axios");
const Models = require("../models");
const initialUsers = require("../models/init/users.json")
const rootURL = "https://fakestoreapi.com";

const populateUsers = () => {
    Models.User.deleteMany({})
        .then(() => {
            for(const user of initialUsers) 
                Models.User(user).save();
        })
        .catch((err) => console.log(`failed to populate users. ${err}`))
}

const populateProducts = () => {
    Models.Product.deleteMany({})
        .then(() => {
            axios.get(`${rootURL}/products`)
                .then(response => response.data.map(item => {
                    Models.Product({
                        title: item.title,
                        price: item.price,
                        description: item.description,
                        category: item.category 
                    }).save();
                }))
        })
        .catch((err) => console.log(`failed to populate products. err:${err}`))

}


module.exports = {
    populateUsers,
    populateProducts
}
