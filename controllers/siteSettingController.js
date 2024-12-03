// controllers/siteSettingsController.js

// Render Site Settings page
const siteSettingsPage = (req, res) => {
  res.render("site_setting.ejs", { title: "Site Setting" });
};

// Export the function
module.exports = {
  siteSettingsPage,
};
