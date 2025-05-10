import confetti from 'canvas-confetti';

const gameArea      = document.getElementById('game-area');
const message       = document.getElementById('message');
const BALLOON_COUNT = 10;
let popped          = 0;

// Color options for balloons
const COLORS = ['#ff99c8', '#ff4d6d', '#4da6ff'];

for (let i = 0; i < BALLOON_COUNT; i++) {
  const b = document.createElement('div');
  b.className = 'balloon';

  // Start below the screen
  b.style.bottom = '-100px';
  // Random horizontal position
  b.style.left   = `${Math.random() * 90}%`;

  // Random color
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  b.style.background = color;

  // Random float-up duration (10–25s)
  const duration = 10 + Math.random() * 15;
  b.style.animation = `floatUp ${duration}s linear`;

  // Pop handler
  b.addEventListener('click', () => popBalloon(b));

  gameArea.appendChild(b);
}

function popBalloon(balloon) {
  balloon.remove();
  popped++;
  if (popped === BALLOON_COUNT) celebrate();
}

function celebrate() {
  // Show “I love you, Mom!”
  message.textContent = 'I love you, Mom!';
  message.style.opacity = 1;

  // Add the “Click the 💌” hint
  const hint = document.createElement('div');
  hint.id = 'hint';
  hint.textContent = 'Click the 💌';
  document.body.appendChild(hint);
  setTimeout(() => (hint.style.opacity = 1), 1200);

  // Launch confetti
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.3 } });

  // Create and center the 💌 icon
  const icon = document.createElement('div');
  icon.id = 'love-icon';
  icon.textContent = '💌';
  icon.title = 'Click for my message';
  document.body.appendChild(icon);
  setTimeout(() => (icon.style.opacity = 1), 1500);

  // On icon click, show the heartfelt note
  icon.addEventListener('click', () => {
    hint.remove();
    icon.remove();

    const note = document.createElement('p');
    note.id = 'heartfelt';
    note.textContent =
      'Hi mom, I made all this for you!!! I just wanted to say that im super thankful for you and everything you have done for me. Without you I would not be able to have make this for you!! You are the best mom ever, thank you for feeding me and taking care of me and loving me and making sure that I dont wake up not feeling loved ever. I dont have enough words to tell you thank you mom. Thank you for being such a great role modle for me and I hope to become half of who you are someday !! Love - Mauro ';
    document.body.appendChild(note);
  });
}

// —— HEART BACKGROUND —— //
function createHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤️';
  // Random start position & size
  h.style.left     = Math.random() * 100 + 'vw';
  h.style.fontSize = 1 + Math.random() * 1 + 'rem';
  document.body.appendChild(h);
  // Clean up after animation
  setTimeout(() => h.remove(), 8000);
}

// Spawn hearts every 400ms
setInterval(createHeart, 400);
