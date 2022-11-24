const express = require("express");
const router = express.Router();

const {
  getDailyNews,
  getImportantEditorials,
  getMoreLinks,
} = require("../../controllers/user/fetches.controller");

router.get("/getDailyNews/:date", getDailyNews);
router.get("/getImportantEditorials/:date", getImportantEditorials);
router.get("/getMoreLinks/:date", getMoreLinks);

module.exports = router;
