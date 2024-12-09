const express = require("express");
const router = express.Router();
const { getAllDoctorsForIndex } = require("../controllers/doctorController");
const { SliderPageForIndex } = require("../controllers/sliderController");
const { getAllServicesForIndex } = require("../controllers/ServicesController");
const { getAllBlogsForIndex } = require("../controllers/blogController");
const {
  getAllTestimonialsForIndex,
} = require("../controllers/testimonialController");
const {
  getAllDepartmentsForIndex,
} = require("../controllers/departmentController");
const { createAppointment } = require("../controllers/appointmentController");

// =================================================== homepage with doctors, sliders, services, and blogs
router.get("/", async (req, res) => {
  try {
    // Fetch all doctors and sliders
    const [doctors, sliders, services, blogs] = await Promise.all([
      getAllDoctorsForIndex(),
      SliderPageForIndex(),
      getAllServicesForIndex(),
      getAllBlogsForIndex(),
    ]);

    res.render("../views/ui/index.ejs", {
      title: "Hospital",
      doctors: doctors,
      blogs: blogs,
      sliders: sliders,
      services: services,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors and sliders.");
  }
});

//===================================================================== blog page with all blogs
router.get("/blog", async (req, res) => {
  try {
    const blogs = await getAllBlogsForIndex();
    res.render("../views/ui/blog.ejs", { blogs, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching blogs.");
  }
});

// ====================================================================== doctor page with all doctors
router.get("/doctor", async (req, res) => {
  try {
    const doctors = await getAllDoctorsForIndex();
    res.render("../views/ui/doctor.ejs", { doctors, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors.");
  }
});

// =================================================================== services page with all services
router.get("/service", async (req, res) => {
  try {
    const services = await getAllServicesForIndex();
    res.render("../views/ui/service.ejs", { services, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching services.");
  }
});

// =================================================================== services, testimonials, and blogs
router.get("/about", async (req, res) => {
  try {
    const [services, testimonials, blogs] = await Promise.all([
      getAllServicesForIndex(),
      getAllTestimonialsForIndex(),
      getAllBlogsForIndex(),
    ]);

    res.render("ui/about", {
      title: "Hospital",
      services,
      testimonials,
      blogs,
    });
  } catch (err) {
    console.error("Error fetching data for about page:", err.message);

    res.status(500).render("error", {
      title: "Error",
      message: "An error occurred while loading the About page.",
    });
  }
});

//====================================================================== departments page with all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await getAllDepartmentsForIndex();
    res.render("../views/ui/departments.ejs", {
      departments,
      title: "Hospital",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching departments.");
  }
});

// ====================================================================== Appointment Routes 

router.get("/appointment", async (req, res) => {
  try {
    // Fetch doctors and services
    const [doctors, services] = await Promise.all([
      getAllDoctorsForIndex(),
      getAllServicesForIndex(),
    ]);

    // Render the appointment page
    res.render("../views/ui/appointment.ejs", {
      title: "Book an Appointment",
      doctors: doctors,
      services: services,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors and services.");
  }
});

// Static route for rendering the service page (without dynamic data)
router.get("/service", (req, res) => {
  res.render("ui/service.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the service details page
router.get("/service-details", (req, res) => {
  res.render("../views/ui/service-details.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the doctor page
router.get("/doctor", (req, res) => {
  res.render("ui/doctor.ejs", { title: "Delhi Hospital" });
});


// Static route for rendering the blog details page
router.get("/blog-details", (req, res) => {
  res.render("ui/blog-details.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the contact page
router.get("/contact", (req, res) => {
  res.render("ui/contact.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the doctor details page
router.get("/doctor-details", (req, res) => {
  res.render("ui/doctor-details.ejs", { title: "Delhi Hospital" });
});

// Route for handling appointment creation
router.post("/appointment", createAppointment);

// Static route for rendering the FAQ page
router.get("/faq", (req, res) => {
  res.render("ui/faq.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the testimonials page
router.get("/testimonials", (req, res) => {
  res.render("ui/testimonials.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the terms and conditions page
router.get("/terms-condition", (req, res) => {
  res.render("ui/terms-condition.ejs", { title: "Delhi Hospital" });
});

// Static route for rendering the privacy policy page
router.get("/privacy-policy", (req, res) => {
  res.render("ui/privacy-policy.ejs", { title: "Delhi Hospital" });
});

module.exports = router;
