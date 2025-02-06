import api from "../Api";
import { UserData } from "../Types/commonTypes";

const authServices = {
  async createUser(userData: UserData) {
    return await api.post("/user/signup", userData);
  },

  async loginUser(userData: UserData) {
    return await api.post("/user/login", userData);
  },
};

export default authServices;
