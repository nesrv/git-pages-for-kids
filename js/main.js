(function () {
  const slides = Array.from(document.querySelectorAll(".slide[data-slide]"));
  const dots = Array.from(document.querySelectorAll(".nav-dot"));
  const currentEl = document.getElementById("current");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const restartBtn = document.getElementById("restart");
  const total = slides.length;

  let activeIndex = 0;

  function scrollToSlide(index) {
    const i = Math.max(0, Math.min(index, total - 1));
    activeIndex = i;
    slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
    updateUI();
  }

  function updateUI() {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
    if (currentEl) currentEl.textContent = String(activeIndex + 1);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const n = Number(dot.dataset.slide);
      if (!Number.isNaN(n)) scrollToSlide(n);
    });
  });

  prevBtn?.addEventListener("click", () => scrollToSlide(activeIndex - 1));
  nextBtn?.addEventListener("click", () => scrollToSlide(activeIndex + 1));

  restartBtn?.addEventListener("click", () => scrollToSlide(0));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      scrollToSlide(activeIndex + 1);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      scrollToSlide(activeIndex - 1);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const slide = entry.target;
        const idx = Number(slide.dataset.slide);
        if (!Number.isNaN(idx)) {
          activeIndex = idx;
          updateUI();
        }
      });
    },
    { threshold: 0.45 }
  );

  slides.forEach((slide) => slideObserver.observe(slide));

  updateUI();
})();
