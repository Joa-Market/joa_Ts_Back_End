import signUp from "../validation/validation";
import { Request, Response, NextFunction} from "express";

const singupValidation =async (req:Request, res:Response, next:NextFunction) => {
    const {nickName, email, password } = req.body;

    try {
        const value = await signUp.validateAsync({
            nickName,email,password,
        })
        next();
    } catch (error:any) {
        return res.status(400).send({
            result: "fail",
            msg: "회원가입 양식 확인.",
            err : error.message,
        })
    }
}

export = {singupValidation};
