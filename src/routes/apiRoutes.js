const express = require("express");
const router = express.Router();
const { extractAPI } = require("../controllers/apiController");

router.get("/extractor", extractAPI);

module.exports = router;
