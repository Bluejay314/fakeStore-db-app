require("dotenv").config();

const express = require("express");
let dbConnect = require("./dbConnect");
const { populateDatabase } = require("./controllers");
const userRoutes =require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    init();
});

async function init() {
    await populateDatabase.populateUsers();
    await populateDatabase.populateProducts();
    await populateDatabase.populateCarts();
    console.log("Successfully populated databases");
}