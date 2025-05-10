import confetti from 'canvas-confetti';

const gameArea      = document.getElementById('game-area');
const message       = document.getElementById('message');
const BALLOON_COUNT = 10;
let popped          = 0;

// Balloon colors
const COLORS = ['#ff99c8', '#ff4d6d', '#4da6ff'];

// Create balloons
for (let i = 0; i < BALLOON_COUNT; i++) {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.bottom    = '-100px';
  b.style.left      = `${Math.random() * 90}%`;
  b.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  const duration    = 10 + Math.random() * 15;
  b.style.animation = `floatUp ${duration}s linear`;
  b.addEventListener('click', () => popBalloon(b));
  gameArea.appendChild(b);
}

function popBalloon(balloon) {
  balloon.remove();
  if (++popped === BALLOON_COUNT) celebrate();
}

function celebrate() {
  // 1) Hide only the header text (h1), keep the image
  const headerText = document.querySelector('#header h1');
  if (headerText) headerText.style.display = 'none';

  // 2) Show the final message
  message.textContent = 'I love you, Mom!';
  message.style.opacity = 1;

  // 3) Confetti!
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.3 } });

  // 4) Show the 💌 icon
  const icon = document.createElement('div');
  icon.id = 'love-icon';
  icon.textContent = '💌';
  icon.title = 'Click for my message';
  document.body.appendChild(icon);
  setTimeout(() => (icon.style.opacity = 1), 1500);

  // 5) On icon click, reveal note
  icon.addEventListener('click', () => {
    icon.remove();
    const note = document.createElement('p');
    note.id = 'heartfelt';
    note.textContent =
      'Hi mom, I made all this for you!!! I just wanted to say that im super thankful for you and everything you have done for me. Without you I would not be able to have make this for you!! You are the best mom ever, thank you for feeding me and taking care of me and loving me and making sure that I dont wake up not feeling loved ever. I dont have enough words to tell you thank you mom. Thank you for being such a great role modle for me and I hope to become half of who you are someday !! Love - Mauro ';
    document.body.appendChild(note);
  });
}

// Floating heart background
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
