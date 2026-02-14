// ========================================
// PRODUCT DATA
// ========================================

const productsData = [
  {
    title: "Lighting Poles",
    description: "Custom height, load & site specific poles for solar and industrial use.",
    image: "assets/images/products/lighting-pole.jpg"
  },
  {
    title: "Foundation Bolts",
    description: "High-strength L, J & Anchor bolts manufactured as per structural specs.",
    image: "assets/images/products/foundation-bolt.jpg"
  },
  {
    title: "Cable Tray Systems",
    description: "Heavy-duty trays & supports for industrial cable routing.",
    image: "assets/images/products/cable-tray.jpg"
  },
  {
    title: "Solar Structures",
    description: "Durable steel structures engineered for solar installations.",
    image: "assets/images/products/solar-structure.jpg"
  }
];


// ========================================
// RENDER PRODUCTS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("productTrack");
  if (!track) return;

  const fullData = [...productsData, ...productsData];

  fullData.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-media">
        <img src="${product.image}" alt="${product.title}">
      </div>

      <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
      </div>
    `;

    track.appendChild(card);
  });

  // ========================================
  // AUTO FILM SCROLL
  // ========================================

  let scrollX = 0;
  let isPaused = false;
  const speed = 0.6;

  track.parentElement.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  track.parentElement.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  function animate() {
    if (!isPaused) {
      scrollX += speed;

      if (scrollX >= track.scrollWidth / 2) {
        scrollX = 0;
      }

      track.style.transform = `translateX(-${scrollX}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();

});
