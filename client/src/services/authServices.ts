import api from "../Api";
import { UserData } from "../Types/commonTypes";

const authServices = {
  async createUser(userData: UserData) {
    return await api.post("/users/signup", userData);
  },
};

export default authServices;
