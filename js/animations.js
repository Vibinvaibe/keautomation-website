// ========================================
// GLOBAL ANIMATION ENGINE
// ========================================

class AnimationEngine {
  constructor() {
    this.elements = document.querySelectorAll("[data-animate]");
    this.initObserver();
  }

  initObserver() {
    const options = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      options
    );

    this.elements.forEach(el => {
      this.prepareElement(el);
      this.observer.observe(el);
    });
  }

  prepareElement(el) {
    const type = el.dataset.animate;

    el.style.opacity = "0";
    el.style.transitionProperty = "transform, opacity";
    el.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";

    const duration = el.dataset.duration || 800;
    const delay = el.dataset.delay || 0;

    el.style.transitionDuration = duration + "ms";
    el.style.transitionDelay = delay + "ms";

    switch (type) {
      case "fade-up":
        el.style.transform = "translateY(40px)";
        break;
      case "fade-down":
        el.style.transform = "translateY(-40px)";
        break;
      case "fade-left":
        el.style.transform = "translateX(40px)";
        break;
      case "fade-right":
        el.style.transform = "translateX(-40px)";
        break;
      case "zoom-in":
        el.style.transform = "scale(0.85)";
        break;
      case "zoom-out":
        el.style.transform = "scale(1.1)";
        break;
      default:
        el.style.transform = "translateY(40px)";
    }
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateIn(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateIn(el) {
    el.style.opacity = "1";
    el.style.transform = "translate(0,0) scale(1)";
  }
}


// ========================================
// SERVICES ACCORDION (HOVER ENGINE)
// ========================================

// ========================================
// CINEMATIC HOVER ACCORDION
// ========================================

class HoverAccordion {
  constructor(selector) {
    this.items = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const content = item.querySelector(".accordion-content");

      content.style.height = "0px";
      content.style.overflow = "hidden";
      content.style.transition = "height 600ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease";
      content.style.opacity = "0";

      item.addEventListener("mouseenter", () => {
        this.closeAll(item);
        item.classList.add("active");
        content.style.height = content.scrollHeight + "px";
        content.style.opacity = "1";
      });

      item.addEventListener("mouseleave", () => {
        item.classList.remove("active");
        content.style.height = "0px";
        content.style.opacity = "0";
      });
    });
  }

  closeAll(current) {
    this.items.forEach(item => {
      if (item !== current) {
        const content = item.querySelector(".accordion-content");
        item.classList.remove("active");
        content.style.height = "0px";
        content.style.opacity = "0";
      }
    });
  }
}



// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  new AnimationEngine();
  new HoverAccordion(".accordion-item");
});
