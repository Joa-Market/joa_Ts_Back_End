import * as express from "express";
const router = express.Router();
import userRouter from "./user";
import loginRouter from "./passport";
import salepostRouter from "./salepost";


router.use("/", [loginRouter]);
router.use("/user",[userRouter]);
router.use("/post",[salepostRouter]);
  
export default router;