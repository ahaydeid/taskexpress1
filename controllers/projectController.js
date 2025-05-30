import pool from "../models/connect.js";
import fs from "fs";

export const getAllProjects = async (req, res) => {
  const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
  res.render("project", { project: result.rows });
};

// Create Project
export const submitProject = async (req, res) => {
  const { name, "start-date": startDate, "end-date": endDate, desc, node, next, react, typescript } = req.body;

  // Untuk checkbox technologies, kalau diceklis, maka nilainya push ke array technologies
  const technologies = [];
  if (node) technologies.push("node");
  if (next) technologies.push("next");
  if (react) technologies.push("react");
  if (typescript) technologies.push("typescript");

  // Untuk inputan image
  const imagePath = req.file ? req.file.filename : null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const year = end.getFullYear();
  let durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() >= start.getDate()) durationInMonths += 1;

  let tempDur = "";
  // Menterjemahkan ke dalam tulisan
  if (durationInMonths < 1) tempDur = ">1 bulan";
  else if (durationInMonths >= 36) tempDur = ">3 tahun";
  else if (durationInMonths >= 24) tempDur = "2 tahun";
  else if (durationInMonths >= 12) tempDur = "1 tahun";
  else tempDur = `${durationInMonths} bulan`;

  await pool.query("INSERT INTO projects (name, start_date, end_date, year, duration, description, technologies, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
    name,
    startDate,
    endDate,
    year,
    tempDur,
    desc,
    technologies,
    imagePath,
  ]);

  res.redirect("/project");
};

export const getProjectDetail = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  const project = result.rows[0];

  // Untuk Isi durasi (Tanggal - Tanggal)
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const startDateFormatted = new Date(project.start_date).toLocaleDateString("en-GB", options);
  const endDateFormatted = new Date(project.end_date).toLocaleDateString("en-GB", options);

  res.render("detail", {
    project: {
      ...project,
      date_range: `${startDateFormatted} - ${endDateFormatted}`,
    },
  });
};

// Menghapus Proyek
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // Dapatkan informasi project yang akan dihapus
    const result = await pool.query("SELECT image_path FROM projects WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Project tidak ditemukan");
    }

    const imagePath = result.rows[0].image_path;

    // Hapus dari database
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);

    // Hapus file gambar di folder uploads
    if (imagePath) {
      const filePath = `uploads/${imagePath}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Gagal menghapus file:", err);
        } else {
        }
      });
    }

    res.redirect("/project");
  } catch (error) {
    console.error("Gak bisa menghapus project:", error);
    res.status(500).send("Terjadi kesalahan");
  }
};
