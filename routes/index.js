import express from "express";
import { home } from "../controllers/homeController.js";
import { contact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", home);
router.get("/contact", contact);
router.get("/project", (req, res) => {
  res.send("Halaman My Project");
});

export default router;