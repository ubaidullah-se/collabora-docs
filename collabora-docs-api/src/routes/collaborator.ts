import express from "express";
import { fetchUser } from "../middleware/fetch-user";
import {
  createCollaborator,
  deleteCollaborator,
  getAllCollaborators,
} from "../controllers/collaborator.controller";

const router = express.Router();

router.post("", createCollaborator);
router.get("", fetchUser, getAllCollaborators);
router.delete("/:id", fetchUser, deleteCollaborator);

module.exports = router;
