import express from "express"
const router = express.Router()
import {getMe, getUser, loginUser} from "../controllers/user.controller"
import { fetchuser } from "../middleware/fetchUser"

router.post("/me", getMe)
router.post("/details", fetchuser, getUser)
router.post("/login", loginUser)


module.exports =  router
