var express = require("express");
const {
  getAllMountains,
  getMountainById,
  buyMountains,
} = require("../db/queries");
var router = express.Router();

router.get("/", getAllMountains);
router.post("/getMountainById", getMountainById);
router.post("/buy", buyMountains);

module.exports = router;
