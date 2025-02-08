import { Request, Response } from "express";
import TaskService from "../Services/TaskService";

class TaskController {
  async createProject(req: any, res: Response) {
    try {
      const task = req.body;
      const user = req.user
      const result = await TaskService.createTask(task,user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getTasks(req: any, res: Response) {
    try {
      const user = req.user
      const result = await TaskService.getTasks(user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateTask(req: any, res: Response) {
    try {
      const task = req.body;
      const id = req.params.id;
      const result = await TaskService.updateTask(task, id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async deleteTask(req: any, res: Response) {
    try {
      const id = req.params.id;
      const result = await TaskService.deleteTask(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}


export default new TaskController();
