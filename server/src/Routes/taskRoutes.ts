import express from "express";
import { auth } from "../Middleware/auth";
import TaskController from "../Controllers/TaskController";

const taskRouter = express.Router();

taskRouter.get("/:id", auth, TaskController.getTasks);
taskRouter.post("/create/:id", auth, TaskController.createProject);
taskRouter.patch('/update/:id', auth, TaskController.updateTask)
taskRouter.delete('/delete/:id', auth, TaskController.deleteTask)

export default taskRouter;
