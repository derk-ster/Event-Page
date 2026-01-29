const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

class Carousel {
  constructor(root, interval = 5000) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.slides = Array.from(root.querySelectorAll(".carousel-slide"));
    this.prevBtn = root.querySelector(".carousel-btn.prev");
    this.nextBtn = root.querySelector(".carousel-btn.next");
    this.dotsContainer = root.querySelector(".carousel-dots");
    this.index = 0;
    this.interval = interval;
    this.timer = null;
    this.setupDots();
    this.update();
    this.attachEvents();
    this.start();
  }

  setupDots() {
    this.dotsContainer.innerHTML = "";
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        this.index = i;
        this.update();
        this.restart();
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  attachEvents() {
    this.prevBtn?.addEventListener("click", () => {
      this.index = (this.index - 1 + this.slides.length) % this.slides.length;
      this.update();
      this.restart();
    });

    this.nextBtn?.addEventListener("click", () => {
      this.index = (this.index + 1) % this.slides.length;
      this.update();
      this.restart();
    });

    this.root.addEventListener("mouseenter", () => this.stop());
    this.root.addEventListener("mouseleave", () => this.start());
  }

  update() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === this.index);
    });
    Array.from(this.dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });
  }

  start() {
    this.stop();
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.slides.length;
      this.update();
    }, this.interval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  restart() {
    this.stop();
    this.start();
  }
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const isTestimonial = carousel.dataset.carousel === "testimonials";
  const interval = isTestimonial ? 6500 : 5500;
  new Carousel(carousel, interval);
});

const signupForm = document.querySelector(".signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = signupForm.querySelector("input");
    if (input) {
      input.value = "";
      input.placeholder = "Thanks! We'll be in touch.";
    }
  });
}
