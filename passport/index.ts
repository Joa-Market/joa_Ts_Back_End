import passport from "passport";
import local from "./local";
import kakao from "./forkakao";
const {
  users,
  sequelize
} = require("../models");

export = () => {
  passport.serializeUser((User:{userid:Number}, done) => {
    done(null, user?.userid);
  });

  passport.deserializeUser((id:Number, done) => {
    users.findOne({
      where: { userid : id }
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  kakao();
};