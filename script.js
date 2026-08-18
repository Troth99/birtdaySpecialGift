// Дата от която броим "дни заедно" - редактирай при нужда
const relationshipStartDate = new Date("2025-11-30");

const screens = document.querySelectorAll(".screen");
const startBtn = document.getElementById("startBtn");
const toFinalBtn = document.getElementById("toFinalBtn");
const daysCounter = document.getElementById("daysCounter");
const galleryBox = document.getElementById("galleryBox");

// Сложи снимките си в папка "images" и добави имената им тук
const memoryPhotos = [
  "images/memory1.jpg",
  "images/memory2.jpg",
  "images/memory3.jpg",
];

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");

  if (screenId === "memoriesScreen") {
    renderGallery();
  }
}

function renderGallery() {
  if (galleryBox.childElementCount > 0) return;

  memoryPhotos.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Спомен";
    galleryBox.appendChild(img);
  });
}

startBtn.addEventListener("click", () => {
  showScreen("question1Screen");
});

toFinalBtn.addEventListener("click", () => {
  showDaysCounter();
  showScreen("finalScreen");
  launchCelebration();
});

function showDaysCounter() {
  const today = new Date();
  const msInDay = 1000 * 60 * 60 * 24;
  const daysTogether = Math.floor((today - relationshipStartDate) / msInDay);
  daysCounter.textContent = `💕 Your idiot for ${daysTogether} days 💕`;
}

const balloonsContainer = document.getElementById("balloonsContainer");
const balloonColors = ["#ff6fa8", "#ffd7a8", "#ff4b7d", "#8e2a6b", "#ffe66d", "#7ee8fa"];
const confettiColors = ["#ff6fa8", "#ffd7a8", "#ffe66d", "#7ee8fa", "#ffffff"];

function launchCelebration() {
  const balloonCount = 14;

  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => createBalloon(), i * 200);
  }
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  const left = Math.random() * 90 + 2;
  const sway = Math.random() * 160 - 80;
  const duration = Math.random() * 2 + 4.5;
  const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

  balloon.style.left = `${left}vw`;
  balloon.style.background = color;
  balloon.style.setProperty("--sway", `${sway}px`);
  balloon.style.animationDuration = `${duration}s`;

  balloon.addEventListener("animationend", () => {
    createConfettiBurst(left, sway);
    balloon.remove();
  });

  balloonsContainer.appendChild(balloon);
}

function createConfettiBurst(leftVw, sway) {
  const pieceCount = 14;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    const dx = Math.random() * 200 - 100;
    const dy = Math.random() * 120 + 40;
    const rot = Math.random() * 360 + 180;
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

    piece.style.left = `calc(${leftVw}vw + ${sway}px)`;
    piece.style.top = "2vh";
    piece.style.background = color;
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.setProperty("--dx", `${dx}px`);
    piece.style.setProperty("--dy", `${dy}px`);
    piece.style.setProperty("--rot", `${rot}deg`);
    piece.style.animationDuration = "1.2s";

    balloonsContainer.appendChild(piece);

    setTimeout(() => piece.remove(), 1300);
  }
}

const quizQuestions = [
  { screenId: "question1Screen", correctIndex: 0, nextScreenId: "question2Screen" },
  { screenId: "question2Screen", correctIndex: 2, nextScreenId: "question3Screen" },
  { screenId: "question3Screen", correctIndex: 1, nextScreenId: "memoriesScreen" },
];

quizQuestions.forEach((q) => {
  const questionScreen = document.getElementById(q.screenId);
  const answerButtons = questionScreen.querySelectorAll(".answer-btn");
  const feedback = questionScreen.querySelector(".feedback");

  answerButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      answerButtons.forEach((b) => (b.disabled = true));

      if (index === q.correctIndex) {
        btn.classList.add("correct");
        feedback.textContent = "Good job! 🎉";
      } else {
        btn.classList.add("wrong");
        answerButtons[q.correctIndex].classList.add("correct");
        feedback.textContent = "Ops. not the right asnwer, but you are still my beauty! 💕";
      }

      setTimeout(() => {
        showScreen(q.nextScreenId);
      }, 1400);
    });
  });
});
