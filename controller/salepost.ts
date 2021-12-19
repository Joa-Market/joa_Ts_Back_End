import { Users } from "../models/user"
import { address } from "../models/address"
import { salepost } from "../models/salepost"
import * as express from "express"
import { logger } from "../config/logger"; //로그
import upload from "../utils/ups3";

const postsalepost = async (req:express.Request, res:express.Response) => {
    const { title , productName, price, contents } = req.body;
    const user:any = req.user
    let productImg:string = "";
    try {
        const img:any = req.file; 
        if(img){
            upload.single("productImg");
            productImg = img.location;
        }
        if(productImg == ""){
            return res.status(400).send({result: "fail", msg: "이미지가 오지않고있습니다.!"})
        }
        const post = await salepost.create({
            userid!: user!.id!,
            title: title,
            contents: contents,
            productImg: productImg,
            productName: productName,
            price: price,
        })
        logger.info("POST /adress");
        return res.status(200).send({ result: "success", msg: "글이 성공적으로 작성되었습니다." });
    } catch (error) {
        logger.error("POST /adress"+error);
        return res.status(400).send({ result: "fail", msg: "작성실패" });
    }
}

const getsalepost = async (req:express.Request, res:express.Response) => {
    let page: number = Number(req.query.page as String)
    const user = req.user;
    try {
        let offset = 0;
        if (page > 1) {
          offset = 12 * (page - 1);
        }
        const post = await salepost.findAndCountAll({
            include: [
              {
                model: Users,
                attributes: { exclude: ["password", "salt"]},
              },
              {
                  model : address
              }
            ],
            // where: { private: false, end: false },
            // order: [["date", "ASC"]],
            offset: offset,
            limit: 12,
        })
        logger.info("GET /adress");
        return res.status(200).send({ result: "success", msg: "판매글 조회성공", post : post.rows , count : post.count  });
    } catch (error) {
        logger.error("GET /adress"+error);
        return res.status(200).send({ result: "fail", msg: "작성실패" });
    }
}
const onesalepost = async (req:express.Request, res:express.Response)=>{
    const { id } = req.params;
    const user = req.user
    try {
        const posts = await salepost.findOne({
            where:{ id: id },
            include: [
              {
                model: Users,
                attributes: { exclude: ["password", "salt"]},
              },
              {
                  model : address
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