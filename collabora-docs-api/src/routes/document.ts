import express from "express"
const router = express.Router()
import { fetchuser } from "../middleware/fetchUser"
import { createDocument, deleteDocument, getAllDocuments, getDocument, getLatestDocument, updateDocument } from "../controllers/document.controller"

router.post("/create", fetchuser, createDocument)
router.get("/:id", fetchuser, getDocument)
router.get("/:id", fetchuser,getLatestDocument )
router.get("", fetchuser,getAllDocuments )
router.delete("/:id", fetchuser,  deleteDocument)
router.put("/:id", fetchuser,  updateDocument)


module.exports =  router
