let express = require("express");
let { productController } = require("../controllers")

let router = express.Router();

router.get("/", (req, res) => {
    productController.getproducts(res);
});

router.post("/create", (req, res) => {
    productController.createproduct(req.body, res);
});

router.put('/:id', (req, res) => {
    productController.updateproduct(req, res)
});

router.delete('/:id', (req, res) => {
    productController.deleteproduct(req, res)
});

module.exports = router;
