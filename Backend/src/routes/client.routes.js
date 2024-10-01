import { Router } from "express";
import{
    loginClient,
    registerClient,
    logoutClient,
getName

} from "../controller/client.controller.js"
import { verifyJWTclient } from "../middlewares/authClient.middleware.js";


const router = Router()

router.route("/register").post(registerClient)
router.route("/login").post(loginClient)
router.route("/logout").post(logoutClient)
router.route("/name").get(getName)


export default router
