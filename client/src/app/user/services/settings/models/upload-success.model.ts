export interface UploadSuccess {
  success: string;
  msg: string;
  user: {
    id: string,
    name: string,
    username: string,
    email: string
  }
}
