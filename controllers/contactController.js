export function contact(req, res) {
  res.render("contact");
}

export function sendContact(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const subject = req.body.subject;
  const message = req.body.message;
  console.log("\n");
  console.log("---DATA BARU DARI CLIENT---");
  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(message);
  res.redirect("/contact");
}
