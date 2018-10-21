export interface RandomArtistsModel {
  success: any;
  msg: string;
  users: Array<{
    username: string,
    artwork: string,
  }>;
}
