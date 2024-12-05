const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("ui/index.ejs", { title: "Delhi Hospital" });
});
router.get("/about", (req, res) => {
  res.render("ui/about.ejs", { title: "Delhi Hospital" });
});
router.get("/departments", (req, res) => {
  res.render("ui/departments.ejs", { title: "Delhi Hospital" });
});
router.get("/service", (req, res) => {
  res.render("ui/service.ejs", { title: "Delhi Hospital" });
});
router.get("/service-details", (req, res) => {
  res.render("ui/service-details.ejs", { title: "Delhi Hospital" });
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
