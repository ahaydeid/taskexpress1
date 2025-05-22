const data = [
  { nama: "ahadi", alamat: "Tangerang" },
  { nama: "Zahro", alamat: "Tenjo" },
  { nama: "Rahma", alamat: "Jakarta" },
];

export function home(req, res) {
  res.render("home", { data });
}
