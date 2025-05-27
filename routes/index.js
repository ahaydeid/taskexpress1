import express from "express";
import multer from "multer";
import path from "path";
import { home } from "../controllers/homeController.js";
import { contact, sendContact } from "../controllers/contactController.js";
import { getAllProjects, submitProject, getProjectDetail, deleteProject } from "../controllers/projectController.js";
const router = express.Router();

router.get("/", home);
router.get("/contact", contact);
router.post("/submit-contact", sendContact);
router.get("/project", getAllProjects);
router.get("/project/:id", getProjectDetail);
router.post("/project/delete/:id", deleteProject);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.post("/submit", upload.single("image-project"), submitProject);

export default router;
