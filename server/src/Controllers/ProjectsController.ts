import { Request, Response } from "express";
import ProjectService from "../Services/ProjectService";


class ProjectController {
  async createProject(req: any, res: Response) {
    try {
      const project = req.body;
      const user = req.user
      const result = await ProjectService.createProject(project,user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getProjects(req: any, res: Response) {
    try {
      const user = req.user
      const result = await ProjectService.getProjects(user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new ProjectController();
