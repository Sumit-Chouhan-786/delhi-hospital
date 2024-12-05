const SiteSetting = require("../models/siteSettingModel");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Joi = require("joi");
const upload = require("../middlewares/multerMiddleware")


// Input validation schema
const siteSettingSchema = Joi.object({
  email: Joi.string().email().required(),
  address: Joi.string().min(5).required(),
  number: Joi.string()
    .pattern(/^\d{10}$/)
    .required(), // Ensure it's a 10-digit number
  facebook: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  pinterest: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional(),
  logo: Joi.string().optional(),
});

// Render Site Settings page
const siteSettingsPage = async (req, res) => {
  try {
   const settings = await SiteSetting.findOne(); // Fetch the first (and only) site setting
    res.render("site_setting.ejs", { title: "Site Setting", settings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading site settings.");
  }
};

// Add Site Setting
const addSiteSetting = async (req, res) => {
  try {
    // Validate input
    const { error } = siteSettingSchema.validate(req.body);
    if (error) {
      req.session.message = {
        type: "error",
        message: error.details[0].message,
      };
      return res.redirect("/admin/siteSetting");
    }

    // Handle logo upload
    const siteSettingData = {
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      pinterest: req.body.pinterest,
      instagram: req.body.instagram,
      logo: req.file ? req.file.filename : null, // Handle logo upload
    };

    // Check if a site setting already exists
    const existingSetting = await SiteSetting.findOne();

    if (existingSetting) {
      // Update the existing site setting
      await SiteSetting.updateOne({}, siteSettingData);
      req.session.message = {
        type: "success",
        message: "Site setting updated successfully!",
      };
    } else {
      // Create a new site setting
      await SiteSetting.create(siteSettingData);
      req.session.message = {
        type: "success",
        message: "Site setting added successfully!",
      };
    }

    res.redirect("/admin/siteSetting");
  } catch (err) {
    console.error(err);
    req.session.message = {
      type: "error",
      message: "Error adding/updating site setting.",
    };
    res.redirect("/admin/siteSetting");
  }
};

// Update Site Setting (PATCH)
const updateSiteSetting = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate input
    const { error } = siteSettingSchema.validate(req.body);
    if (error) {
      req.session.message = {
        type: "error",
        message: error.details[0].message,
      };
      return res.redirect("/admin/siteSetting");
    }

    let newLogo = "";
    if (req.file) {
      newLogo = req.file.filename;

      // Delete the old logo if it exists
      const setting = await SiteSetting.findById(id);
      if (setting && setting.logo) {
        const oldLogoPath = path.join(__dirname, "..", "uploads", setting.logo);
        try {
          fs.unlinkSync(oldLogoPath);
        } catch (err) {
          console.error("Error deleting old logo:", err);
        }
      }
    }

    const updatedData = {
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      pinterest: req.body.pinterest,
      instagram: req.body.instagram,
      ...(req.file && { logo: newLogo }), // Include new logo only if uploaded
    };

    // Update the site setting
    await SiteSetting.findByIdAndUpdate(id, updatedData, { new: true });

    req.session.message = {
      type: "success",
      message: "Site setting updated successfully!",
    };
    res.redirect("/admin/siteSetting");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating site setting.");
  }
};

module.exports = {
  siteSettingsPage,
  addSiteSetting,
  updateSiteSetting,
};
