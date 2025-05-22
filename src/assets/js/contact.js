// MENAMPILKAN PILIHAN SUBJECT KE TAMPILAN DROPDOWN
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


// 1. Ambil semua elemen yang memiliki class .dropdown-item di dalam halaman.
// 2. Untuk setiap elemen tersebut, tambahkan event listener click.
// 3. Saat elemen diklik, ambil nilai dari atribut data-value milik elemen yang diklik.
// 4. Isi nilai tersebut ke elemen input tersembunyi (<input type="hidden">) yang memiliki id selectedSubject.
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      const value = this.getAttribute('data-value');
      document.getElementById('selectedSubject').value = value;
    });
  });