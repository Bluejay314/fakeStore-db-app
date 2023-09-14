/**
 * @module controllers/productController
 * @description This model handles the manipulation of product data based on route take by the user
 */

"use strict";

const express = require("express");
let { Product } = require("../models");

/**
 * @description Retrieves a list of all products in the database
 * @param {express.Response} res server response object
 */
const getProducts = (res) => {
    Product.find({})
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Retrieves a single product with the id specified by the URL params.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Creates a new product filled wit the data provided in the request body.
 * @param {Object} data body of the express request object
 * @param {express.Response} res server response object
 */
const createProduct = (data, res) => {
    new Product(data).save()
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Finds a product with the id specified in the url params. Updates with
 *              the data provided by the request body.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

/**
 * @description Deletes a single product that has the id provided by request params.
 * @param {express.Request} req server request object
 * @param {express.Response} res server response object
 */
const deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body, {
        useFindAndModify: false,
    })
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => res.send({ result: 500, error: err.message }));
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};