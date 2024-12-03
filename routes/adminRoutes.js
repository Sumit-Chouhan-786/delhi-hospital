const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const sliderController = require("../controllers/sliderController");
const topperController = require("../controllers/topperController");
const courseController = require("../controllers/courseController")
const siteSettingsController = require("../controllers/siteSettingController");

// ============================================= dashboard  routes ================================================

router.get("/dashboard", (req, res) => {
  res.render("admin_panel.ejs", { title: "Dashboard" });
});

// ============================================= site setting  routes ================================================

// Route for site settings
router.get("/siteSetting", siteSettingsController.siteSettingsPage);

// ============================================= testimonials  routes ================================================

router.get("/allTestimonial", testimonialController.allTestimonialsPage);
router.get("/addTestimonial", testimonialController.addTestimonialPage);
router.get("/updateTestimonial", testimonialController.updateTestimonialPage);

// ============================================= courses  routes ================================================

// Add Course Routes
router.get("/addCourse", courseController.addCoursePage);
router.post("/addCourse", courseController.addCourse);

// Update Course Routes
router.get("/updateCourse/:id", courseController.updateCoursePage);
router.post("/updateCourse/:id", courseController.updateCourse);
router.patch("/updateCourse/:id", courseController.updateCourse);


// All Courses Route
router.get("/allCourse", courseController.allCoursesPage);

// Delete Course Route
router.get("/deleteCourse/:id", courseController.deleteCourse);

// ============================================= slider  routes ================================================

router.get("/addSlider", sliderController.addSliderPage);
router.get("/allSliders", sliderController.allSlidersPage);
router.get("/updateSlider", sliderController.updateSliderPage);

// ============================================= topper  routes ================================================
router.get("/addTopper", topperController.addTopperPage);
router.get("/updateTopper", topperController.updateTopperPage);
router.get("/allTopper", topperController.allToppersPage);

module.exports = router;
