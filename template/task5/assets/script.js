// Object untuk ubah nilai checkbox menjadi nama file ikon
const iconMap = {
  node: "node.svg",
  react: "react.svg",
  next: "next.svg",
  typescript: "typescript.svg",
};
// Mulai jalankan fungsi
function getData(event) {
  event.preventDefault();

  const checkboxes = document.querySelectorAll(".checkbox");
  let name = document.getElementById("name").value;
  let start = new Date(document.getElementById("start-date").value);
  let end = new Date(document.getElementById("end-date").value);
  let description = document.getElementById("desc").value;
  let photo = document.getElementById("file-input").files[0];

  // Menghitung selisih dalam bulan antara dua tanggal: start dan end
  let yearDifference = end.getFullYear() - start.getFullYear();  // Ambil selisih tahun antara tanggal akhir dan tanggal mulai
  let monthsFromYears = yearDifference * 12;  // Ubah selisih tahun ke bulan
  let monthDifference = end.getMonth() - start.getMonth();  // Ambil selisih bulan dari tahun yang sama
  let durationInMonths = monthsFromYears + monthDifference; // Total durasi dalam bulan

  let durationLabel = "";
  if (durationInMonths < 1) {
    durationLabel = ">1 bulan";
  } else if (durationInMonths >= 36) {
    durationLabel = ">3 tahun";
  } else if (durationInMonths >= 24) {
    durationLabel = "2 tahun";
  } else if (durationInMonths >= 12) {
    durationLabel = "1 tahun";
  } else {
    durationLabel = `${durationInMonths} bulan`;
  }

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
  alert("Tanggal mulai atau selesai tidak valid!");
  return;
}


  let photoProject = photo? URL.createObjectURL(photo) : "assets/img/logo-dumbways.png";


  // Buat elemen ikon dari checkbox tercentang
  // const iconsHTML = [];
  // checkboxes.forEach((cb) => {
  //   if (cb.checked) {
  //     const iconName = cb.value;
  //     const iconSrc = iconMap[iconName];
  //     if (iconSrc) {
  //       iconsHTML.push(`<img src="/assets/icon/${iconSrc}" style="width: 40px; height: 40px;" alt="${iconName}">`);
  //     }
  //   }
  // });

  const iconsHTML = Array.from(checkboxes)
  .filter(cb => cb.checked && iconMap[cb.value])
  .map(cb => {
    const iconName = cb.value;
    const iconSrc = iconMap[iconName];
    return `<img src="assets/icon/${iconSrc}" style="width: 40px; height: 40px;" alt="${iconName}">`;
  });


  // Buat elemen project card
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
        <img src="${photoProject}" alt="" style="width: 100%; height: 250px; object-fit: cover; border-radius: 5px;">
        <div class="year" style="display: flex;">
            <h5 class="mt-3" style="font-size: 17px;">${name}</h5>
            <h5 class="mt-3" style="font-size: 17px;">&nbsp;-&nbsp;${end.getFullYear()}</h5> 
        </div>
        <div class="mb-3 text-secondary" style="display: flex;">
            <h6 class="me-2" style="font-size: 14px;">Durasi :</h6>
            <h6 style="font-size: 14px;" class="month">${durationLabel}</h6>
        </div>
        <div class="desc-box">
            <p style="font-size: 14px; margin-right: 25px;" id="desc-text">${description}</p>
        </div>
        <div class="mb-3 text-secondary d-flex" style="gap: 15px;">
            ${iconsHTML.join("")}
        </div>
        <div class="button-card mb-3" style="display: flex; padding: 5px; gap: 10px;">
            <button class="btn edit flex-fill">edit</button>
            <button class="btn delete flex-fill">delete</button>
        </div>
    `;
  document.querySelector(".project-container").appendChild(projectCard);
}

