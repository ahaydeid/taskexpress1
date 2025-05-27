import express from "express";
import { home } from "../controllers/homeController.js";
import { contact, sendContact } from "../controllers/contactController.js";
// import { project } from "../controllers/projectController.js";
// import { getTes } from "../controllers/tesController.js";

const router = express.Router();

router.get("/", home);
router.get("/contact", contact);
router.post("/submit-contact", sendContact);
// router.get("/project", project);
// router.get("/tes", getTes);

export default router;
