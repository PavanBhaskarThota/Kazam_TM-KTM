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
      return result;
    } catch (error) {
      return error;
    }
  }

  async getTasks(user: any) {
    try {
      const createdTasks = await TaskModel.find({ creator: user.userId });
      const assignedTasks = await TaskModel.find({ assignedTo: user.userId });
      const allTasks = [...createdTasks, ...assignedTasks];
      return allTasks;
    } catch (error) {
      return error;
    }
  }

  async updateTask(task: any, id: any) {
    try {
      console.log(task)
      const result = await TaskModel.findOneAndUpdate({ _id: id }, task, {
        new: true,
      });
      console.log(result)
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(id: any) {
    try {
      const result = await TaskModel.findOneAndDelete({ _id: id }, { new: true });
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new TaskService();
