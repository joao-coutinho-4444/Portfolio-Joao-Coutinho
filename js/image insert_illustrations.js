const illustrationData = [
  { fileName: "Cartethiya - Wuthering Waves.png", title: "Cartethiya - Wuthering Waves", date: "2025" },
  { fileName: "Aphelios - League of Legends.png", title: "Aphelios - League of Legends", date: "2024" },
  { fileName: "Eminence in Shadow - Alpha.png", title: "Eminence in Shadow - Alpha", date: "2023" },
  { fileName: "Goku.png", title: "Son Goku - Dragon Ball Super", date: "2026" },
  { fileName: "Illustration.png", title: "OC - Lilith", date: "2024" },
  { fileName: "Jane Doe ZZZ.png", title: "Jane Doe - Zenless Zone Zero", date: "2026" },
  { fileName: "White Hair.png", title: "OC - Lyra", date: "2026" }
];

window.addEventListener("DOMContentLoaded", () => {
  const galleryRow = document.querySelector(".gallery-row");
  if (!galleryRow) {
    return;
  }

  galleryRow.innerHTML = "";

  const imagePromises = illustrationData.map(({ fileName, title, date }) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = `images/projects_illustrations/${fileName}`;
      img.className = "illustrations";
      img.alt = title;

      img.addEventListener("load", () => {
        resolve({ img, title, date, width: img.naturalWidth || 0 });
      });

      img.addEventListener("error", () => {
        resolve({ img, title, date, width: 0 });
      });
    });
  });

  Promise.all(imagePromises).then((images) => {
    const loadedCount = images.filter((item) => item.width > 0).length;
    console.log(`Illustration gallery loaded: ${images.length} images, ${loadedCount} succeeded`);

    images.sort((a, b) => a.width - b.width);
    images.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "illustration-card";

      const overlay = document.createElement("div");
      overlay.className = "illustration-overlay";
      overlay.innerHTML = `
        <div class="illustration-overlay-title">${item.title}</div>
        <div class="illustration-overlay-date">${item.date}</div>
      `;

      item.img.alt = item.title;
      card.appendChild(item.img);
      card.appendChild(overlay);
      galleryRow.appendChild(card);
    });
  });
});
