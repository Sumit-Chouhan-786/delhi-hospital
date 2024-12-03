// controllers/topperController.js

// Render Add Topper page
const addTopperPage = (req, res) => {
  res.render("add_topper.ejs", { title: "Add Topper" });
};

// Render Update Topper page
const updateTopperPage = (req, res) => {
  res.render("update_topper.ejs", { title: "Update Topper" });
};

// Render All Toppers page
const allToppersPage = (req, res) => {
  res.render("all_topper.ejs", { title: "All Toppers" });
};

// Export the functions
module.exports = {
  addTopperPage,
  updateTopperPage,
  allToppersPage,
};
