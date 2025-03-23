const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const apiRoutes = require("./routes/apiRoutes");
app.use("/v1/api", apiRoutes);

module.exports = app;
