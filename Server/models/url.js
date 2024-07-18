const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
      default: shortid.generate,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to set active field based on clicks
urlSchema.pre("save", function (next) {
  this.active = this.clicks > 0;
  next();
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
