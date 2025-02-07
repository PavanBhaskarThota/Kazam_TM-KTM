import express from "express";
import { auth } from "../Middleware/auth";
import TaskController from "../Controllers/TaskController";

const taskRouter = express.Router();

taskRouter.get("/", auth, TaskController.getTasks);
taskRouter.post("/create", auth, TaskController.createProject);
// taskRouter.post('/update', auth, TaskController)

export default taskRouter;
