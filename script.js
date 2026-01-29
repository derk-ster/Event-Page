const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const eventDate = new Date("2026-03-21T09:00:00-07:00");
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const pad = (value) => String(value).padStart(2, "0");

const updateCountdown = () => {
  const now = new Date();
  const distance = eventDate - now;

  if (distance <= 0) {
    Object.values(countdownEls).forEach((el) => {
      if (el) el.textContent = "00";
    });
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (countdownEls.days) countdownEls.days.textContent = pad(days);
  if (countdownEls.hours) countdownEls.hours.textContent = pad(hours);
  if (countdownEls.minutes) countdownEls.minutes.textContent = pad(minutes);
  if (countdownEls.seconds) countdownEls.seconds.textContent = pad(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.querySelector(".registration-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector(".submit-btn");
    button.classList.add("submitted");
    button.querySelector("span").textContent = "Registration Sent!";
    setTimeout(() => {
      button.classList.remove("submitted");
      button.querySelector("span").textContent = "Submit Registration";
      form.reset();
    }, 2500);
  });
}

const revealTargets = [
  ...document.querySelectorAll(
    "section .section-heading, .about-card, .speaker-card, .session, .ticket-list div, .registration-form, .carousel-item"
  ),
];

revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--delay", `${Math.min(index * 0.06, 0.6)}s`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((el) => observer.observe(el));

window.addEventListener("load", () => {
  document.body.classList.add("page-ready");
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
