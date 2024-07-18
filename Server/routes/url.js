const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  // handleGetUrl,
  GetAllUsers,
  handleDeleteUrl,
} = require("../Controller/url");

const router = express.Router();

// router.post("/shorten", handleGenerateNewShortUrl);
// router.get("/shorten", GetAllUsers);
// router.get("/analytics/:shortId", handleGetAnalytics);
// router.get("/:shortId", handleGetUrl);
// router.delete("/:shortId", handleDeleteUrl);

router.post("/shortUrl", handleGenerateNewShortUrl);
router.get("/shortUrl", GetAllUsers);
router.get("/shortUrl/:id", handleGetAnalytics);
router.delete("/shortUrl/:id", handleDeleteUrl);

module.exports = router;
