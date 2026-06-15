const illustrationFiles = [
  "Cartethiya - Wuthering Waves.png",
  "Aphelios - League of Legends.png",
  "Eminence in Shadow - Alpha.png",
  "Goku.png",
  "Illustration.png",
  "Jane Doe ZZZ.png",
  "White Hair.png"
];

window.addEventListener("DOMContentLoaded", () => {
  const galleryRow = document.querySelector(".gallery-row");
  if (!galleryRow) {
    return;
  }

  galleryRow.innerHTML = "";

  const imagePromises = illustrationFiles.map((fileName) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = `images/projects_illustrations/${fileName}`;
      img.className = "illustrations";

      img.addEventListener("load", () => {
        resolve({ img, width: img.naturalWidth || 0 });
      });

      img.addEventListener("error", () => {
        resolve({ img, width: 0 });
      });
    });
  });

  Promise.all(imagePromises).then((images) => {
    images.sort((a, b) => a.width - b.width);
    images.forEach((item, index) => {
      item.img.alt = `Illustration ${index + 1}`;
      galleryRow.appendChild(item.img);
    });
  });
});
