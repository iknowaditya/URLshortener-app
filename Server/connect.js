const mongoose = require("mongoose");

const connectToMongoDB = (url) => {
  return mongoose.connect(url);
};

module.exports = { connectToMongoDB };
