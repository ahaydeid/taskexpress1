import express from "express";
import hbs from "hbs";
import router from "./routes/index.js";

const app = express();
const port = 3000;

// View engine setup
app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");
hbs.registerHelper("eq", (a, b) => a === b);

// Middleware
app.use(express.json());
app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(router);

// Start server
app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
