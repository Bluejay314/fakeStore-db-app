"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

let { User } = require("../models");

const getUser = (req, res) => {
    User.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
}

const getUsers = (res) => {
    User.find({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

const createUser = (data, res) => {
    bcrypt.hash(data.password, 10).then(hash => {
        new User({...data, password: hash}).save()
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
    });
};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

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