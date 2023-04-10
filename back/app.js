const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require('dotenv').config();



const userRoutes = require("./route/user");
const sauceRoutes = require("./route/sauce");

mongoose
  .connect(process.env.MONGO_PASSE,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


/*-----Configuration corps-----*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
