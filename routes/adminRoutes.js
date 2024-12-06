const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multerMiddleware");
const testimonialController = require("../controllers/testimonialController");
const sliderController = require("../controllers/sliderController");
const servicesController = require("../controllers/ServicesController");
const doctorController = require("../controllers/doctorController");
const siteSettingsController = require("../controllers/siteSettingController");
const adminController = require("../controllers/adminController");

// ===== Routes for dashboard, site settings, testimonials, doctors, sliders, and toppers =====

// Admin Routes
router.get("/signup", adminController.renderSignUp);
router.post("/signup", adminController.handleSignUp);

router.get("/login", adminController.renderLogin);
router.post("/login", adminController.handleLogin);

// Protected Routes
router.get("/dashboard", isAuthenticated, adminController.renderDashboard);
router.get("/update", isAuthenticated, adminController.renderUpdate);
router.post("/update", isAuthenticated, adminController.handleUpdatePassword);

router.get("/logout", adminController.handleLogout);

// Site Setting Routes
router.get("/siteSetting", siteSettingsController.siteSettingsPage);
router.get(
  "/siteSettingsDisplay",
  siteSettingsController.siteSettingsDisplayPage
);
router.post(
  "/siteSetting",
  upload.single("logo"),
  siteSettingsController.addSiteSetting
);
router.patch(
  "/siteSetting/:id",
  upload.single("logo"),
  siteSettingsController.updateSiteSetting
);

// Testimonial Routes
router.get("/addTestimonial", testimonialController.addTestimonialPage);
router.post(
  "/addTestimonial",
  upload.single("testimonialImage"),
  testimonialController.addTestimonial
);
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
router.get("/allTestimonial", testimonialController.allTestimonialsPage);
router.get("/deleteTestimonial/:id", testimonialController.deleteTestimonial);

// Doctor Routes
router.get("/addDoctor", doctorController.addDoctorPage);
router.post(
  "/addDoctor",
  upload.single("doctorImage"),
  doctorController.addDoctor
);
router.get("/updateDoctor/:id", doctorController.updateDoctorPage);
router.post(
  "/updateDoctor/:id",
  upload.single("doctorImage"),
  doctorController.updateDoctor
);
router.get("/allDoctors", doctorController.allDoctorsPage);
router.get("/deleteDoctor/:id", doctorController.deleteDoctor);

// Slider Routes
router.get("/addSlider", sliderController.addSliderPage);
router.post(
  "/addSlider",
  upload.single("sliderImage"),
  sliderController.addSlider
);
router.get("/allSliders", sliderController.allSlidersPage);
router.get("/updateSlider/:id", sliderController.updateSliderPage);
router.post(
  "/updateSlider/:id",
  upload.single("sliderImage"),
  sliderController.updateSlider
);
router.get("/deleteSlider/:id", sliderController.deleteSlider);

// services routes
router.get("/addServices", servicesController.addServicesPage);
router.get("/updateServices/:id", servicesController.updateServicesPage);
router.get("/allServices", servicesController.allServicesPage);
router.post(
  "/addServices",
  upload.single("servicesImage"),
  servicesController.addServices
);
router.post(
  "/updateServices/:id",
  upload.single("servicesImage"),
  servicesController.updateServices
);
router.get("/deleteServices/:id", servicesController.deleteServices);





module.exports = router;
