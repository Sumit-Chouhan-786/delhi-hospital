const Testimonial = require("../models/testimonialsModel");
const path = require("path");
const fs = require("fs");

// Add Testimonial controller function

const addTestimonial = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image upload failed", type: "danger" });
  }
  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      message: req.body.message,
      description: req.body.description,
      testimonialImage: req.file.filename,
    });

    await testimonial.save();
    req.session.message = {
      type: "success",
      message: "Testimonial added successfully!",
    };
    res.redirect("/admin/allTestimonial");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// Render Add Testimonial page

const addTestimonialPage = (req, res) => {
  res.render("add_testimonial", { title: "Add Testimonial" });
};

// Update Testimonial Page
const updateTestimonialPage = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.render("update_testimonial", {
      title: "Update Testimonial",
      testimonial: testimonial,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Testimonial controller function
const updateTestimonial = async (req, res) => {
  const id = req.params.id;
  let new_image = "";

  try {
    // Check if a new image is uploaded
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }
    await Testimonial.findByIdAndUpdate(id, {
      name: req.body.name,
      message: req.body.message,
      description: req.body.description,
      testimonialImage: new_image,
    });

    req.session.message = {
      type: "success",
      message: "Testimonial updated successfully!",
    };
    res.redirect("/admin/allTestimonial");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// Delete Testimonial controller function
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).send("Testimonial not found");
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      testimonial.testimonialImage
    );

    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.log("Error deleting image:", err);
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    req.session.message = {
      type: "success",
      message: "Testimonial deleted successfully!",
    };
    res.redirect("/admin/allTestimonial");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, type: "danger" });
  }
};

// All Testimonials Page controller function
const allTestimonialsPage = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.render("all_testimonial", {
      title: "All Testimonials",
      testimonials: testimonials,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching testimonials.");
  }
};

// Export the functions
module.exports = {
  addTestimonialPage,
  addTestimonial,
  updateTestimonialPage,
  updateTestimonial,
  allTestimonialsPage,
  deleteTestimonial,
};
