import * as jwt from "jsonwebtoken";
import * as express from "express"
import { Users } from "../models/user";
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
    const userid:any = req.user; 
    const token = jwt.sign(
      {
        id: userid.id,
      },
      secre
    );
    res.status(200).send({ msg: "로그인 되있음요~!", user:req.user });
  }
};
export = {isLoggedIn, isNotLoggedIn}