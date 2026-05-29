/* FOUNDRY — site behavior: nav scroll state, mobile menu, scroll reveal */
(function () {
  "use strict";

  // --- Nav solid-on-scroll ---
  var nav = document.getElementById("nav");
  if (nav) {
    var preset = nav.classList.contains("scrolled"); // some pages force solid nav
    var onScroll = function () {
      if (preset || window.scrollY > 20) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile burger menu ---
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    // close menu after tapping a link
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  // --- Scroll reveal (.rv -> .rv.in) ---
  var revealables = document.querySelectorAll(".rv:not(.in)");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
