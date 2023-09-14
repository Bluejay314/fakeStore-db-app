let express = require("express");
let { productController } = require("../controllers")

let router = express.Router();

// User Routes
router.get("/", (_, res) => productController.getProducts(res));
router.get("/:id", (req, res) => productController.getProduct(req, res));

// Admin Routes
router.post("/admin/:id", (req, res) => productController.createProduct(req.body, res));
router.put("./admin/:id", (req, res) => productController.updateProduct(req, res));
router.delete("/admin/:id", (req, res) => productController.deleteProduct(req, res));

module.exports = router;
