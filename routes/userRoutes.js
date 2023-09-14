let express = require("express");
let { userController } = require("../controllers")

let router = express.Router();

// Get all users
router.get("/", (req, res) => {
    userController.getUsers(res);
});

// Get a single user
router.get("/:id", (req, res) => {
    userController.getUser(req, res);
});

// Create a new user
router.post("/create", (req, res) => {
    userController.createUser(req.body, res);
});

// Update an existing user
router.put('/:id', (req, res) => {
    userController.updateUser(req, res)
});

// Delete a user
router.delete('/:id', (req, res) => {
    userController.deleteUser(req, res)
});

module.exports = router;
