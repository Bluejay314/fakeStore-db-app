require("dotenv").config();

const express = require("express");
let dbConnect = require("./dbConnect");
const { populationController } = require("./controllers");
const userRoutes =require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("./ratings", ratingRoutes);

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    populationController.populateUsers();
    populationController.populateProducts();
});