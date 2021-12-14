import { Users } from "../models/user"
import { address } from "../models/address"
import { salepost } from "../models/salepost"
import * as express from "express"
import { logger } from "../config/logger"; //로그

const postsalepost = async (req:express.Request, res:express.Response) => {
    const { title , productName, price, contents, productImg } = req.body;
    const user = res.locals.user;
    try {
        const post = salepost.create({
            title: title,
            productName: productName,
            price: price,
            contents: contents,
            userid: user.id,
        })
        logger.info("POST /adress");
        return res.status(200).send({ result: "success", msg: "글이 성공적으로 작성되었습니다." });
    } catch (error) {
        logger.error("POST /adress"+error);
        return res.status(200).send({ result: "fail", msg: "작성실패" });
    }
}

const getsalepost = async (req:express.Request, res:express.Response) => {
    let page: number = Number(req.query.page as String)
    const user = res.locals.user;
    try {
        let offset = 0;
        if (page > 1) {
          offset = 12 * (page - 1);
        }
        const { count, posts } = await salepost.findAndCountAll({
            include: [
              {
                model: user,
                as: "host",
                attributes: { exclude: ["password", "salt"]},
              },
              {
                  model : address,
                  attributes: "address_name"
              }
            ],
            // where: { private: false, end: false },
            // order: [["date", "ASC"]],
            offset: offset,
            limit: 12,
        })
        logger.info("GET /adress");
        return res.status(200).send({ result: "success", msg: "판매글 조회성공", posts : posts  });
    } catch (error) {
        logger.error("GET /adress"+error);
        return res.status(200).send({ result: "fail", msg: "작성실패" });
    }
}
const onesalepost = async (req:express.Request, res:express.Response)=>{
    const { id } = req.params;
    const user = res.locals.user;
    try {
        const posts = await salepost.findOne({
            where:{id: id },
            include: [
              {
                model: user,
                as: "host",
                attributes: { exclude: ["password", "salt"]},
              },
              {
                  model : address,
                  attributes: "address_name"
              }
            ]
        })
        logger.info("GET /adress");
        return res.status(200).send({ result: "success", msg: "판매글 조회성공",  });
    } catch (error) {
        logger.error("GET /adress"+error);
        return res.status(200).send({ result: "fail", msg: "작성실패" });
    }
}

export = {
    postsalepost: postsalepost,
    getsalepost:getsalepost,
    onesalepost:onesalepost,
};