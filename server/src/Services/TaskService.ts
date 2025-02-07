import TaskModel from "../Models/task.model";

class TaskService {
  async createTask(task: any, user: any) {
    try {
      const newTask = { ...task, creator: user.userId };
      if (newTask.projectId === undefined) {
        newTask.projectId = "null";
        newTask.assignedTo = "self";
      }
      const result = new TaskModel(newTask);
      await result.save();
      return { result, message: "Task created successfully" };
    } catch (error) {
      return error;
    }
  }

  async getTasks(user: any) {
    try {
      console.log(user);
      const createdTasks = await TaskModel.find({ creator: user.userId });
      const assignedTasks = await TaskModel.find({ assignedTo: user.userId });
      return { createdTasks, assignedTasks };
    } catch (error) {
      return error;
    }
  }
}

export default new TaskService();
