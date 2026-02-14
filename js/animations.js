// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".fade-up, .fade-in");

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
};

document.querySelectorAll(".accordion-item").forEach(item => {
  const title = item.querySelector('.accordion-title');
  if (title) {
    title.addEventListener("click", () => {
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
      // Toggle current
      item.classList.toggle('active');
    });
  }
});


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
