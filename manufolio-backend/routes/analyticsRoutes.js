const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.post("/track-view", analyticsController.trackProjectView);
router.post("/track-visitor", analyticsController.trackVisitor);

module.exports = router;
