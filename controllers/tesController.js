import pool from "../models/connect.js";

export function getTes(req, res) {
  pool.query("SELECT * FROM project", (error, result) => {
    console.log(result.rows);
    res.render("tes", result.rows);
  });
}