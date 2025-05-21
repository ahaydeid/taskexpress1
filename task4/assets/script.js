// Ambil nilai dan tampilkan pilihan subject
let selectedSubject = ""; // variabel untuk menyimpan subject yang dipilih, dibuat global supaya bisa diakses function getData()
let items = document.querySelectorAll(".dropdown-item");  // Ambil semua element HTML yang punya class .dropdown-item
let dropdownText = document.getElementById("dropdownText"); // Lokasi ngasih value elemen yang dipilih

items.forEach(item => {  // Looping semua item yang ada di dropdown
  item.addEventListener("click", function () { // Ketika item di klik
    // Ambil value dari item yang di klik
    dropdownText.textContent = this.textContent; // Tampilkan value yang dipilih di dropdown
    selectedSubject = this.textContent; // Simpan nilai yang dipilih
  });
});

// Fungsi untuk ambil value dari inputan biasa
function getData(event){
    event.preventDefault()

    let name = document.getElementById("nama").value;
    let mail = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("pesan").value;

    console.log(name);
    console.log(mail);
    console.log(phone);
    console.log(selectedSubject);
    console.log(message);
}