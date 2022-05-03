var express = require("express");
const { getAllPlanets } = require("../db/queries");
var router = express.Router();

router.get("/", getAllPlanets);

module.exports = router;
