const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs");

// Image upload configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Generate unique filename
  },
});

var upload = multer({
  storage: storage,
}).single("image");

// Add User Route
router.post("/add", upload, async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image upload failed", type: "danger" });
  }

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename, // Save uploaded image filename
    });

    await user.save(); // Save user using async/await
    req.session.message = {
      type: "success",
      message: "User added successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Find all users using async/await
    res.render("index.ejs", { title: "Home Page", users: users }); // Render the users in the view
  } catch (err) {
    res.json({ message: err.message }); // Return an error message if something goes wrong
  }
});

// Add User Page
router.get("/add", (req, res) => {
  res.render("add_user.ejs", { title: "Add User" });
});

// Edit a user route
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      // Redirect if the user does not exist
      return res.redirect("/");
    }
    // Render the edit page with the user data
    res.render("edit_user.ejs", {
      title: "Edit User",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.post("/update/:id", upload, async (req, res) => {
  let id = req.params.id;
  let new_image = "";

  try {
    // Check if a new image is uploaded
    if (req.file) {
      new_image = req.file.filename;
      try {
        // Delete the old image
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log("Error deleting old image: ", err);
      }
    } else {
      // Use the old image if no new image is uploaded
      new_image = req.body.old_image;
    }

    // Update the user in the database
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    });

    req.session.message = {
      type: "success",
      message: "User updated successfully!",
    };
    res.redirect("/");
  } catch (err) {
    console.error("Error updating user: ", err);
    res.json({ message: err.message, type: "danger" });
  }
});

router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await User.findByIdAndDelete(id);
    if (result && result.image) {
      try {
        fs.unlinkSync("./uploads/" + result.image);
      } catch (err) {
        console.log("Error deleting image: ", err);
      }
    }
    req.session.message = {
      type: "info",
      message: "User Deleted successfully",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message });
  }
});


module.exports = router;
