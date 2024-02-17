import express from "express";
import { fetchUser } from "../middleware/fetch-user";
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
} from "../controllers/document.controller";

const router = express.Router();

router.get("", fetchUser, getAllDocuments);
router.post("", fetchUser, createDocument);
router.get("/:id", fetchUser, getDocument);
router.delete("/:id", fetchUser, deleteDocument);
router.put("/:id", fetchUser, updateDocument);

module.exports = router;
