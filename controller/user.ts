import { Users } from "../models/user"
import { address } from "../models/address"
import { salepost } from "../models/salepost"
import * as express from "express"
import * as crypto from "crypto";
import { logger } from "../config/logger"; //로그
async function emailCheck(email:String) {
    try {
        const isemail = await user.findOne({ where: { email: email } });
        if (isemail) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return true;
    }
}

async function nickNameCheck(nickname:String) {
    try {
        const isemail = await user.findOne({ where: { nickname: nickname } });
        if (isemail) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return true;
    }
}

const checkemail = async (req:express.Request, res:express.Response) => {
    const { email } = req.body;
    if (await emailCheck(email)) {
        return res
            .status(200)
            .send({ result: "fail", msg: "이메일이 중복되었습니다.", data: false });
    } else {
        return res
            .status(200)
            .send({ result: "fail", msg: "이메일이 중복없음", data: true });
    }
};

const checknickname = async (req:express.Request, res:express.Response) => {
    const { nickname } = req.body;
    if (await nickNameCheck(nickname)) {
        return res
            .status(200)
            .send({ result: "fail", msg: "닉네임이 중복되었습니다.", data: false });
    } else {
        return res
            .status(200)
            .send({ result: "fail", msg: "닉네임이 중복없음", data: true });
    }
};

//회원가입
const signup = async (req:express.Request, res:express.Response) => {
    const { nickName, email, pw } = req.body;
    try {
        if (await emailCheck(email)) {
            logger.error("POST /signup 이메일 중복");
            return res
                .status(400)
                .send({ result: "fail", msg: "이메일이 중복되었습니다." });
        } else {
            const salt = Math.round(new Date().valueOf() * Math.random()) + "";
            const hashpw = crypto
                .createHash("sha512")
                .update(pw + salt)
                .digest("hex");
            const users = user.create({
                nickname: nickName,
                email: email,
                pw: hashpw,
                salt: salt
            })
            logger.info("POST /signup");
            return res.status(200).send({ result: "success", msg: "회원가입 완료." });
        }
    } catch (error) {
        logger.error("POST /signup"+error);
        return res.status(400)
            .send({ result: "fail", msg: "DB 정보 조회 실패", error: error });
    }
};

const addaddress = async (req:express.Request, res:express.Response) => {
    const { x, y } = req.body;
    const user = res.locals.user;
    try {
        const addresses = address.create({
            address_name: "test",
            road_address_name: "test",
            x: x,
            y: y,
            userid: user.id,
        })
        logger.info("POST /adress");
        return res.status(200).send({ result: "success", msg: "주소 설정완료..!" });
    } catch (error) {
        logger.error("POST /adress"+error);
        return res.status(400).send({ result: "fail", msg: "주소 설정실패 확인요망!" });
    }

}

const getmyuser = async (req:express.Request, res:express.Response) =>{
    const user = res.locals.user;
    if(!user){
        
        logger.error("GET /user 유저없음");
        return res.status(400).send({ result: "fail", msg: "해당 유저 없음" });
    }else{
        logger.info("GET /user");
        return res.status(200).send({ result: "success", msg: "불러오기 성공", user });
    }
}
export = {
    signup: signup,
    addaddress: addaddress,
    getmyuser: getmyuser,
};