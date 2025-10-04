// routes/applicationRoutes.js
import express from "express";
import multer from "multer";
import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} from "../controller/applicationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Protected Routes
router.post("/", authMiddleware, upload.single("resume"), createApplication);
router.get("/", authMiddleware, getApplications);
router.put("/:id", authMiddleware, updateApplication);
router.delete("/:id", authMiddleware, deleteApplication);


export default router;
