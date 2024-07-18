const express = require("express");
const { connectToMongoDB } = require("./connect");
const cors = require("cors");
const URL = require("./models/url");
const bodyParser = require("body-parser");
const urlRoute = require("./routes/url");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 7000;

// CORS configuration
const corsOptions = {
  origin: "https://urlshotener-client.onrender.com", // frontend
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors(corsOptions));

connectToMongoDB(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected successfully");
});

app.use(express.json());

// Use the URL route
app.use("/api/url", urlRoute);

app.use("/", (req, res) => {
  res.send("Welcome to URL shortener API");
});

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(entry.redirectURL); // redirect to the original URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
