import express from "express";
import hbs from "hbs";
const app = express();
const port = 3000;
import multer from "multer";
import path from "path";
import router from "./routes/index.js";
import pool from "./models/connect.js";
import fs from "fs";

// Setup view
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});



// Middleware
app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads")); // untuk akses gambar
app.use(express.urlencoded({ extended: true }));

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Menampilkan Semua Proyek
app.get("/project", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
  res.render("project", { project: result.rows });
});

// Mengirimkan Inputan Proyek
app.post("/submit", upload.single("image-project"), async (req, res) => {
  const { name, "start-date": startDate, "end-date": endDate, desc, node, next, react, typescript } = req.body;

  const technologies = [];
  if (node) technologies.push("node");
  if (next) technologies.push("next");
  if (react) technologies.push("react");
  if (typescript) technologies.push("typescript");
  const imagePath = req.file ? req.file.filename : null;

  // Hitung selisih tahun dan bulan
  const start = new Date(startDate);
  const end = new Date(endDate);
  const year = new Date(endDate).getFullYear();
  let yearDifference = end.getFullYear() - start.getFullYear();
  let monthsFromYears = yearDifference * 12;
  let monthDifference = end.getMonth() - start.getMonth();
  let durationInMonths = monthsFromYears + monthDifference;
  // Kalau tanggal di akhir bulan dan tanggal mulai di awal bulan, tambahkan 1 bulan
  if (end.getDate() >= start.getDate()) {
    durationInMonths += 1;
  }
  // Tentukan label durasi
  let tempDur = "";
  if (durationInMonths < 1) {
    tempDur = ">1 bulan";
  } else if (durationInMonths >= 36) {
    tempDur = ">3 tahun";
  } else if (durationInMonths >= 24) {
    tempDur = "2 tahun";
  } else if (durationInMonths >= 12) {
    tempDur = "1 tahun";
  } else {
    tempDur = `${durationInMonths} bulan`;
  }

  const duration = tempDur;
  await pool.query("INSERT INTO projects (name, start_date, end_date, year, duration, description, technologies, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
    name,
    startDate,
    endDate,
    year,
    duration,
    desc,
    technologies,
    imagePath,
  ]);
  res.redirect("/project");
});

// Menampilkan Detail Proyek
app.get("/project/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  const project = result.rows[0];

  const options = { day: "2-digit", month: "short", year: "numeric" };
  const startDateFormatted = new Date(project.start_date).toLocaleDateString("en-GB", options);
  const endDateFormatted = new Date(project.end_date).toLocaleDateString("en-GB", options);

  res.render("detail", {
    project: {
      ...project,
      date_range: `${startDateFormatted} - ${endDateFormatted}`,
    },
  });
});

// Menghapus Proyek
app.post("/project/delete/:id", async (req, res) => {
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
});

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
