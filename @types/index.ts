import {Users} from '../models/user'; // <- User class
export {};

declare global {
  namespace Express {
    export interface User extends Users { }
    interface Request {
      user?: User
    }
  }
}