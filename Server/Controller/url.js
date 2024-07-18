const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      return res.status(400).json({ message: "Full URL is required" });
    }
    const urlFound = await URL.findOne({ fullUrl });
    const newShortId = shortid.generate();
    if (urlFound) {
      return res
        .status(200)
        .send({ message: "Link already exists", url: urlFound });
    } else {
      const newUrl = await URL.create({
        fullUrl,
        shortId: newShortId,
        redirectURL: newShortId,
      });
      return res.status(201).send(newUrl);
    }
  } catch (err) {
    console.error("Error creating short URL:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function GetAllUsers(req, res) {
  try {
    const result = await URL.find();
    if (result.length === 0) {
      return res.status(200).send({ message: "No ShortUrls found" });
    } else {
      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortUrl = await URL.findOne({ shortId: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "Full URL not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.visitHistory.push({ timestamp: Date.now() });
      await shortUrl.save();
      res.redirect(shortUrl.fullUrl);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleDeleteUrl(req, res) {
  try {
    const shortUrl = await URL.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({ message: "URL deleted successfully" });
    } else {
      res.status(404).send({ message: "URL not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  GetAllUsers,
  handleDeleteUrl,
};
