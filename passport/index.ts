import passport from "passport";
import local from "./local";
import kakao from "./forkakao";
import { Users } from "../models/user";



const config = () => {
  passport.serializeUser((user:any, done) => {
    done(null, user?.id);
  });

  passport.deserializeUser((id:number, done) => {
    Users.findOne({
      where: { id: id }
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  kakao();
};
export default config