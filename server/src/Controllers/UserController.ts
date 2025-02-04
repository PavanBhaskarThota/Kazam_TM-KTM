import { Request, Response } from "express";
import UserService from "../Services/UserService";

class UserController {
  async signup(req: Request, res: Response) {
    try {
      const user = req.body;
      const result = await UserService.signup(user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = req.body;
      const result = await UserService.login(user);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async logout(req: any, res: Response) {
    try {
      const token = req.token;
      const result = await UserService.logout(token);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default new UserController();
