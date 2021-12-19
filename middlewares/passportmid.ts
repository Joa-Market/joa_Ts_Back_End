import * as jwt from "jsonwebtoken";
import * as express from "express"

const isLoggedIn = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send({ result: "fail", msg: "로그인이 필요한 작업" });
  }
};

const isNotLoggedIn = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const secre:jwt.Secret = process.env.SECRET_KEY?process.env.SECRET_KEY:"ch"
    const userid:any = req.user!; 
    const token = jwt.sign(
      {
        id: userid.id,
      },
      secre
    );
    res.status(200).send({result: "fail", msg: "로그인이 이미 되어있음..", user:userid });
  }
};
export = {isLoggedIn, isNotLoggedIn}