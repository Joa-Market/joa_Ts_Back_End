import passport from "passport";
import crypto from "crypto";
import LocalStrategy from "passport-local";
import sequelize from "../models/index"
import { Users } from "../models/user"
import { address } from "../models/address"
export = () => {
  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email:string, password:string, done) => {
        try {
          const query = "select * from users where email = :email";
          const isuser = await sequelize.query(query, {
            replacements: {
              email: email,
            },
            type: sequelize.QueryTypes.SELECT,
          });
          const users = isuser[0];
          if (users) {
            const salt = users.salt;
            let inpw = crypto.createHash("sha512").update(password + salt).digest("hex");
            if (inpw === users.password) {
              done(null, users);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};