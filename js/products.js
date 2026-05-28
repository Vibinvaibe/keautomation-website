// ========================================
// PRODUCT DATA
// ========================================

const productsData = [
  {
    title: "Lighting Poles",
    description: "Custom height, load & site specific poles for solar and industrial use.",
    image: "assets/images/products/lighting-pole.png"
  },
  {
    title: "Foundation Bolts",
    description: "High-strength L, J & Anchor bolts manufactured as per structural specs.",
    image: "assets/images/products/foundation-bolt.jpg"
  },
  {
    title: "Cable Tray Supports",
    description: "Heavy-duty trays & supports for industrial cable routing.",
    image: "assets/images/products/cable tray support.jpg"
  },
  {
    title: "Solar Structures",
    description: "Durable steel structures engineered for solar installations.",
    image: "assets/images/products/solar-structure.jpg"
  },
  {
    title: "Fencing & Security Structures",
    description: "Industrial fencing solutions for solar plants, factories, and secure sites.",
    image: "assets/images/products/fencing.jpg"
  },
  {
    title: "Custom Steel Fabrication",
    description: "Drawing-based fabrication for one-off components and bulk project requirements.",
    image: "assets/images/products/cable-tray.jpg"
  },
  {
    title: "Electrical Materials",
    description: "Project-specific electrical tools, fittings, and accessories from one trusted source.",
    image: "assets/images/hero/Electrical-Materials-Supply.jpg"
  }
];


// ========================================
// RENDER PRODUCTS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("productTrack");
  if (!track) return;
  const carousel = track.parentElement;

  const fullData = [...productsData, ...productsData];

  fullData.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-media">
        <img src="${product.image}" alt="${product.title}" loading="lazy" decoding="async">
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
  let isInView = true;
  const speed = 48; // px per second
  let lastFrame = null;

  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isInView = entry.isIntersecting;
      if (isInView) {
        lastFrame = performance.now();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(carousel);

  function animate(now) {
    if (typeof now !== "number") {
      requestAnimationFrame(animate);
      return;
    }

    if (lastFrame === null) {
      lastFrame = now;
    }

    const delta = now - lastFrame;
    lastFrame = now;

    if (!document.hidden && isInView && !isPaused) {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth <= 0) {
        requestAnimationFrame(animate);
        return;
      }

      scrollX += (speed * delta) / 1000;

      if (scrollX >= halfWidth) {
        scrollX = 0;
      }

      track.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

});
