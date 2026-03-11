const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

router.post("/track-download", resumeController.downloadResume);

module.exports = router;
