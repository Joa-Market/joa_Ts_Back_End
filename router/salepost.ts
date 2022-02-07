import {Router} from "express"
import controllersalepost from "../controller/salepost";
import { z } from "zod"

const router = Router();

router.route("/").get( controllersalepost.getsalepost).post(controllersalepost.postsalepost);
router.route("/:id").get(controllersalepost.onesalepost);

export default router;

