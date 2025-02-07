import express from "express";
import { auth } from "../Middleware/auth";
import ProjectsController from "../Controllers/ProjectsController";

const projectRouter = express.Router();

projectRouter.get('/', auth, ProjectsController.getProjects)
projectRouter.post('/create',auth, ProjectsController.createProject)
// projectRouter.post('/update', auth, UserController.logout)

export default projectRouter