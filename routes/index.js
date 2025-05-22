import express from "express";
import { home } from "../controllers/homeController.js";
import { contact, sendContact } from "../controllers/contactController.js";
import { project, sendProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", home);
router.get("/contact", contact);
router.post("/submit", sendContact);
router.get("/project", project);
// router.post("/submit-project", sendProject);

export default router;
