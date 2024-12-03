// Render All Testimonials page
const allTestimonialsPage = (req, res) => {
  res.render("all_testimonial.ejs", { title: "All Testimonials" });
};

// Render Add Testimonial page
const addTestimonialPage = (req, res) => {
  res.render("add_testimonial.ejs", { title: "Add Testimonial" });
};

// Render Update Testimonial page
const updateTestimonialPage = (req, res) => {
  res.render("update_testimonial.ejs", { title: "Update Testimonial" });
};

// Export the functions
module.exports = {
  allTestimonialsPage,
  addTestimonialPage,
  updateTestimonialPage,
};
