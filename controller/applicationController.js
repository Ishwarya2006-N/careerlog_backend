// controllers/applicationController.js
import Application from "../model/applicationModel.js";

// CREATE application
export const createApplication = async (req, res) => {
  try {
    const { company, role, status, appliedDate } = req.body;
    let resumeLink = "";
    if (req.file) resumeLink = req.file.path; // multer saves file

    const newApp = new Application({
      user: req.user.id, // ✅ match the model field
      company,
      role,
      status,
      appliedDate: appliedDate || new Date(),
      resumeLink,
    });

    await newApp.save();
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: newApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET applications for logged in user
export const getApplications = async (req, res) => {
  try {
    // ✅ changed from userId → user
    const apps = await Application.find({ user: req.user.id }).sort({
      appliedDate: -1,
    });

    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE application
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ updated filter to match model (user)
    const updated = await Application.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Application updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure the application belongs to the logged-in user
    const application = await Application.findOne({ _id: id, user: req.user.id });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    await application.deleteOne();
    res.json({ success: true, message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete application" });
  }
};

