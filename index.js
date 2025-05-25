import express from "express";
import hbs from "hbs";
const app = express();
const port = 3000;
import router from "./routes/index.js";
// import pool from "./models/connect.js";

// Setup view engine
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");

// Middleware
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: true }));

// app.get("/tes", (req, res) => {
//   pool.query("SELECT * FROM project", (error, result) => {
//     console.log(result.rows);
//   });
//   res.send("tes");
// });

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
