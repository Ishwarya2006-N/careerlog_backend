// models/applicationModel.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: "Applied" },
  resumeLink: { type: String },
  appliedDate: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
