"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetch_user_1 = require("../middleware/fetch-user");
const project_controller_1 = require("../controllers/project.controller");
const router = express_1.default.Router();
router.get("", fetch_user_1.fetchUser, project_controller_1.getAllProjects);
router.post("", fetch_user_1.fetchUser, project_controller_1.createProject);
router.get("/:id", fetch_user_1.fetchUser, project_controller_1.getProject);
router.delete("/:id", fetch_user_1.fetchUser, project_controller_1.deleteProject);
router.put("/:id", fetch_user_1.fetchUser, project_controller_1.udpateProject);
module.exports = router;
//# sourceMappingURL=project.js.map