const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("mongo conncted");
  })
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server Running on port ${port}`));
