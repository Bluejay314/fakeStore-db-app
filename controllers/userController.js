/**
 * @module controllers/userController
 * @description This model handles the manipulation of user data based on route take by the user
 */

"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
let { User } = require("../models");

/**
 * @description Retrieves a single user that has the id provided by request params.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const getUser = (req, res) => {
    User.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
}

/**
 * @description Retrieves a list of all the users in the database.
 * 
 * @param {express.Response} res 
 */
const getUsers = (res) => {
    User.find({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Creates a new user filled wit the data provided in the request body.
 * @param {Object} data body of the express request object
 * @param {express.Response} res server response object
 */
const createUser = (data, res) => {
    bcrypt.hash(data.password, 10).then(hash => {
        new User({...data, password: hash}).save()
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
    });
};

/**
 * @description Finds a user with the id specified in the url params. Updates with
 *              the data provided by the request body.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Deletes a single user that has the id provided by request params.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};