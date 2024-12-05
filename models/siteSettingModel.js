const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  pinterest: { type: String, default: "" },
  instagram: { type: String, default: "" },
  logo: { type: String, default: "" }, // File name of the uploaded logo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SiteSetting", siteSettingSchema);
