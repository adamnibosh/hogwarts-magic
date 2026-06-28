(function () {
  'use strict';

  const houses = {
    gryffindor: { name: 'Gryffindor', emoji: '🦁' },
    hufflepuff: { name: 'Hufflepuff', emoji: '🦡' },
    ravenclaw: { name: 'Ravenclaw', emoji: '🦅' },
    slytherin: { name: 'Slytherin', emoji: '🐍' },
  };

  // Apply names everywhere
  document.querySelectorAll('.her-name').forEach(el => el.textContent = CONFIG.herName);
  document.querySelectorAll('.sender-name').forEach(el => el.textContent = CONFIG.yourName);

  // Replace placeholders in text
  function personalize(text) {
    return text
      .replace(/\[Her Name\]/g, CONFIG.herName)
      .replace(/\[Your Name\]/g, CONFIG.yourName);
  }

  // --- Act switching ---
  const acts = document.querySelectorAll('.act');
  let currentAct = 0;

  function showAct(id) {
    acts.forEach(a => a.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
    if (id === 'act-always') startConstellation();
  }

  // --- Opening sequence ---
  const lines = document.querySelectorAll('#opening-lines .line');
  const btnBegin = document.getElementById('btn-begin');

  lines.forEach(line => {
    const delay = parseInt(line.dataset.delay, 10);
    setTimeout(() => line.classList.remove('hidden'), delay);
  });

  setTimeout(() => btnBegin.classList.remove('hidden'), 12000);

  btnBegin.addEventListener('click', () => showAct('act-book'));

  // --- Book chapters ---
  let chapterIndex = 0;
  const bookPage = document.getElementById('book-page');
  const pageChapter = document.getElementById('page-chapter');
  const pageTitle = document.getElementById('page-title');
  const pageBody = document.getElementById('page-body');
  const chapterIndicator = document.getElementById('chapter-indicator');
  const progressFill = document.getElementById('progress-fill');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  function renderChapter(idx) {
    const ch = CONFIG.chapters[idx];
    bookPage.classList.add('turning');
    setTimeout(() => {
      pageChapter.textContent = ch.title;
      pageTitle.textContent = ch.subtitle;
      pageBody.innerHTML = ch.body.map(p => `<p>${personalize(p)}</p>`).join('');
      chapterIndicator.textContent = `Chapter ${idx + 1} of ${CONFIG.chapters.length}`;
      progressFill.style.width = ((idx + 1) / CONFIG.chapters.length * 100) + '%';
      btnPrev.disabled = idx === 0;
      btnNext.textContent = idx === CONFIG.chapters.length - 1 ? 'Finish the book →' : 'Next →';
      bookPage.classList.remove('turning');
    }, 300);
  }

  function nextChapter() {
    if (chapterIndex < CONFIG.chapters.length - 1) {
      chapterIndex++;
      renderChapter(chapterIndex);
    } else {
      showAct('act-prophet');
    }
  }

  function prevChapter() {
    if (chapterIndex > 0) {
      chapterIndex--;
      renderChapter(chapterIndex);
    }
  }

  btnNext.addEventListener('click', nextChapter);
  btnPrev.addEventListener('click', prevChapter);
  bookPage.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    nextChapter();
  });

  renderChapter(0);

  // --- Daily Prophet ---
  function buildProphet() {
    document.getElementById('prophet-date').textContent = CONFIG.prophet.date;
    const headlinesEl = document.getElementById('prophet-headlines');
    headlinesEl.innerHTML = CONFIG.prophet.headlines.map(h => {
      const cls = h.size === 'big' ? 'headline-big' : h.size === 'medium' ? 'headline-medium' : 'headline-small';
      return `<p class="${cls}">${personalize(h.text)}</p>`;
    }).join('');
    document.getElementById('prophet-article').textContent = personalize(CONFIG.prophet.article);
  }

  buildProphet();
  document.getElementById('btn-after-prophet').addEventListener('click', () => showAct('act-photos'));

  // --- Living photos ---
  function buildPhotos() {
    const wall = document.getElementById('photo-wall');
    const rotations = [-3, 2, -1];
    wall.innerHTML = CONFIG.photos.map((photo, i) => {
      const inner = photo.src
        ? `<img src="${photo.src}" alt="${photo.caption}" loading="lazy">`
        : `<div class="frame-placeholder">✦</div>`;
      return `
        <div class="living-frame" style="--rot: ${rotations[i % rotations.length]}deg">
          <div class="frame-border">
            <div class="frame-inner">${inner}</div>
          </div>
          <p class="frame-caption">${personalize(photo.caption)}</p>
        </div>`;
    }).join('');
  }

  buildPhotos();
  document.getElementById('btn-after-photos').addEventListener('click', () => showAct('act-wand'));

  // --- Wand heart drawing ---
  const canvas = document.getElementById('wand-canvas');
  const ctx = canvas.getContext('2d');
  const wandStatus = document.getElementById('wand-status');
  const secretReveal = document.getElementById('secret-reveal');
  const btnAfterWand = document.getElementById('btn-after-wand');
  let drawing = false;
  let points = [];
  let unlocked = false;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    redraw();
  }

  function redraw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (points.length < 2) return;
    ctx.strokeStyle = '#740001';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(201, 162, 39, 0.5)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function startDraw(e) {
    if (unlocked) return;
    e.preventDefault();
    drawing = true;
    points = [getPos(e)];
    spawnParticles(getPos(e));
  }

  function moveDraw(e) {
    if (!drawing || unlocked) return;
    e.preventDefault();
    const pos = getPos(e);
    points.push(pos);
    redraw();
    if (Math.random() > 0.7) spawnParticles(pos);
  }

  function endDraw() {
    if (!drawing || unlocked) return;
    drawing = false;
    checkHeart();
  }

  function checkHeart() {
    if (points.length < 30) return;
    const rect = canvas.getBoundingClientRect();
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);
    const ratio = width / height;

    // Generous heart detection: enough points, reasonable aspect ratio, drawn in upper-mid area
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const inZone = cy < rect.height * 0.75 && width > 60 && height > 50;

    if (points.length > 50 && ratio > 0.6 && ratio < 1.8 && inZone) {
      unlockSecret();
    }
  }

  function unlockSecret() {
    unlocked = true;
    wandStatus.textContent = '✨ Your magic is real.';
    document.getElementById('secret-text').textContent = personalize(CONFIG.secretMessage);
    secretReveal.classList.remove('hidden');
    btnAfterWand.classList.remove('hidden');
    burstParticles();
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', moveDraw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', moveDraw, { passive: false });
  canvas.addEventListener('touchend', endDraw);

  document.getElementById('btn-clear-wand').addEventListener('click', () => {
    if (unlocked) return;
    points = [];
    redraw();
    wandStatus.textContent = 'Draw with your finger or mouse...';
  });

  btnAfterWand.addEventListener('click', () => showAct('act-ticket'));
  resizeCanvas();
  window.addEventListener('resize', () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    resizeCanvas();
  });

  // --- Ticket ---
  function buildTicket() {
    const house = houses[CONFIG.herHouse] || houses.gryffindor;
    document.getElementById('ticket-name').textContent = CONFIG.herName;
    document.getElementById('ticket-dest').textContent = CONFIG.ticket.destination;
    document.getElementById('ticket-date').textContent = CONFIG.ticket.date;
    document.getElementById('ticket-platform').textContent = CONFIG.ticket.platform;
    document.getElementById('ticket-house').textContent = `${house.emoji} House: ${house.name}`;
    document.getElementById('ticket-note').textContent = CONFIG.ticket.note;
  }

  buildTicket();
  document.getElementById('btn-finale').addEventListener('click', () => showAct('act-always'));

  // --- Constellation finale ---
  let constellationAnim = null;

  function startConstellation() {
    const cvs = document.getElementById('constellation');
    const c = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    cvs.width = window.innerWidth * dpr;
    cvs.height = window.innerHeight * dpr;
    c.scale(dpr, dpr);
    const w = window.innerWidth;
    const h = window.innerHeight;

    const heartStars = [];
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      heartStars.push({
        tx: w/2 + hx * 8,
        ty: h/2 + hy * 8 - 20,
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 0.02 + Math.random() * 0.03,
      });
    }

    const bgStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random(),
    }));

    let frame = 0;
    function draw() {
      c.clearRect(0, 0, w, h);
      bgStars.forEach(s => {
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${s.a * 0.5 + Math.sin(frame * 0.02 + s.x) * 0.2})`;
        c.fill();
      });

      const formed = [];
      heartStars.forEach(s => {
        s.x += (s.tx - s.x) * s.speed;
        s.y += (s.ty - s.y) * s.speed;
        if (Math.abs(s.x - s.tx) < 5) formed.push(s);
        c.beginPath();
        c.arc(s.x, s.y, 2, 0, Math.PI * 2);
        c.fillStyle = 'rgba(240, 215, 140, 0.9)';
        c.fill();
      });

      if (formed.length > 40) {
        c.strokeStyle = 'rgba(240, 215, 140, 0.15)';
        c.lineWidth = 1;
        for (let i = 0; i < heartStars.length - 1; i++) {
          c.beginPath();
          c.moveTo(heartStars[i].x, heartStars[i].y);
          c.lineTo(heartStars[i+1].x, heartStars[i+1].y);
          c.stroke();
        }
      }

      frame++;
      constellationAnim = requestAnimationFrame(draw);
    }

    if (constellationAnim) cancelAnimationFrame(constellationAnim);
    draw();
  }

  document.getElementById('btn-replay').addEventListener('click', () => {
    chapterIndex = 0;
    unlocked = false;
    points = [];
    secretReveal.classList.add('hidden');
    btnAfterWand.classList.add('hidden');
    wandStatus.textContent = 'Draw with your finger or mouse...';
    renderChapter(0);
    showAct('act-opening');
    btnBegin.classList.remove('hidden');
  });

  // --- Particles ---
  function spawnParticles(pos) {
    const rect = canvas ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
    for (let i = 0; i < 3; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (rect.left + pos.x + (Math.random() - 0.5) * 20) + 'px';
      p.style.top = (rect.top + pos.y + (Math.random() - 0.5) * 20) + 'px';
      document.getElementById('particles').appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }

  function burstParticles() {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random() * window.innerWidth) + 'px';
        p.style.top = (Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2) + 'px';
        p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
        document.getElementById('particles').appendChild(p);
        setTimeout(() => p.remove(), 2000);
      }, i * 50);
    }
  }

})();