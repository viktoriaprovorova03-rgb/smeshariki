// Интерактивные карточки персонажей
document.querySelectorAll(".character-card").forEach((card) => {
  const toggleCard = () => card.classList.toggle("active");

  card.addEventListener("click", toggleCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  });
});

// Кнопка «Поймать сигнал»
const signalButton = document.getElementById("signalButton");
const signalMessage = document.getElementById("signalMessage");

signalButton.addEventListener("click", () => {
  signalMessage.classList.toggle("visible");
  signalButton.innerHTML = signalMessage.classList.contains("visible")
    ? 'Скрыть сигнал <span>↗</span>'
    : 'Поймать сигнал <span>↗</span>';
});

// Просмотр кадров в увеличенном виде
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".frame").forEach((frame) => {
  frame.addEventListener("click", () => {
    lightboxImage.src = frame.querySelector("img").src;
    lightboxImage.alt = frame.querySelector("img").alt;
    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
}

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

// Анимированный звёздный фон
const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  stars = Array.from({ length: Math.min(130, Math.floor(window.innerWidth / 9)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.4 + 0.2,
    speed: Math.random() * 0.25 + 0.05,
    opacity: Math.random() * 0.7 + 0.15
  }));
}

function drawStars() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach((star) => {
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = window.innerHeight;
      star.x = Math.random() * window.innerWidth;
    }

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(218, 207, 255, ${star.opacity})`;
    context.fill();
  });

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", resizeCanvas);
