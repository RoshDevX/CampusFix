const multer = require("multer");
const path = require("path");     //provides utilities for working with file and directory paths.
const fs = require("fs");          //allows us to interact with files and folders.



// Create uploads folder if it doesn't exist
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure where uploaded images will be stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname).toLowerCase());
    },
});

// Validate image type
function fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG images are allowed."));
    }
}

// Configure Multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

module.exports = upload;