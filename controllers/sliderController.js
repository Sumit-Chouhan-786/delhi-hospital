// controllers/sliderController.js

// Render Add Slider page
const addSliderPage = (req, res) => {
  res.render("add_slider.ejs", { title: "Add Slider" });
};

// Render All Sliders page
const allSlidersPage = (req, res) => {
  res.render("all_slider.ejs", { title: "All Sliders" });
};

// Render Update Slider page
const updateSliderPage = (req, res) => {
  res.render("update_slider.ejs", { title: "Update Slider" });
};

// Export the functions
module.exports = {
  addSliderPage,
  allSlidersPage,
  updateSliderPage,
};
