/* EFFORT BELGIË — interactions */
(function () {
  "use strict";
  var doc = document;
  var body = doc.body;

  /* ---- Mobile nav ---- */
  var burger = doc.querySelector(".burger");
  var navMobile = doc.getElementById("nav-mobile");
  function closeNav() { body.classList.remove("nav-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }
  function toggleNav() {
    var open = body.classList.toggle("nav-open");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (burger) burger.addEventListener("click", toggleNav);
  if (navMobile) navMobile.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* ---- Header scroll state ---- */
  var header = doc.querySelector(".site-header");
  var sticky = doc.querySelector(".sticky-cta");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (sticky) sticky.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Hero video (respect reduced motion + fade in) ---- */
  var heroVideo = doc.querySelector(".hero__media video");
  if (heroVideo) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause && heroVideo.pause();
    } else {
      var big = window.matchMedia && window.matchMedia("(min-width: 880px)").matches;
      var src = (big && heroVideo.dataset.desktop) ? heroVideo.dataset.desktop : heroVideo.dataset.mobile;
      var tryPlay = function () {
        heroVideo.classList.add("is-ready");
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      };
      heroVideo.addEventListener("canplay", tryPlay);
      heroVideo.addEventListener("loadeddata", tryPlay);
      if (src) {
        heroVideo.src = src;
        heroVideo.load();
      }
      if (heroVideo.readyState >= 3) tryPlay();
    }
  }

  /* ---- Footer year ---- */
  var yr = doc.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
