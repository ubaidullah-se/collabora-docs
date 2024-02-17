import express from "express";
import { fetchUser } from "../middleware/fetch-user";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  udpateProject,
} from "../controllers/project.controller";

const router = express.Router();

router.get("", fetchUser, getAllProjects);
router.post("", fetchUser, createProject);
router.get("/:id", fetchUser, getProject);
router.delete("/:id", fetchUser, deleteProject);
router.put("/:id", fetchUser, udpateProject);

module.exports = router;
