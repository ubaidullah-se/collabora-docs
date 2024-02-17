"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetch_user_1 = require("../middleware/fetch-user");
const document_controller_1 = require("../controllers/document.controller");
const router = express_1.default.Router();
router.get("", fetch_user_1.fetchUser, document_controller_1.getAllDocuments);
router.post("", fetch_user_1.fetchUser, document_controller_1.createDocument);
router.get("/:id", fetch_user_1.fetchUser, document_controller_1.getDocument);
router.delete("/:id", fetch_user_1.fetchUser, document_controller_1.deleteDocument);
router.put("/:id", fetch_user_1.fetchUser, document_controller_1.updateDocument);
module.exports = router;
//# sourceMappingURL=document.js.map