import {Router} from "express"
import controllersalepost from "../controller/salepost";

const router = Router();

router.route("/").get(controllersalepost.getsalepost).post(controllersalepost.postsalepost);
router.route("/:id").get(controllersalepost.onesalepost);

export default router;

