import * as express from "express"
const router = express.Router();
import userRouter from "./user"
import loginRouter from "./passport"
router.use("/", [loginRouter]);
router.use("/user",[userRouter]);
  
export default router;