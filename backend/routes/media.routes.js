import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    return res.status(200).json({
      success: true,
      url: req.file.path,
      fileType: req.file.mimetype,
      fileName: req.file.originalname
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Cloudinary upload failed",
      error: err.message
    });
  }
});

export default router;