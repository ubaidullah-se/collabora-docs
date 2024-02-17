import express from "express";
import { register, getUser, loginUser } from "../controllers/user.controller";
import { fetchUser } from "../middleware/fetch-user";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/me", fetchUser, getUser);

module.exports = router;
