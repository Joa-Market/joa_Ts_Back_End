export {};

declare global {
  namespace Express {
    interface User {
      id?: number;
      email: string;
      password: string;
      snslogin?: string;
      nickName: string;
      salt: string;
      image?: string; }
    interface Request {
      user?: User|undefined
    }
  }
}