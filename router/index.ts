import * as express from "express"
const router = express.Router();

const userRouter = require("./user");
const loginRouter = require("./passport");
router.use("/", [loginRouter]);
router.use("/user",[userRouter]);
  
export {router};