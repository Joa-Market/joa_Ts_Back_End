import AWS from "aws-sdk"
import multer from "multer"
import muulterS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const bucket = AWS.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region:"ap-northeast-2"
})

const upload = multer({
    storage: muulterS3({
        s3: new AWS.S3(),
        bucket: process.env.bucket||"test",
        key(req, file, cb){
            cb(null, `orginal/${Date.now()} ${path.basename(file.originalname)}`);
        },
        acl:"public-read-write",
    }),
    limits:{fileSize:5*1024*1024},
});

export default upload;