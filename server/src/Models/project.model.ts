import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [String],
    members: [String],
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "won't do"],
    },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;
