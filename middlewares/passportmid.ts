import * as jwt from "jsonwebtoken";
import * as express from "express"
const isLoggedIn = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

const isNotLoggedIn = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const secre:jwt.Secret = process.env.SECRET_KEY?process.env.SECRET_KEY:"ch"
    
    const token = jwt.sign(
      {
        id: req.user.id,
      },
      secre
    );
    const data = { user: req.user };
    res.status(200).send({ msg: "로그인 되있음요~!", data:data, token:token });
  }
};
export = {isLoggedIn, isNotLoggedIn}