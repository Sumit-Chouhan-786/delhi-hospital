const multer = require("multer");
const path = require("path");

// Multer configuration
const createMulterStorage = (uploadFolder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploads/course); // Specify the folder for uploads
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + "_" + file.originalname;
      cb(null, uniqueName); // Save file with a unique name
    },
  });

  return multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // Validate file types (e.g., only images)
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimeType = fileTypes.test(file.mimetype);

      if (extname && mimeType) {
        return cb(null, true);
      } else {
        cb(new Error("Only images are allowed!")); // Reject invalid files
      }
    },
  });
};

module.exports = createMulterStorage;
