import { Pool } from "pg";

// Konfigurasi koneksi ke database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "personal_web",
  password: "ahadiPOSTGRES",
  port: 5432,
});

export default pool;