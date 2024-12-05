const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  address: { type: String, required: true, minlength: 5 },
  number: { type: String, required: true, match: /^\d{10}$/ }, 
  facebook: { type: String, required: false },
  twitter: { type: String, required: false },
  pinterest: { type: String, required: false },
  instagram: { type: String, required: false },
  logo: { type: String, required: false },
});

module.exports = mongoose.model("SiteSetting", siteSettingSchema);
