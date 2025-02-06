
export interface UserData {
    name: string,
    email: string,
    password: string
}
  
 export interface SaveUserToLocalStorageInput {
    user: UserData;
    token: string;
    message: string;
    error: string;
  }