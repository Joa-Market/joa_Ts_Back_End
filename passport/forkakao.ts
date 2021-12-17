import axios from "axios";
import passport from "passport";
import { Strategy } from "passport-kakao";
import { Users } from "../models/user"

const config = () => {
  passport.use(
    new Strategy({
      clientSecret: "test",
      clientID: process.env.KAKAO_ID || "Nonono!",
      callbackURL: "http://127.0.0.1/kakao/callback",
    },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const res = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const exUser = await Users.findOne({
            where: { snslogin: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await Users.create({
              email: res.data.kakao_account.email,
              nickName: res.data.properties.nickname,
              snslogin: res.data.id,
              password: "카카오유저",
              salt: "iskakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      })
  );
};
export default config;