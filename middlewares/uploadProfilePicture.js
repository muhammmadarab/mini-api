const multer = require("multer");
const path = require("path");

// Set storage for the profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profiles");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "profile-" + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true); 
  else cb(new Error("Only image files are allowed"), false);
};

const uploadProfilePicture = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
}).single("profilePicture");

module.exports = uploadProfilePicture;
