"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
const fetchUser_1 = require("../middleware/fetchUser");
router.post("/me", user_controller_1.getMe);
router.post("/login", fetchUser_1.fetchuser, user_controller_1.loginUser);
module.exports = router;
//# sourceMappingURL=user.js.map