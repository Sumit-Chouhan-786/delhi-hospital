const Course = require("../models/courseModel");
const session = require("express-session");

// Add Course controller function
const addCourse = async (req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      description: req.body.description,
    });

    await course.save(); // Save course using async/await
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
    // Get course by ID
    const course = await Course.findById(req.params.id);

    // If course is not found, return 404 response
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Render the "update_course" view and pass the course data to it
    res.render("update_course", {
      title: "Update Course",
      course: course, // Pass the course data to the view
    });
  } catch (err) {
    // Handle errors and send a response
    res.status(500).json({ message: err.message });
  }
};


const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    // Update the course in the database
    await Course.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
    });

    // Set success message
    req.session.message = {
      type: "success",
      message: "Course updated successfully!",
    };

    // Redirect to the all courses page
    res.redirect("/admin/allCourse");
  } catch (err) {
    console.error("Error updating course: ", err);
    res.status(500).json({ message: err.message, type: "danger" });
  }
};



// Delete Course controller function
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    req.session.message = {
      type: "success",
      message: "Course deleted successfully!",
    };
    res.redirect("/admin/allCourse");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// All Courses Page controller function
const allCoursesPage = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    // Render the all_course page and pass courses data to it
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
