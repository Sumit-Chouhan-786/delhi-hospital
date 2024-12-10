// utils/SiteSettingData.js
const SiteSetting = require("../models/siteSettingModel");

const SiteSettingData = async () => {
  try {
    const siteSettings = await SiteSetting.find(); // Fetch all documents in the collection
    return siteSettings;
  } catch (err) {
    console.error("Error fetching site settings:", err.message);
    throw err; // Rethrow the error for handling at a higher level
  }
};

module.exports = SiteSettingData;
