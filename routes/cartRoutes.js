let express = require("express");
let { cartController } = require("../controllers")

let router = express.Router();
router.get("/admin", (_, res) => cartController.getCarts(res));

router.get("/:id", (req, res) => cartController.getCart(req, res));
router.post("/:id", (req, res) => cartController.createCart(req, res));
router.put("/:id", (req, res) => cartController.updateCart(req, res));
router.delete("/:id", (req, res) => cartController.deleteCart(req, res));

module.exports = router;