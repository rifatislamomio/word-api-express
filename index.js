const express = require("express");
require("dotenv").config();
const app = express();
const routes = require("./routes/routes");
const PORT = process.env.PORT || 8080;
var bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

//Database connection with mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(routes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
