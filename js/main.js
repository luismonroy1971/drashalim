/* ===================================================================
   Main interactions: theme, language, reveal, counters, nav, form
   =================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const store = {
    get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };

  /* -------- Theme -------- */
  const themeToggle = document.getElementById("themeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = store.get("sv-theme", prefersDark ? "dark" : "light");
  applyTheme(theme);

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", t === "dark" ? "#061417" : "#0e9ca8");
  }
  themeToggle?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    store.set("sv-theme", theme);
  });

  /* -------- Language -------- */
  const langToggle = document.getElementById("langToggle");
  let lang = store.get("sv-lang", (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es");
  applyLang(lang);

  function applyLang(l) {
    const dict = window.I18N[l] || window.I18N.es;
    root.setAttribute("lang", l);
    langToggle?.setAttribute("data-active", l);
    langToggle?.querySelectorAll("[data-lang-opt]").forEach(o =>
      o.classList.toggle("on", o.dataset.langOpt === l));

    // text content
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      let val = dict[key];
      if (val == null) return;
      if (key === "footer.rights") val = val.replace("{year}", new Date().getFullYear());
      el.innerHTML = val;
    });
    // placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const val = dict[el.getAttribute("data-i18n-ph")];
      if (val != null) el.setAttribute("placeholder", val);
    });
    // meta description
    const md = dict["meta.description"];
    if (md) document.querySelector('meta[name="description"]')?.setAttribute("content", md);
  }
  langToggle?.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    applyLang(lang);
    store.set("sv-lang", lang);
  });

  /* -------- Year -------- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* -------- Navbar scroll state + progress -------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 20);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu -------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  function closeMenu() {
    hamburger?.classList.remove("open");
    navLinks?.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  }
  hamburger?.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    navLinks?.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  /* -------- Reveal on scroll -------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* -------- Animated counters -------- */
  const counters = document.querySelectorAll(".count");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const dur = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cio.observe(c));

  /* -------- Active nav link on scroll (scrollspy) -------- */
  const sections = [...document.querySelectorAll("main section[id]")];
  const linkMap = new Map();
  document.querySelectorAll('.nav__links a').forEach(a => {
    const id = a.getAttribute("href")?.slice(1);
    if (id) linkMap.set(id, a);
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        linkMap.forEach(a => a.classList.remove("active"));
        linkMap.get(e.target.id)?.classList.add("active");
      }
    });
  }, { threshold: 0.4, rootMargin: "-40% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* -------- Parallax on hero visual -------- */
  const heroCard = document.querySelector(".hero__card");
  if (heroCard && window.matchMedia("(pointer:fine)").matches) {
    const wrap = heroCard.parentElement;
    wrap.addEventListener("mousemove", (ev) => {
      const r = wrap.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      heroCard.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    });
    wrap.addEventListener("mouseleave", () => { heroCard.style.transform = ""; });
    heroCard.style.transition = "transform .4s var(--ease)";
    wrap.style.perspective = "900px";
  }

  /* -------- Lead form -> WhatsApp -------- */
  const form = document.getElementById("leadForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    if (!name || !phone) {
      form.reportValidity?.();
      return;
    }
    const isEn = lang === "en";
    const lines = isEn
      ? [`Hello Dr. Shalim Viza, I'd like to book an appointment.`, ``,
         `Name: ${name}`, `Phone: ${phone}`, `Service: ${service}`,
         message ? `Message: ${message}` : ""]
      : [`Hola Dra. Shalim Viza, quisiera reservar una cita.`, ``,
         `Nombre: ${name}`, `Teléfono: ${phone}`, `Servicio: ${service}`,
         message ? `Mensaje: ${message}` : ""];
    const text = encodeURIComponent(lines.filter(Boolean).join("\n"));
    window.open(`https://wa.me/51912298087?text=${text}`, "_blank", "noopener");
  });
})();
