import express from "express";
import { newContact, getAllContacts, getContactById, updateContactById, deleteContactById } from "../Controllers/contact.js";
import { isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newContact);
router.get("/",  getAllContacts);
router.get("/:id", isAuthenticated, getContactById);
router.put("/:id", isAuthenticated, updateContactById);
router.delete("/:id", isAuthenticated, deleteContactById);

export default router;
 