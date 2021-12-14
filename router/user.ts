import * as express from "express";
const router = express.Router();
import controller from "../controller/user";
import passprotckeck from "../middlewares/passportmid";

router.route("/adress").post(passprotckeck.isLoggedIn,controller.addaddress);
router.route("/").get(passprotckeck.isLoggedIn,controller.getmyuser);

export = router;