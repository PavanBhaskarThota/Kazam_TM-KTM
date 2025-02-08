import ProjectModel from "../Models/project.model";


class ProjectService {

  async createProject(project: any, user: any) {
    try {
      const newProject = {...project, creator: user.userId}
      newProject.members = []
      newProject.members.push(user.userId)
      const result = new ProjectModel(newProject)
      await result.save()
      return {result, message: "Project created successfully"};
    } catch (error) {
      return error;
    }
  }

  async getProjects(user: any) {
    try {
      const result = await ProjectModel.find({ members: user.userId });
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new ProjectService();