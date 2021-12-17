import express from "express"
import * as dotenv from "dotenv";
dotenv.config();
import passprot from "passport";
import * as path from "path";
import cookieParser from "cookie-parser"
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
// import * as redis from 'redis'; //레디스 
// const redisClinet = require("./config/redis");
// const redisStore = require("connect-redis")(session);
import Router from "./router/index";
const app = express();
app.use(express.json())
import passportConfig from './passport';

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET||"nono",
    // secure: true,
    // httpOnly: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: true
    },
    // store: new redisStore({
    //     client: redisClinet
    // })
})

app.use(sessionMiddleware);

// const whitelist = [process.env.MYROCAL]
const corsOptions = {
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1|| !origin) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("아.. 좀 비켜봐 넌 안되 나가."));
    //   }
    // },
    origin : true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.SECRET_KEY));

app.use(passprot.initialize());
app.use(passprot.session());
passportConfig();
app.use(morgan("common"));

app.use("/api",[Router]);

app.use((req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const error =  new Error(`${req.method} ${req.url} 라우터 없음..!`);
    next(error)
})
app.use((err:Error, req:express.Request, res: express.Response, next:express.NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.send(err.message);
});

import sequelzie from "./models"

export = { app , sessionMiddleware }
// app.listen(3000,async () => {
//     console.log(`Server Listening on 80`);

//     // //sequelize-db 연결 테스트
//      await sequelzie.authenticate()
//      .then(async () => {
//          console.log("연결 되었습니다.");
//      })
//      .catch((e) => {
//          console.log('TT : ', e);
//      })
// })
