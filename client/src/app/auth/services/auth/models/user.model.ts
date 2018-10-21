export interface UserModel {
  success: any;
  token: string;
  mgs: string;
  user: {
    id: string,
    name: string,
    username: string,
    email: string
  };
}
