const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Hey its working ');
});
app.listen(PORT, () => console.log('server up and running at  ${PORT}'));

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//IMPORT ROUTES

const authRoute = require("./auth.js");

//ACCESSING THE ENVIRONMENT VARIABLES dotenv.config();

//CONNECTION TO DATABASE

mongoose.connect(

    process.env.DB_CONNECT,

    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db ")
);

//MIDDLEWARE DIS Able CORS AND USED FOR JSON OUTPUT
app.use(express.json(), cors());

//ROUTE MIDDLEWARE

app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);