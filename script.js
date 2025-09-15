function showMessage() {
  alert("Hello Sachin! 👋 This is your first website.");
}

// Simple slider
(function () {
  const slider = document.getElementById("slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".dots");

  let currentIndex = 0;
  let autoTimerId = null;
  const AUTO_MS = 4000;

  function renderDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
      if (idx === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    slides[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    renderDots();
    restartAuto();
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  function startAuto() {
    stopAuto();
    autoTimerId = setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    if (autoTimerId) clearInterval(autoTimerId);
  }

  function restartAuto() {
    startAuto();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Init
  slides[0].classList.add("active");
  renderDots();
  startAuto();
})();