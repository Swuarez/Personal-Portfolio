// To add a project: copy one entry, change the fields, save.
// github/demo are optional — leave "" to hide that button.
const projects = [
  {
    title: "STSN Library Website",
    desc: "A website for the school library.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    github: "https://github.com/Swuarez/STSN-Library-Website", // e.g. "https://github.com/Swuarez/stsn-library"
    demo: "https://swuarez.github.io/STSN-Library-Website/",   // e.g. "https://stsn-library.vercel.app"
  },
];

const ghIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const extIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`;

const cardLink = (href, label, icon, cls = "") =>
  href ? `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${icon}${label}</a>` : "";

document.querySelector("#projects .grid").innerHTML = projects
  .map(
    (p, i) => `
    <article class="card" data-aos="fade-up" data-aos-delay="${Math.min(i * 100, 300)}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="links">${cardLink(p.github, "GitHub", ghIcon)}${cardLink(p.demo, "Live Demo", extIcon, "primary")}</div>
    </article>`,
  )
  .join("");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  AOS.init({ duration: 700, easing: "ease-out", once: true, offset: 80 });

  const lenis = new Lenis({ duration: 1.1 });
  lenis.on("scroll", AOS.refresh);
  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());

  // Anchor links go through Lenis so scrolling stays smooth
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(link.getAttribute("href"), { offset: 0 });
    });
  });
}

// Tighten up the navbar once the page is scrolled
const nav = document.querySelector("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 24), { passive: true });

// Highlight the nav link of the section currently in view
const links = document.querySelectorAll("nav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
  });
}, { threshold: 0.5 });
document.querySelectorAll("section").forEach((s) => observer.observe(s));
