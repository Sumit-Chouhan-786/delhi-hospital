const Doctor = require("../models/doctorModel");
const path = require("path");
const fs = require("fs");

// Add Doctor controller function
const addDoctor = async (req, res) => {
  if (!req.file) {
    return res.json({ message: "Image upload failed", type: "danger" });
  }
  try {
    const doctor = new Doctor({
      name: req.body.name,
      specialist: req.body.specialist,
      doctorImage: req.file.filename,
    });

    await doctor.save();
    req.session.message = {
      type: "success",
      message: "Doctor added successfully!",
    };
    res.redirect("/admin/allDoctors");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// Render Add Doctor page
const addDoctorPage = (req, res) => {
  res.render("add_doctor", { title: "Add Doctor" });
};

const updateDoctorPage = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.render("update_doctor", {
      title: "Update Doctor",
      doctor: doctor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDoctor = async (req, res) => {
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

    // Update the doctor with the new or old image
    await Doctor.findByIdAndUpdate(id, {
      name: req.body.name,
      specialist: req.body.specialist,
      doctorImage: new_image,
    });

    // Set success message in session and redirect
    req.session.message = {
      type: "success",
      message: "Doctor updated successfully!",
    };
    res.redirect("/admin/allDoctor");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
};

// Delete Doctor controller function
const deleteDoctor = async (req, res) => {
  try {
    // Find the doctor by its ID
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Get the image file path from the doctor object
    const imagePath = path.join(__dirname, "..", "uploads", doctor.doctorImage); // Update the field name if different

    // Delete the image file from the server
    try {
      fs.unlinkSync(imagePath); // Delete the file from the uploads folder
    } catch (err) {
      console.log("Error deleting image:", err);
    }

    // Now delete the doctor record from the database
    await Doctor.findByIdAndDelete(req.params.id);

    // Set success message and redirect
    req.session.message = {
      type: "success",
      message: "Doctor deleted successfully!",
    };
    res.redirect("/admin/allDoctors");
  } catch (err) {
    console.error(err);
    res.json({ message: err.message, type: "danger" });
  }
};

// All Doctors Page controller function
const allDoctorsPage = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.render("all_doctor.ejs", { title: "All Doctors", doctors: doctors });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors.");
  }
};

const allDoctorsPageForIndex = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.render("../views/ui/index.ejs", {
      title: "All Doctors",
      doctors: doctors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors.");
  }
};
const DoctorsPageForIndex = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.render("../views/ui/doctor.ejs", {
      title: "All Doctors",
      doctors: doctors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching doctors.");
  }
};

// Export the functions
module.exports = {
  addDoctorPage,
  DoctorsPageForIndex,
  allDoctorsPageForIndex,
  addDoctor,
  updateDoctorPage,
  updateDoctor,
  allDoctorsPage,
  deleteDoctor,
};
