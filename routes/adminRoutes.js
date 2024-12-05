const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const testimonialController = require("../controllers/testimonialController");
const sliderController = require("../controllers/sliderController");
const topperController = require("../controllers/topperController");
const courseController = require("../controllers/courseController");
const siteSettingsController = require("../controllers/siteSettingController");

// ============================================= dashboard  routes ================================================

router.get("/dashboard", (req, res) => {
  res.render("admin_panel.ejs", { title: "Dashboard" });
});

// ============================================= site setting  routes ================================================

// Route to render Site Settings page (GET)
router.get("/siteSetting", siteSettingsController.siteSettingsPage);

// Route to add Site Settings (POST)
router.post(
  "/siteSetting",
  upload.single("logo"), // Handle file upload for the logo
  siteSettingsController.addSiteSetting
);

// Route to update Site Settings (PATCH)
router.patch(
  "/siteSetting/:id",
  upload.single("logo"), // Handle file upload for the logo
  siteSettingsController.updateSiteSetting
);
// ============================================= testimonials  routes ================================================

// Add Testimonial Routes
router.get("/addTestimonial", testimonialController.addTestimonialPage);
router.post(
  "/addTestimonial",
  upload.single("testimonialImage"),
  testimonialController.addTestimonial
);

// Update Testimonial Routes
router.get(
  "/updateTestimonial/:id",
  testimonialController.updateTestimonialPage
);
router.post(
  "/updateTestimonial/:id",
  upload.single("testimonialImage"),
  testimonialController.updateTestimonial
);
router.patch("/updateTestimonial/:id", testimonialController.updateTestimonial);

// All Testimonials Route
router.get("/allTestimonial", testimonialController.allTestimonialsPage);

// Delete Testimonial Route
router.get("/deleteTestimonial/:id", testimonialController.deleteTestimonial);

// ============================================= courses  routes ================================================

// Add Course Routes
router.get("/addCourse", courseController.addCoursePage);
router.post(
  "/addCourse",
  upload.single("courseImage"),
  courseController.addCourse
);

// Update Course Routes
router.get("/updateCourse/:id", courseController.updateCoursePage);
router.post(
  "/updateCourse/:id",
  upload.single("courseImage"),
  courseController.updateCourse
);
router.patch("/updateCourse/:id", courseController.updateCourse);

// All Courses Route
router.get("/allCourse", courseController.allCoursesPage);

// Delete Course Route
router.get("/deleteCourse/:id", courseController.deleteCourse);

// ============================================= slider  routes ================================================
// Route for adding a slider
router.get("/addSlider", sliderController.addSliderPage);
router.post(
  "/addSlider",
  upload.single("sliderImage"),
  sliderController.addSlider
);

// Route for viewing all sliders
router.get("/allSliders", sliderController.allSlidersPage);

// Route for updating a slider
router.get("/updateSlider/:id", sliderController.updateSliderPage);
router.post(
  "/updateSlider/:id",
  upload.single("sliderImage"),
  sliderController.updateSlider
);

// Route for deleting a slider
router.get("/deleteSlider/:id", sliderController.deleteSlider);

// ============================================= topper  routes ================================================
router.get("/addTopper", topperController.addTopperPage);
router.get("/updateTopper", topperController.updateTopperPage);
router.get("/allTopper", topperController.allToppersPage);

module.exports = router;
