require("dotenv").config();

const express = require("express");
let dbConnect = require("./dbConnect");
const { populationController } = require("./controllers");
const userRoutes =require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    init();
});

async function init() {
    await populationController.populateUsers();
    await populationController.populateProducts();
    await populationController.populateCarts();
}