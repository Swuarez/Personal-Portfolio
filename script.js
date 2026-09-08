// To add a project: copy one entry, change the fields, save.
const projects = [
  {
    title: "Student Grade Tracker",
    desc: "A simple web app that lets classmates log and visualize their grades per subject.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Quiz Kabayan",
    desc: "A timed quiz game covering ICT lessons, built for review sessions before exams.",
    tags: ["JavaScript", "Local Storage"],
  },
  {
    title: "Personal Expense Logger",
    desc: "A Python CLI tool that records daily allowances and breaks down spending by category.",
    tags: ["Python", "CSV"],
  },
];

document.querySelector("#projects .grid").innerHTML = projects
  .map(
    (p, i) => `
    <article class="card" data-aos="fade-up" data-aos-delay="${Math.min(i * 100, 300)}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
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
