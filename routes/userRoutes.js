let express = require("express");
let { userController, productController } = require("../controllers")

let router = express.Router();

// Admin Routes
router.get("/admin", (_, res) => userController.getUsers(res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.post("/admin", (req, res) => userController.createUser(req.body, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete("/admin/:id", (req, res) => userController.deleteUser(req, res));

module.exports = router;
