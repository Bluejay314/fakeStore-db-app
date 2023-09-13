require("dotenv").config();

const userRoutes =require('./routes/userRoutes');
const express = require("express");
let dbConnect = require("./dbConnect");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
