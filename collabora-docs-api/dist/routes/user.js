"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const fetch_user_1 = require("../middleware/fetch-user");
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.loginUser);
router.get("/me", fetch_user_1.fetchUser, user_controller_1.getUser);
module.exports = router;
//# sourceMappingURL=user.js.map