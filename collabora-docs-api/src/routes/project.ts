import express from "express"
const router = express.Router()
import { fetchuser } from "../middleware/fetchUser"
import { createProject, deleteProject, getAllProjects, getProject, udpateProject } from "../controllers/project.controller"

router.post("/create", fetchuser, createProject)
router.get("/:id", fetchuser, getProject)
router.get("/", fetchuser, getAllProjects )
router.delete("/:id", fetchuser,  deleteProject)
router.put("/:id", fetchuser, udpateProject)


module.exports =  router
