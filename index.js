const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json()); 
// bisa juga pakai: app.use(express.json()); // Ini adalah untuk versi terbaru yang sudah built in body parser, tapi dipercobaan ini pakai metode lama
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  res.send("Halaman Utama");
});

app.get("/contact", (req, res) => {
  res.send("Halaman Kontak");
});

app.get("/project", (req, res) => {
  res.send("Halaman My Project");
});

app.post("/login", (req, res) => {
  console.log({ DataDariBody: req.body });
  res.send("Berhasil Login");
});

app.put("/username", (req, res) => {
  console.log({ UpdateData: req.body });
  res.send("Update Berhasil");
});

app.get("/ambildata", (req, res) => {
  const cleanQuery = {...req.query} 
  console.log({ urlParam: cleanQuery.alamat});
  res.send("Data berhasil dikirim");
});

app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome', name: 'Ahadi' });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
