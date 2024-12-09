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
const blogController = require("../controllers/blogController");
const departmentsController = require("../controllers/departmentController");
const {
  getAllAppointmentForIndex,
  deleteAppointment,
} = require("../controllers/appointmentController");

//============================================================================== Admin Routes
router.get("/signup", adminController.renderSignUp);
router.post("/signup", adminController.handleSignUp);

router.get("/login", adminController.renderLogin);
router.post("/login", adminController.handleLogin);

// Protected Routes
router.get("/dashboard", isAuthenticated, adminController.renderDashboard);
router.get("/update", isAuthenticated, adminController.renderUpdate);
router.post("/update", isAuthenticated, adminController.handleUpdatePassword);

router.get("/logout", adminController.handleLogout);

//============================================================================== Site Setting Routes
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

//============================================================================== Testimonial Routes
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

//============================================================================== Doctor Routes
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

//============================================================================== Slider Routes
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

//============================================================================== services routes
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
// ================================================================== all appointments
router.get("/deleteAppointments/:id", deleteAppointment);

router.get("/allAppointment", async (req, res) => {
  try {
    const appointments = await getAllAppointmentForIndex(); 
    res.render("all_appointment", {
      appointments, 
      title: "Hospital", 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching appointments.");
  }
});


//============================================================================== blogs routes
router.get("/addBlog", blogController.addBlogPage);
router.post("/addBlog", upload.single("blogImage"), blogController.addBlog);
router.get("/updateBlog/:id", blogController.updateBlogPage);
router.post(
  "/updateBlog/:id",
  upload.single("blogImage"),
  blogController.updateBlog
);
router.get("/deleteBlog/:id", blogController.deleteBlog);
router.get("/allBlogs", blogController.allBlogsPage);

// ========================================================================== department routes
router.get("/addDepartment", departmentsController.addDepartmentPage);
router.get("/updateDepartment/:id", departmentsController.updateDepartmentPage);
router.get("/allDepartments", departmentsController.allDepartmentsPage);
router.post(
  "/addDepartment",
  upload.single("departmentImage"),
  departmentsController.addDepartment
);
router.post(
  "/updateDepartment/:id",
  upload.single("departmentImage"),
  departmentsController.updateDepartment
);
router.get("/deleteDepartment/:id", departmentsController.deleteDepartment);

module.exports = router;
