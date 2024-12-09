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


router.get("/", async (req, res) => {
  try {
    // Fetch all doctors and sliders
    const [doctors, sliders, services, blogs] = await Promise.all([
      getAllDoctorsForIndex(),
      SliderPageForIndex(),
      getAllServicesForIndex(),
      getAllBlogsForIndex(),
    ]);

    // Render the index page with fetched data
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

router.get("/blog", async (req, res) => {
  try {
    const blogs = await getAllBlogsForIndex();
    res.render("../views/ui/blog.ejs", { blogs, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching blogs.");
  }
});
router.get("/doctor", async (req, res) => {
  try {
    const doctors = await getAllDoctorsForIndex();
    res.render("../views/ui/doctor.ejs", { doctors, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors.");
  }
});

// /service route - fetches and returns all services
router.get("/service", async (req, res) => {
  try {
    const services = await getAllServicesForIndex();
    res.render("../views/ui/service.ejs", { services, title: "Hospital" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching services.");
  }
});
// /about route - fetches and returns all services
router.get("/about", async (req, res) => {
  try {
    // Fetch data for services, testimonials, and blogs in parallel
    const [services, testimonials, blogs] = await Promise.all([
      getAllServicesForIndex(),
      getAllTestimonialsForIndex(),
      getAllBlogsForIndex(),
    ]);

    // Render the about page with the fetched data
    res.render("ui/about", {
      title: "Hospital",
      services,
      testimonials,
      blogs,
    });
  } catch (err) {
    console.error("Error fetching data for about page:", err.message);

    // Render an error page or send an error message
    res.status(500).render("error", {
      title: "Error",
      message: "An error occurred while loading the About page.",
    });
  }
});

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
router.get("/service", (req, res) => {
  res.render("ui/service.ejs", { title: "Delhi Hospital" });
});
router.get("/service-details", (req, res) => {
  res.render("../views/ui/service-details.ejs", { title: "Delhi Hospital" });
});
router.get("/doctor", (req, res) => {
  res.render("ui/doctor.ejs", { title: "Delhi Hospital" });
});
router.get("/blog", (req, res) => {
  res.render("ui/blog.ejs", { title: "Delhi Hospital" });
});
router.get("/blog-details", (req, res) => {
  res.render("ui/blog-details.ejs", { title: "Delhi Hospital" });
});
router.get("/contact", (req, res) => {
  res.render("ui/contact.ejs", { title: "Delhi Hospital" });
});
router.get("/doctor-details", (req, res) => {
  res.render("ui/doctor-details.ejs", { title: "Delhi Hospital" });
});
router.post("/appointment", createAppointment);

router.get("/appointment", (req, res) => {
  res.render("ui/appointment.ejs", { title: "Delhi Hospital" });
});
router.get("/faq", (req, res) => {
  res.render("ui/faq.ejs", { title: "Delhi Hospital" });
});
router.get("/testimonials", (req, res) => {
  res.render("ui/testimonials.ejs", { title: "Delhi Hospital" });
});
router.get("/terms-condition", (req, res) => {
  res.render("ui/terms-condition.ejs", { title: "Delhi Hospital" });
});
router.get("/privacy-policy", (req, res) => {
  res.render("ui/privacy-policy.ejs", { title: "Delhi Hospital" });
});

module.exports = router;
