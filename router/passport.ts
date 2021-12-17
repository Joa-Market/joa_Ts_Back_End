import * as express from "express";
import passport from "passport";
import * as passportlogin from "../controller/passprotlogin"
import passmid from "../middlewares/passportmid";
import usercontroller from "../controller/user";
import * as jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", passmid.isNotLoggedIn, passportlogin.default);

router.get("/logout", passmid.isLoggedIn, (req:express.Request, res:express.Response) => {
  req.logout();
  req.session.destroy(function (params:any) {
    res.status(401).send({result: "fail", msg: "로그아웃 실패 관리자에게.."})
  });
  res.send({result:"success" , msg : "로그아웃 완료..!"});
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    try {
      const user:any = req.user;
      const token = jwt.sign(
        {
          id: user?.id
        },
        process.env.SECRET_KEY||"test"
      );
      res.status(200).send({
        message: "로그인에 성공하였습니다.",
        user: user,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }
);

router.post("/signup", passmid.isNotLoggedIn, usercontroller.signup)

export default router;