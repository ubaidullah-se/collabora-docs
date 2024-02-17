"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetch_user_1 = require("../middleware/fetch-user");
const collaborator_controller_1 = require("../controllers/collaborator.controller");
const router = express_1.default.Router();
router.post("", collaborator_controller_1.createCollaborator);
router.get("", fetch_user_1.fetchUser, collaborator_controller_1.getAllCollaborators);
router.delete("/:id", fetch_user_1.fetchUser, collaborator_controller_1.deleteCollaborator);
module.exports = router;
//# sourceMappingURL=collaborator.js.map