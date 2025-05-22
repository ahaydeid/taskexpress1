import express from "express";
import hbs from "hbs";
const app = express();
const port = 3000;
import router from "./routes/index.js";

// Setup view engine
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");

// Middleware
app.use("/assets", express.static("src/assets"));
// app.use(express.static(path.join(__dirname, "views")));
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
