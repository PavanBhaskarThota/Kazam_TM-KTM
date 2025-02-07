import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectId: {type: String, required: true}, 
    assignedTo: {type:String, default:"unassigned"}, 
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "won't do"],
    },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
