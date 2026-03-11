const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");
const upload = require("../middleware/uploadMiddleware");

router.post("/add", upload.single("image"), controller.addProject);

module.exports = router;
