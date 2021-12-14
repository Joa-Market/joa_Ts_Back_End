const axios = require("axios");
import passport from "passport";
import KakaoStrategy from "passport-kakao";

const {
  users,
  sequelize,
} = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy.Strategy(
      {
        clientID : process.env.KAKAO_ID||"Nonono!",
        callbackURL: "http://127.0.0.1/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const res = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const exUser = await users.findOne({
            where: { kakaoid: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await users.create({
              email: res.data.kakao_account.email,
              nickname: res.data.properties.nickname,
              kakaoid: res.data.id
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};