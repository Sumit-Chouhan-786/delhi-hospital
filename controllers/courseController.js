const Course = require("../models/courseModel");
const path = require("path");
const fs = require("fs");

// Add Course controller function
const addCourse = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image upload failed", type: "danger" });
  }
  try {
    const course = new Course({
      name: req.body.name,
      description: req.body.description,
      courseImage: req.file.filename,
    });

    await course.save();
    req.session.message = {
      type: "success",
      message: "Course added successfully!",
    };
    res.redirect("/admin/allCourse");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// Render Add Course page
const addCoursePage = (req, res) => {
  res.render("add_course", { title: "Add Course" });
};

const updateCoursePage = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.render("update_course", {
      title: "Update Course",
      course: course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
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

    // Update the course with the new or old image
    await Course.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      courseImage: new_image,
    });

    // Set success message in session and redirect
    req.session.message = {
      type: "success",
      message: "Course updated successfully!",
    };
    res.redirect("/admin/allCourse");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};


// Delete Course controller function
const deleteCourse = async (req, res) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).send("Course not found");
    }

    // Get the image file path from the course object
    const imagePath = path.join(__dirname, '..', 'uploads', course.courseImage); // Update the field name if different

    // Delete the image file from the server
    try {
      fs.unlinkSync(imagePath); // Delete the file from the uploads folder
    } catch (err) {
      console.log('Error deleting image:', err);
    }

    // Now delete the course record from the database
    await Course.findByIdAndDelete(req.params.id);

    // Set success message and redirect
    req.session.message = {
      type: "success",
      message: "Course deleted successfully!",
    };
    res.redirect("/admin/allCourse");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, type: "danger" });
  }
};

// All Courses Page controller function
const allCoursesPage = async (req, res) => {
  try {
    const courses = await Course.find();

    res.render("all_course", { title: "All Courses", courses: courses });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching courses.");
  }
};

// Export the functions
module.exports = {
  addCoursePage,
  addCourse,
  updateCoursePage,
  updateCourse,
  allCoursesPage,
  deleteCourse,
};
