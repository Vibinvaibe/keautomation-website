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
    this.rafMap = new WeakMap();
    this.pointerMap = new WeakMap();
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener("mousemove", (e) => this.magnetize(e, btn));
      btn.addEventListener("mouseleave", () => this.reset(btn));
    });
  }

  magnetize(e, btn) {
    this.pointerMap.set(btn, { clientX: e.clientX, clientY: e.clientY });
    if (this.rafMap.get(btn)) return;

    const rafId = requestAnimationFrame(() => {
      const pointer = this.pointerMap.get(btn);
      if (!pointer) return;

      const rect = btn.getBoundingClientRect();
      const x = pointer.clientX - rect.left - rect.width / 2;
      const y = pointer.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`;
      this.rafMap.delete(btn);
    });

    this.rafMap.set(btn, rafId);
  }

  reset(btn) {
    const rafId = this.rafMap.get(btn);
    if (rafId) {
      cancelAnimationFrame(rafId);
      this.rafMap.delete(btn);
    }
    btn.style.transform = "translate3d(0,0,0)";
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
// FORMSPREE ENHANCER
// ========================================

class FormspreeEnhancer {
  constructor() {
    this.forms = document.querySelectorAll('form[action*="formspree.io"]');
    this.setRedirects();
  }

  setRedirects() {
    const thanksPath = "/pages/thank-you/";
    const hasHttpOrigin = window.location.origin && window.location.origin !== "null";
    const nextUrl = hasHttpOrigin ? `${window.location.origin}${thanksPath}` : thanksPath;

    this.forms.forEach((form) => {
      let nextInput = form.querySelector('input[name="_next"]');
      if (!nextInput) {
        nextInput = document.createElement("input");
        nextInput.type = "hidden";
        nextInput.name = "_next";
        form.appendChild(nextInput);
      }
      nextInput.value = nextUrl;
    });
  }
}




// ========================================
// INIT ALL
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  new MagneticButtons();
  new TextReveal();
  new FormspreeEnhancer();
});
