const  tokenService = {
  async getLocalAccessToken() {
    const token = localStorage.getItem("token");
    return token;
  },

  updateLocalAccessToken(token:string) {
    localStorage.setItem("token", token);
  },

  getLocalRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
  },

  clearStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default  tokenService;
