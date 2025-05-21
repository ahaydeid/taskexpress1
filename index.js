import express from "express";
import hbs from "hbs";
const app = express();
const port = 3000;

hbs.registerPartials("src/views/partials");
// app.use(express.json());
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);

app.get("/contact", (req, res) => {
  res.send("Halaman Kontak");
});

app.get("/project", (req, res) => {
  res.send("Halaman My Project");
});

let data = [
  {nama: "ahadi",
  alamat: "Tangerang"
},
{
  nama: "Zahro",
  alamat: "Tenjo"
},
{
  nama: "Rahma",
  alamat: "Jakarta"
}
]

function home(req, res) {
  res.render("home", {data});
}

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
