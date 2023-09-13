let express = require("express");
let { productController } = require("../controllers")

let router = express.Router();

router.get("/", (req, res) => {
    productController.getProducts(res);
});

router.post("/create", (req, res) => {
    productController.createProduct(req.body, res);
});

router.put('/:id', (req, res) => {
    productController.updateProduct(req, res)
});

router.delete('/:id', (req, res) => {
    productController.deleteProduct(req, res)
});

module.exports = router;
