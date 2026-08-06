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

  /* ---- Hero video: mobile only (desktop shows the static photo) ---- */
  var heroVideo = doc.querySelector(".hero__media video");
  if (heroVideo) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var mobile = !window.matchMedia || window.matchMedia("(max-width: 879px)").matches;
    if (reduce || !mobile) {
      // Desktop / reduced-motion: never load or play — the static hero photo shows instead.
      heroVideo.removeAttribute("autoplay");
    } else {
      var tryPlay = function () {
        heroVideo.classList.add("is-ready");
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      };
      heroVideo.addEventListener("canplay", tryPlay);
      heroVideo.addEventListener("loadeddata", tryPlay);
      heroVideo.load();
      if (heroVideo.readyState >= 3) tryPlay();
    }
  }

  /* ---- Footer year ---- */
  var yr = doc.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---- GA4: funnel-events ---- */
  function track(naam, link) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", naam, {
      link_url: link ? link.href : undefined,
      link_text: link ? (link.textContent || "").trim().slice(0, 80) : undefined,
      page_path: location.pathname
    });
  }

  doc.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("wodapp.nl") !== -1 || href.indexOf("#boek") !== -1) track("proefles_klik", a);
    else if (href.indexOf("wa.me") !== -1) track("whatsapp_klik", a);
    else if (href.indexOf("tel:") === 0) track("bel_klik", a);
    else if (href.indexOf("mailto:") === 0) track("mail_klik", a);
    else if (href.indexOf("google.com/maps") !== -1 && href.indexOf("reviews") === -1 && a.textContent.toLowerCase().indexOf("review") !== -1) track("reviews_klik", a);
    else if (href.indexOf("!9m1!1b1") !== -1) track("reviews_klik", a);
  }, true);

  /* ---- GA4: interactie met een embedded WodApp-widget (iframe-focus) ---- */
  var wodappFrame = doc.querySelector(".booking-frame iframe");
  if (wodappFrame) {
    // rooster.html gebruikt dezelfde .booking-frame als de proefles-widget, maar is
    // een andere intentie: leden die een les reserveren i.p.v. een proefles boeken.
    // Apart event, anders telt het lesrooster mee als boekingsintentie.
    var frameEvent = doc.querySelector(".booking-frame--agenda iframe")
      ? "rooster_interactie"
      : "widget_interactie";
    var widgetGemeld = false;
    window.addEventListener("blur", function () {
      if (!widgetGemeld && doc.activeElement === wodappFrame) {
        widgetGemeld = true;
        if (typeof window.gtag === "function") {
          window.gtag("event", frameEvent, { page_path: location.pathname });
        }
      }
    });
  }
})();
