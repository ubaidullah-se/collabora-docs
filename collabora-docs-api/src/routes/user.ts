import express from "express"
const router = express.Router()
import {getMe, loginUser} from "../controllers/user.controller"
import { fetchuser } from "../middleware/fetchUser"

router.post("/me", getMe)
router.post("/login", fetchuser, loginUser)


module.exports =  router
