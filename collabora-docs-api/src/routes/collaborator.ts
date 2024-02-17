import express from "express"
const router = express.Router()
import { fetchuser } from "../middleware/fetchUser"
import { createCollaborator, deleteCollaborator, getAllCollaborators, getCollaborator } from "../controllers/collaborator.controller"

router.post("/create", createCollaborator)
router.get("/:id", fetchuser, getCollaborator)
router.get("/:documentId", fetchuser, getAllCollaborators )
router.delete("/:id", fetchuser,  deleteCollaborator)


module.exports =  router
