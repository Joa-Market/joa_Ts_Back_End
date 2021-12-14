import * as passport from "passport";
import * as  jwt from "jsonwebtoken";
import * as express from "express"

const create = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(400).send({ result: "fail", msg: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const secre:jwt.Secret = process.env.SECRET_KEY?process.env.SECRET_KEY:"ch"
      const token = jwt.sign(
        {
          id: user["userid"],
        },
        secre
      );
      const data = { user: user };
      return res.status(200).send({
        result: "success",
        msg: "로그인 완료.",
        token: token,
        data: data,
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};


export = create;