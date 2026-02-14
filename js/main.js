// ==============================
// GLOBAL UTILITIES
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Krishna Electrical & Automation loaded");
});

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================

class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll(".btn");
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener("mousemove", (e) => this.magnetize(e, btn));
      btn.addEventListener("mouseleave", () => this.reset(btn));
    });
  }

  magnetize(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }

  reset(btn) {
    btn.style.transform = "translate(0,0)";
  }
}


// ========================================
// CINEMATIC TEXT REVEAL
// ========================================

class TextReveal {
  constructor() {
    this.elements = document.querySelectorAll(".reveal-text");
    this.splitWords();
  }

  splitWords() {
    this.elements.forEach(el => {
      // Keep line breaks by converting them to <br>
      const raw = el.innerText.trim();
      const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

      el.innerHTML = "";

      let wordIndex = 0;

      lines.forEach((line, lineIdx) => {
        const words = line.split(" ").filter(Boolean);

        words.forEach((word) => {
          const span = document.createElement("span");
          span.className = "reveal-word";
          span.textContent = word;

          // stagger per word
          span.style.transitionDelay = `${wordIndex * 0.18}s`;
          wordIndex++;

          el.appendChild(span);

          // add a real space node after each word
          el.appendChild(document.createTextNode(" "));
        });

        // restore line breaks
        if (lineIdx < lines.length - 1) el.appendChild(document.createElement("br"));
      });

      setTimeout(() => {
        el.classList.add("active");
      }, 150);
    });
  }
}




// ========================================
// INIT ALL
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  new MagneticButtons();
  new TextReveal();
});
