import confetti from 'canvas-confetti';

const gameArea      = document.getElementById('game-area');
const message       = document.getElementById('message');
const BALLOON_COUNT = 10;
let popped          = 0;

// Balloon color options
const COLORS = ['#ff99c8', '#ff4d6d', '#4da6ff'];

// Create and animate balloons
for (let i = 0; i < BALLOON_COUNT; i++) {
  const b = document.createElement('div');
  b.className = 'balloon';

  // start off-screen below
  b.style.bottom    = '-100px';
  b.style.left      = `${Math.random() * 90}%`;

  // random color & float duration
  b.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  const duration     = 10 + Math.random() * 15; // 10–25s
  b.style.animation  = `floatUp ${duration}s linear`;

  b.addEventListener('click', () => popBalloon(b));
  gameArea.appendChild(b);
}

function popBalloon(balloon) {
  balloon.remove();
  if (++popped === BALLOON_COUNT) {
    celebrate();
  }
}

function celebrate() {
  // 1) Hide the original header text, keep the image
  const headerText = document.querySelector('#header h1');
  if (headerText) headerText.style.display = 'none';

  // 2) Measure header's bottom to position the message
  const header     = document.getElementById('header');
  const headerRect = header.getBoundingClientRect();

  // 3) Position and show the “I love you, Mom!” message
  message.style.position  = 'absolute';
  message.style.top       = `${headerRect.bottom + 20}px`;
  message.style.left      = '50%';
  message.style.transform = 'translateX(-50%)';
  message.textContent     = 'I love you, Mom!';
  message.style.opacity   = 1;

  // 4) Trigger confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.3 },
  });

  // 5) Create and show the 💌 icon
  const icon = document.createElement('div');
  icon.id       = 'love-icon';
  icon.textContent = '💌';
  icon.title    = 'Click for my message';
  document.body.appendChild(icon);
  setTimeout(() => {
    icon.style.opacity = 1;
  }, 1500);

  // 6) When icon clicked, reveal your heartfelt note
  icon.addEventListener('click', () => {
    icon.remove();
    const note = document.createElement('p');
    note.id          = 'heartfelt';
    note.textContent =
      'Hi Mom, I made all this for you!!! I just wanted to say that I’m super thankful for you and everything you have done for me. Without you I would not be able to make this. You are the best mom ever—thank you for feeding me, taking care of me, loving me, and making sure I always feel loved. I don’t have enough words to tell you how much I appreciate you. Thank you for being such a great role model. Love, Mauro 💖';
    document.body.appendChild(note);
  });
}

// —— Floating heart background —— //
function createHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤️';
  h.style.bottom   = '-20px';
  h.style.left     = `${Math.random() * 100}vw`;
  h.style.fontSize = `${1 + Math.random()}rem`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}
setInterval(createHeart, 400);
