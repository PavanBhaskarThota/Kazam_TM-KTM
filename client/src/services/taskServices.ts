import api from "../Api";

const taskServices = {
  async getTasks(id: any) {
    return await api.get(`/task/${id}`);
  },

  async createTask(task: any, id: any) {
    return await api.post(`/task/create/${id}`, task);
  },

  async updateTask(task: any, id: any) {
    return await api.patch(`/task/update/${id}`, task);
  },

  async deleteTask(id: any) {
    return await api.delete(`/task/delete/${id}`);
  },
};

export default taskServices;
