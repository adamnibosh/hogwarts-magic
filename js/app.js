(function () {
  'use strict';

  // Personalize names from config
  document.querySelectorAll('.her-name').forEach(el => el.textContent = CONFIG.herName);
  document.querySelectorAll('.sender-name').forEach(el => el.textContent = CONFIG.yourName);

  // --- Candles ---
  const candlesEl = document.getElementById('candles');
  for (let i = 0; i < 18; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.left = Math.random() * 100 + '%';
    c.style.animationDuration = (8 + Math.random() * 12) + 's';
    c.style.animationDelay = Math.random() * 10 + 's';
    candlesEl.appendChild(c);
  }

  // --- Wand trail ---
  const trail = document.getElementById('wand-trail');
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 40) return;
    lastTrail = now;
    const p = document.createElement('div');
    p.className = 'wand-particle';
    p.style.left = e.clientX + 'px';
    p.style.top = e.clientY + 'px';
    trail.appendChild(p);
    setTimeout(() => p.remove(), 800);
  });

  // --- Sparkles on click ---
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = (e.clientX + (Math.random() - 0.5) * 30) + 'px';
      s.style.top = (e.clientY + (Math.random() - 0.5) * 30) + 'px';
      document.getElementById('sparkles').appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
  });

  // --- Intro: Letter ---
  const envelope = document.getElementById('envelope');
  const enterBtn = document.getElementById('enter-btn');
  const tapHint = document.getElementById('tap-hint');
  let letterOpen = false;

  function openLetter() {
    if (letterOpen) return;
    letterOpen = true;
    envelope.classList.add('open');
    tapHint.textContent = 'Your invitation awaits...';
    setTimeout(() => {
      enterBtn.classList.remove('hidden');
      tapHint.classList.add('hidden');
    }, 1500);
  }

  envelope.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
  });

  enterBtn.addEventListener('click', () => {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('intro').style.display = 'none';
    document.getElementById('castle').classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  // --- Navigation ---
  const navBtns = document.querySelectorAll('.nav-btn');
  const panels = document.querySelectorAll('.panel');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(section).classList.add('active');
      if (section === 'patronus') initPatronusCanvas();
    });
  });

  // --- Sorting Hat Quiz ---
  const questions = [
    {
      text: "A troll blocks your path in the dungeon corridor. You...",
      answers: [
        { text: "Charge forward — someone's in danger!", house: 'gryffindor' },
        { text: "Look for a clever way around it", house: 'ravenclaw' },
        { text: "Stay and help anyone who might be trapped", house: 'hufflepuff' },
        { text: "Find out who let it loose and why", house: 'slytherin' },
      ],
    },
    {
      text: "You find a mysterious book in the library. You...",
      answers: [
        { text: "Read every page immediately", house: 'ravenclaw' },
        { text: "Share it with your closest friends", house: 'hufflepuff' },
        { text: "Test if any spells actually work", house: 'gryffindor' },
        { text: "Keep it secret — knowledge is power", house: 'slytherin' },
      ],
    },
    {
      text: "Your friend is upset after a bad day. You...",
      answers: [
        { text: "Sit with them until they feel better", house: 'hufflepuff' },
        { text: "Make them laugh — humor heals everything", house: 'gryffindor' },
        { text: "Help them figure out what went wrong", house: 'ravenclaw' },
        { text: "Take care of whatever caused the problem", house: 'slytherin' },
      ],
    },
    {
      text: "Which magical object would you choose?",
      answers: [
        { text: "The Invisibility Cloak", house: 'gryffindor' },
        { text: "The Time-Turner", house: 'ravenclaw' },
        { text: "A Portkey to your loved ones", house: 'hufflepuff' },
        { text: "The Elder Wand", house: 'slytherin' },
      ],
    },
    {
      text: "What matters most to you?",
      answers: [
        { text: "Standing up for what's right", house: 'gryffindor' },
        { text: "Understanding the world deeply", house: 'ravenclaw' },
        { text: "Being there for the people you love", house: 'hufflepuff' },
        { text: "Achieving greatness on your own terms", house: 'slytherin' },
      ],
    },
  ];

  const houseData = {
    gryffindor: {
      name: 'Gryffindor',
      emoji: '🦁',
      color: '#740001',
      desc: 'Bold, passionate, and fiercely loyal — you charge into life with courage that inspires everyone around you.',
      love: 'A Gryffindor heart loves bravely. And someone loves your brave heart very much.',
    },
    hufflepuff: {
      name: 'Hufflepuff',
      emoji: '🦡',
      color: '#ecb939',
      desc: 'Warm, devoted, and endlessly kind — you are the person everyone wants on their team, in their corner, in their life.',
      love: 'Hufflepuffs love with quiet, unwavering devotion. You are deeply, steadily loved.',
    },
    ravenclaw: {
      name: 'Ravenclaw',
      emoji: '🦅',
      color: '#0e1a40',
      desc: 'Curious, witty, and wonderfully unique — your mind is a library of wonders, and your perspective lights up every room.',
      love: 'A Ravenclaw love is thoughtful and true. Someone finds your mind absolutely enchanting.',
    },
    slytherin: {
      name: 'Slytherin',
      emoji: '🐍',
      color: '#1a472a',
      desc: 'Ambitious, resourceful, and magnetic — you know what you want and you make things happen. That\'s powerful.',
      love: 'Slytherins love with intensity and intention. You are chosen — deliberately, completely.',
    },
  };

  let currentQ = 0;
  const scores = { gryffindor: 0, hufflepuff: 0, ravenclaw: 0, slytherin: 0 };

  const qNumber = document.getElementById('q-number');
  const qText = document.getElementById('q-text');
  const answersEl = document.getElementById('answers');
  const questionBox = document.getElementById('question-box');
  const sortingResult = document.getElementById('sorting-result');

  function showQuestion() {
    questionBox.classList.remove('hidden');
    sortingResult.classList.add('hidden');
    const q = questions[currentQ];
    qNumber.textContent = `Question ${currentQ + 1} of ${questions.length}`;
    qText.textContent = q.text;
    answersEl.innerHTML = '';
    q.answers.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = a.text;
      btn.addEventListener('click', () => {
        scores[a.house]++;
        currentQ++;
        if (currentQ < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      });
      answersEl.appendChild(btn);
    });
  }

  function showResult() {
    questionBox.classList.add('hidden');
    sortingResult.classList.remove('hidden');

    let winner = CONFIG.defaultHouse || 'gryffindor';
    let max = 0;
    for (const [house, score] of Object.entries(scores)) {
      if (score > max) { max = score; winner = house; }
    }

    const data = houseData[winner];
    const banner = document.getElementById('result-banner');
    banner.textContent = data.emoji;
    banner.style.background = `radial-gradient(circle, ${data.color}88, ${data.color}33)`;
    banner.style.border = `3px solid ${data.color}`;
    document.getElementById('result-house').textContent = data.name + '!';
    document.getElementById('result-desc').textContent = data.desc;
    document.getElementById('result-love').textContent = data.love;
  }

  document.getElementById('retry-quiz').addEventListener('click', () => {
    currentQ = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);
    showQuestion();
  });

  showQuestion();

  // --- Marauder's Map ---
  const mapPhrase = document.getElementById('map-phrase');
  const mapReveal = document.getElementById('map-reveal');
  const mapParchment = document.getElementById('map-parchment');
  const mapMessage = document.getElementById('map-message');
  const mapClose = document.getElementById('map-close');

  const correctPhrase = 'i solemnly swear that i am up to no good';

  function revealMap() {
    const val = mapPhrase.value.trim().toLowerCase();
    if (val === correctPhrase || val.includes('solemnly swear')) {
      mapParchment.classList.remove('hidden');
      mapClose.classList.remove('hidden');
      mapReveal.textContent = 'Revealed!';
    } else {
      mapMessage.textContent = 'The map remains blank... try the classic phrase.';
      mapMessage.style.color = '#740001';
      mapParchment.classList.remove('hidden');
      setTimeout(() => mapParchment.classList.add('hidden'), 2000);
    }
  }

  mapReveal.addEventListener('click', revealMap);
  mapPhrase.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') revealMap();
  });

  document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('click', () => {
      mapMessage.textContent = point.dataset.msg;
      mapMessage.style.color = '#2c1810';
    });
  });

  mapClose.addEventListener('click', () => {
    mapParchment.classList.add('hidden');
    mapClose.classList.add('hidden');
    mapMessage.textContent = '';
    mapPhrase.value = '';
    mapReveal.textContent = 'Reveal';
  });

  // --- Patronus Canvas ---
  let patronusAnim = null;

  function initPatronusCanvas() {
    const canvas = document.getElementById('patronus-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let particles = [];
    let running = false;

    document.getElementById('cast-patronus').onclick = () => {
      if (running) return;
      running = true;
      document.getElementById('patronus-message').classList.remove('hidden');
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: rect.width / 2,
          y: rect.height / 2,
          angle: (Math.PI * 2 * i) / 120,
          speed: 1 + Math.random() * 2,
          life: 1,
          size: 2 + Math.random() * 3,
        });
      }

      function draw() {
        ctx.clearRect(0, 0, rect.width, rect.height);
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        // Silvery mist
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
        grad.addColorStop(0, 'rgba(200, 220, 255, 0.15)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Stag-like patronus shape
        ctx.save();
        ctx.translate(cx, cy);
        ctx.globalAlpha = 0.6 + Math.sin(Date.now() / 500) * 0.2;
        ctx.strokeStyle = 'rgba(200, 230, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Body
        ctx.moveTo(-60, 20);
        ctx.quadraticCurveTo(-30, -40, 0, -60);
        ctx.quadraticCurveTo(30, -40, 60, 20);
        ctx.quadraticCurveTo(40, 40, 0, 50);
        ctx.quadraticCurveTo(-40, 40, -60, 20);
        // Antlers
        ctx.moveTo(0, -60);
        ctx.lineTo(-20, -100);
        ctx.moveTo(0, -60);
        ctx.lineTo(20, -100);
        ctx.moveTo(-20, -100);
        ctx.lineTo(-35, -90);
        ctx.moveTo(20, -100);
        ctx.lineTo(35, -90);
        ctx.stroke();
        ctx.restore();

        let alive = 0;
        particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.life -= 0.008;
          if (p.life > 0) {
            alive++;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 230, 255, ${p.life * 0.8})`;
            ctx.fill();
          }
        });

        if (alive > 0) {
          patronusAnim = requestAnimationFrame(draw);
        } else {
          running = false;
        }
      }

      if (patronusAnim) cancelAnimationFrame(patronusAnim);
      draw();
    };
  }

  // --- Pensieve ---
  document.querySelectorAll('.orb').forEach(orb => {
    orb.addEventListener('click', () => {
      const display = document.getElementById('memory-display');
      const text = document.getElementById('memory-text');
      text.textContent = orb.dataset.memory;
      display.classList.remove('hidden');
      display.style.animation = 'none';
      display.offsetHeight;
      display.style.animation = 'memory-swirl 0.8s ease';
    });
  });

  // --- Golden Snitch ---
  const snitch = document.getElementById('snitch');
  const snitchReward = document.getElementById('snitch-reward');

  function catchSnitch() {
    snitch.classList.add('caught');
    setTimeout(() => {
      snitch.style.display = 'none';
      snitchReward.classList.remove('hidden');
    }, 500);
  }

  snitch.addEventListener('click', catchSnitch);
  snitch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); catchSnitch(); }
  });

})();