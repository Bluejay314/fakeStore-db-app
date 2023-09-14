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
const getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.send({ result: 200, data: data })
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
}

/**
 * @description Retrieves a list of all the users in the database.
 * 
 * @param {express.Response} res 
 */
const getUsers = async (res) => {
    try {
        const data = await User.find({});
        res.send({ result: 200, data: data })
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

/**
 * @description Creates a new user filled wit the data provided in the request body.
 * @param {Object} data body of the express request object
 * @param {express.Response} res server response object
 */
const createUser = async (data, res) => {
    try {
        const hash = await bcrypt.hash(data.password, 10);
        await new User({...data, password: hash}).save();
        res.send({ result: 200, data: data });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

/**
 * @description Finds a user with the id specified in the url params. Updates with
 *              the data provided by the request body.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const updateUser = async (req, res) => {
    try {
        if(req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body = {...req.body, password: hash};
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        res.send({ result: 200, data: user})
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

/**
 * @description Deletes a single user that has the id provided by request params.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndRemove(req.params.id, req.body, {
            useFindAndModify: false,
        });

        res.send({ result: 200, data: data });
    } catch(err) {
        res.send({ result: 500, error: err.message })
    }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};