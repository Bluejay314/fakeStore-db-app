let express = require("express");
let { ratingController } = require("../controllers")

let router = express.Router();

router.get("/", (req, res) => {
    ratingController.getRatings(res);
});

router.post("/create", (req, res) => {
    ratingController.createRating(req.body, res);
});

router.put('/:id', (req, res) => {
    ratingController.updateRating(req, res)
});

router.delete('/:id', (req, res) => {
    ratingController.deleteRating(req, res)
});

module.exports = router;