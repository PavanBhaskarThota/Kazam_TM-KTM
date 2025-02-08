import api from "../Api"


const projectServices = {
  async getProjects(user:any){
    return await api.get(`/projects/${user.userId}`)
  }
}

export default projectServices