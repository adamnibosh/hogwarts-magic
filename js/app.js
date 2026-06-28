(function () {
  'use strict';

  const houses = {
    gryffindor: { name: 'Gryffindor', emoji: '🦁' },
    hufflepuff: { name: 'Hufflepuff', emoji: '🦡' },
    ravenclaw: { name: 'Ravenclaw', emoji: '🦅' },
    slytherin: { name: 'Slytherin', emoji: '🐍' },
  };

  const vialColors = ['#9b59b6', '#3498db', '#e74c8c', '#2ecc71'];

  document.querySelectorAll('.her-name').forEach(el => el.textContent = CONFIG.herName);
  document.querySelectorAll('.sender-name').forEach(el => el.textContent = CONFIG.yourName);

  function personalize(text) {
    return text
      .replace(/\[Her Name\]/g, CONFIG.herName)
      .replace(/\[Your Name\]/g, CONFIG.yourName);
  }

  // ═══ GLOBAL EFFECTS ═══
  function initCandles() {
    const el = document.getElementById('candles');
    for (let i = 0; i < 14; i++) {
      const c = document.createElement('div');
      c.className = 'candle';
      c.style.left = Math.random() * 100 + '%';
      c.style.animationDuration = (10 + Math.random() * 14) + 's';
      c.style.animationDelay = Math.random() * 12 + 's';
      el.appendChild(c);
    }
  }

  const trail = document.getElementById('wand-trail');
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 35) return;
    lastTrail = now;
    const d = document.createElement('div');
    d.className = 'wand-dot';
    d.style.left = e.clientX + 'px';
    d.style.top = e.clientY + 'px';
    trail.appendChild(d);
    setTimeout(() => d.remove(), 700);
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .vial, .frog-card, .howler, .mirror-frame, .flying-snitch, .floating-snitch')) return;
    for (let i = 0; i < 6; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
      s.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
      document.getElementById('particles').appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  });

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3200);
  }

  function burstParticles(count = 25) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random() * window.innerWidth) + 'px';
        p.style.top = (Math.random() * window.innerHeight * 0.7) + 'px';
        p.style.width = p.style.height = (2 + Math.random() * 5) + 'px';
        document.getElementById('particles').appendChild(p);
        setTimeout(() => p.remove(), 2000);
      }, i * 40);
    }
  }

  function dropPetals(n = 20) {
    const el = document.getElementById('petals');
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-10px';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.opacity = 0.5 + Math.random() * 0.5;
        el.appendChild(p);
        setTimeout(() => p.remove(), 9000);
      }, i * 120);
    }
  }

  initCandles();

  // ═══ ACT SWITCHING ═══
  function showAct(id) {
    document.querySelectorAll('.act').forEach(a => a.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
    if (id === 'act-book') startBookSnitches();
    if (id === 'act-always') { startConstellation(); dropPetals(15); }
    if (id === 'act-snitch') startSnitchGame();
  }

  // ═══ OWL INTRO ═══
  setTimeout(() => {
    document.getElementById('owl-scroll').classList.remove('hidden');
  }, 3200);

  setTimeout(() => {
    document.getElementById('btn-accept-scroll').classList.remove('hidden');
  }, 3800);

  document.getElementById('btn-accept-scroll').addEventListener('click', () => {
    burstParticles(15);
    showAct('act-opening');
    runOpeningLines();
  });

  // ═══ OPENING LINES ═══
  function runOpeningLines() {
    document.querySelectorAll('#opening-lines .line').forEach(line => {
      const delay = parseInt(line.dataset.delay, 10);
      setTimeout(() => line.classList.remove('hidden'), delay);
    });
    setTimeout(() => document.getElementById('btn-begin').classList.remove('hidden'), 10000);
  }

  document.getElementById('btn-begin').addEventListener('click', () => {
    burstParticles(10);
    showAct('act-book');
  });

  // ═══ BOOK ═══
  let chapterIndex = 0;
  let bookSnitchesCaught = 0;
  let bookSnitchTimer = null;
  const bookPage = document.getElementById('book-page');
  const chapterGift = document.getElementById('chapter-gift');
  const giftText = document.getElementById('gift-text');

  function renderChapter(idx, direction = 'fwd') {
    const ch = CONFIG.chapters[idx];
    bookPage.classList.add(direction === 'fwd' ? 'turn-forward' : 'turn-back');
    chapterGift.classList.add('hidden');

    setTimeout(() => {
      document.getElementById('page-chapter').textContent = ch.title;
      document.getElementById('page-title').textContent = ch.subtitle;
      document.getElementById('page-body').innerHTML = ch.body.map(p => `<p>${personalize(p)}</p>`).join('');
      document.getElementById('chapter-indicator').textContent = `Chapter ${idx + 1} of ${CONFIG.chapters.length}`;
      document.getElementById('progress-fill').style.width = ((idx + 1) / CONFIG.chapters.length * 100) + '%';
      document.getElementById('btn-prev').disabled = idx === 0;
      document.getElementById('btn-next').textContent = idx === CONFIG.chapters.length - 1 ? 'Close the book →' : 'Next →';
      bookPage.classList.remove('turn-forward', 'turn-back');

      if (ch.gift) {
        giftText.textContent = personalize(ch.gift);
        setTimeout(() => chapterGift.classList.remove('hidden'), 600);
      }
    }, 280);
  }

  function nextChapter() {
    if (chapterIndex < CONFIG.chapters.length - 1) {
      chapterIndex++;
      renderChapter(chapterIndex, 'fwd');
    } else {
      stopBookSnitches();
      showAct('act-amortentia');
    }
  }

  function prevChapter() {
    if (chapterIndex > 0) {
      chapterIndex--;
      renderChapter(chapterIndex, 'back');
    }
  }

  document.getElementById('btn-next').addEventListener('click', nextChapter);
  document.getElementById('btn-prev').addEventListener('click', prevChapter);
  bookPage.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    nextChapter();
  });

  renderChapter(0);

  // Floating snitches during book
  function startBookSnitches() {
    stopBookSnitches();
    bookSnitchTimer = setInterval(spawnBookSnitch, 8000);
    setTimeout(spawnBookSnitch, 3000);
  }

  function stopBookSnitches() {
    if (bookSnitchTimer) clearInterval(bookSnitchTimer);
    document.querySelectorAll('.floating-snitch').forEach(s => s.remove());
  }

  function spawnBookSnitch() {
    if (bookSnitchesCaught >= 3) return;
    const s = document.createElement('div');
    s.className = 'floating-snitch';
    s.textContent = '⚡';
    s.style.left = (15 + Math.random() * 70) + 'vw';
    s.style.top = (20 + Math.random() * 50) + 'vh';
    s.addEventListener('click', (e) => {
      e.stopPropagation();
      bookSnitchesCaught++;
      document.getElementById('snitch-count').textContent = bookSnitchesCaught;
      showToast(CONFIG.snitchMessages[bookSnitchesCaught - 1] || 'Caught!');
      burstParticles(8);
      s.remove();
      if (bookSnitchesCaught >= 3) showToast('All snitches caught! You\'re magic ✨');
    });
    document.getElementById('snitch-container').appendChild(s);
    setTimeout(() => s.remove(), 5000);
  }

  // ═══ AMORTENTIA ═══
  let vialsOpened = 0;
  const vialsRow = document.getElementById('vials-row');

  CONFIG.amortentia.forEach((v, i) => {
    const el = document.createElement('div');
    el.className = 'vial';
    el.innerHTML = `
      <div class="vial-body" style="--vial-color: ${vialColors[i % vialColors.length]}"></div>
      <p class="vial-label">${v.scent}</p>`;
    el.addEventListener('click', () => {
      if (el.classList.contains('open')) return;
      el.classList.add('open');
      vialsOpened++;
      document.getElementById('amortentia-reveal').textContent = `"${v.scent}" — ${personalize(v.meaning)}`;
      document.getElementById('amortentia-reveal').classList.remove('hidden');
      burstParticles(6);
      if (vialsOpened >= CONFIG.amortentia.length) {
        document.getElementById('btn-after-amortentia').classList.remove('hidden');
        showToast('Amortentia complete. Your heart is showing.');
      }
    });
    vialsRow.appendChild(el);
  });

  document.getElementById('btn-after-amortentia').addEventListener('click', () => showAct('act-mirror'));

  // ═══ MIRROR ═══
  document.getElementById('mirror-prompt').textContent = personalize(CONFIG.mirror.prompt);
  const mirrorFrame = document.getElementById('mirror-frame');

  function revealMirror() {
    if (mirrorFrame.classList.contains('revealed')) return;
    mirrorFrame.classList.add('revealed');
    document.getElementById('mirror-vision').textContent = personalize(CONFIG.mirror.reveal);
    document.getElementById('mirror-vision').classList.remove('hidden');
    document.getElementById('btn-after-mirror').classList.remove('hidden');
    burstParticles(20);
    dropPetals(8);
  }

  mirrorFrame.addEventListener('click', revealMirror);
  mirrorFrame.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); revealMirror(); }
  });
  document.getElementById('btn-after-mirror').addEventListener('click', () => showAct('act-prophet'));

  // ═══ PROPHET ═══
  document.getElementById('prophet-date').textContent = CONFIG.prophet.date;
  const headlinesEl = document.getElementById('prophet-headlines');
  headlinesEl.innerHTML = CONFIG.prophet.headlines.map(h => {
    const cls = h.size === 'big' ? 'headline-big' : h.size === 'medium' ? 'headline-medium' : 'headline-small';
    return `<p class="${cls} headline-clickable" data-secret="${personalize(h.secret || '')}">${personalize(h.text)}</p>`;
  }).join('');
  document.getElementById('prophet-article').textContent = personalize(CONFIG.prophet.article);

  headlinesEl.addEventListener('click', (e) => {
    const h = e.target.closest('.headline-clickable');
    if (!h || !h.dataset.secret) return;
    const sec = document.getElementById('headline-secret');
    sec.textContent = h.dataset.secret;
    sec.classList.remove('hidden');
    showToast('Exclusive scoop!');
  });

  document.getElementById('btn-after-prophet').addEventListener('click', () => showAct('act-photos'));

  // ═══ PHOTOS (flip) ═══
  const rotations = [-3, 2, -1];
  document.getElementById('photo-wall').innerHTML = CONFIG.photos.map((photo, i) => {
    const img = photo.src
      ? `<img src="${photo.src}" alt="${photo.caption}" loading="lazy">`
      : `<div class="frame-placeholder">✦</div>`;
    return `
      <div class="living-frame" style="--rot: ${rotations[i % rotations.length]}deg" data-secret="${personalize(photo.secret || '')}">
        <div class="frame-border">
          <div class="frame-inner">
            <div class="frame-front">${img}</div>
            <div class="frame-back">${personalize(photo.secret || 'I adore you.')}</div>
          </div>
        </div>
        <p class="frame-caption">${personalize(photo.caption)}</p>
      </div>`;
  }).join('');

  document.querySelectorAll('.living-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      frame.classList.toggle('flipped');
      if (frame.classList.contains('flipped')) burstParticles(5);
    });
  });

  document.getElementById('btn-after-photos').addEventListener('click', () => showAct('act-gifts'));

  // ═══ FROG CARDS + HOWLER ═══
  document.getElementById('frog-cards').innerHTML = CONFIG.frogCards.map(card => `
    <div class="frog-card">
      <div class="frog-card-inner">
        <div class="frog-front"><span>🐸</span><p>Chocolate Frog</p><p style="font-size:0.65rem;margin-top:0.25rem">tap to flip</p></div>
        <div class="frog-back"><h4>${personalize(card.name)}</h4><p>${personalize(card.fact)}</p></div>
      </div>
    </div>`).join('');

  document.querySelectorAll('.frog-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      burstParticles(4);
    });
  });

  const howler = document.getElementById('howler');
  howler.addEventListener('click', () => {
    if (howler.classList.contains('opened')) return;
    howler.classList.remove('sealed');
    howler.classList.add('opened');
    document.getElementById('howler-shout').textContent = personalize(CONFIG.howler.shout);
    document.getElementById('howler-shout').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('howler-quiet').textContent = personalize(CONFIG.howler.quiet);
      document.getElementById('howler-quiet').classList.remove('hidden');
      document.getElementById('btn-after-gifts').classList.remove('hidden');
    }, 1200);
    burstParticles(15);
  });

  document.getElementById('btn-after-gifts').addEventListener('click', () => showAct('act-wand'));

  // ═══ WAND + LUMOS ═══
  const canvas = document.getElementById('wand-canvas');
  const ctx = canvas.getContext('2d');
  const lumosGlow = document.getElementById('lumos-glow');
  let drawing = false;
  let lumosActive = false;
  let points = [];
  let unlocked = false;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    redraw();
  }

  function redraw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (!lumosActive) {
      ctx.fillStyle = 'rgba(10, 14, 26, 0.85)';
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
    if (points.length < 2) return;
    ctx.strokeStyle = lumosActive ? '#f0d78c' : '#740001';
    ctx.lineWidth = lumosActive ? 4 : 3;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(201, 162, 39, 0.6)';
    ctx.shadowBlur = 12;
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

  let lumosTimer = null;

  function startLumos(e) {
    if (unlocked) return;
    e.preventDefault();
    const pos = getPos(e);
    lumosGlow.classList.remove('hidden');
    lumosGlow.style.left = pos.x + 'px';
    lumosGlow.style.top = pos.y + 'px';
    lumosTimer = setTimeout(() => {
      lumosActive = true;
      document.getElementById('wand-status').textContent = 'Lumos! Now draw a heart...';
      redraw();
      showToast('Lumos! The parchment glows...');
    }, 500);
  }

  function startDraw(e) {
    if (unlocked || !lumosActive) return;
    e.preventDefault();
    drawing = true;
    points = [getPos(e)];
  }

  function moveDraw(e) {
    const pos = getPos(e);
    lumosGlow.style.left = pos.x + 'px';
    lumosGlow.style.top = pos.y + 'px';
    if (!drawing || unlocked) return;
    e.preventDefault();
    points.push(pos);
    redraw();
  }

  function endDraw() {
    clearTimeout(lumosTimer);
    if (!drawing || unlocked) return;
    drawing = false;
    checkHeart();
  }

  function checkHeart() {
    if (points.length < 40) return;
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);
    if (points.length > 45 && width > 50 && height > 40 && width / height > 0.5 && width / height < 2) {
      unlockSecret();
    }
  }

  function unlockSecret() {
    unlocked = true;
    document.getElementById('wand-status').textContent = '✨ Your magic is real.';
    document.getElementById('secret-text').textContent = personalize(CONFIG.secretMessage);
    document.getElementById('secret-reveal').classList.remove('hidden');
    document.getElementById('btn-after-wand').classList.remove('hidden');
    burstParticles(30);
    dropPetals(10);
  }

  canvas.addEventListener('mousedown', (e) => { if (!lumosActive) startLumos(e); else startDraw(e); });
  canvas.addEventListener('mousemove', moveDraw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', (e) => { if (!lumosActive) startLumos(e); else startDraw(e); }, { passive: false });
  canvas.addEventListener('touchmove', moveDraw, { passive: false });
  canvas.addEventListener('touchend', endDraw);

  document.getElementById('btn-clear-wand').addEventListener('click', () => {
    if (unlocked) return;
    points = [];
    lumosActive = false;
    lumosGlow.classList.add('hidden');
    redraw();
    document.getElementById('wand-status').textContent = 'Hold to cast Lumos, then draw a heart...';
  });

  document.getElementById('btn-after-wand').addEventListener('click', () => showAct('act-snitch'));
  resizeCanvas();
  redraw();
  window.addEventListener('resize', resizeCanvas);

  // ═══ SNITCH GAME ═══
  let snitchScore = 0;
  let snitchMoveTimer = null;

  function startSnitchGame() {
    snitchScore = 0;
    document.getElementById('snitch-game-score').textContent = '0';
    document.getElementById('snitch-msg').textContent = '';
    document.getElementById('btn-after-snitch').classList.add('hidden');
    moveSnitch();
    if (snitchMoveTimer) clearInterval(snitchMoveTimer);
    snitchMoveTimer = setInterval(moveSnitch, 900);
  }

  function moveSnitch() {
    const sn = document.getElementById('flying-snitch');
    const arena = document.getElementById('snitch-arena');
    const ar = arena.getBoundingClientRect();
    sn.style.left = (20 + Math.random() * 70) + '%';
    sn.style.top = (15 + Math.random() * 65) + '%';
  }

  document.getElementById('flying-snitch').addEventListener('click', (e) => {
    e.stopPropagation();
    snitchScore++;
    document.getElementById('snitch-game-score').textContent = snitchScore;
    document.getElementById('snitch-msg').textContent = CONFIG.snitchMessages[snitchScore - 1] || 'Nice catch!';
    burstParticles(8);
    moveSnitch();
    if (snitchScore >= 5) {
      clearInterval(snitchMoveTimer);
      document.getElementById('flying-snitch').style.display = 'none';
      document.getElementById('snitch-msg').textContent = 'Seeker of the Year. Officially.';
      document.getElementById('btn-after-snitch').classList.remove('hidden');
      showToast('All 5 snitches caught! 🏆');
      burstParticles(25);
    }
  });

  document.getElementById('btn-after-snitch').addEventListener('click', () => showAct('act-ticket'));

  // ═══ TICKET ═══
  const house = houses[CONFIG.herHouse] || houses.gryffindor;
  document.getElementById('ticket-name').textContent = CONFIG.herName;
  document.getElementById('ticket-dest').textContent = CONFIG.ticket.destination;
  document.getElementById('ticket-date').textContent = CONFIG.ticket.date;
  document.getElementById('ticket-platform').textContent = CONFIG.ticket.platform;
  document.getElementById('ticket-house').textContent = `${house.emoji} House: ${house.name}`;
  document.getElementById('ticket-note').textContent = CONFIG.ticket.note;

  document.getElementById('btn-stamp').addEventListener('click', () => {
    document.getElementById('btn-stamp').classList.add('hidden');
    document.getElementById('ticket-stamp').classList.remove('hidden');
    document.getElementById('express-ticket').classList.add('stamped');
    document.getElementById('btn-finale').classList.remove('hidden');
    burstParticles(12);
    showToast('Ticket approved. See you on the platform.');
  });

  document.getElementById('btn-finale').addEventListener('click', () => showAct('act-always'));

  // ═══ ALWAYS ═══
  document.getElementById('finale-note').textContent = personalize(CONFIG.finaleNote);

  document.getElementById('btn-hug').addEventListener('click', () => {
    document.getElementById('hug-msg').textContent = personalize(CONFIG.hugMessage);
    document.getElementById('hug-msg').classList.remove('hidden');
    burstParticles(20);
    dropPetals(25);
    showToast('Hug delivered across all dimensions 🤗');
  });

  let constellationAnim = null;

  function startConstellation() {
    const cvs = document.getElementById('constellation');
    const c = cvs.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    cvs.width = window.innerWidth * dpr;
    cvs.height = window.innerHeight * dpr;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.scale(dpr, dpr);
    const w = window.innerWidth;
    const h = window.innerHeight;

    const heartStars = [];
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      heartStars.push({
        tx: w/2 + hx * 8, ty: h/2 + hy * 8 - 20,
        x: Math.random() * w, y: Math.random() * h,
        speed: 0.02 + Math.random() * 0.03,
      });
    }

    const bgStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5, a: Math.random(),
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
      let formed = 0;
      heartStars.forEach(s => {
        s.x += (s.tx - s.x) * s.speed;
        s.y += (s.ty - s.y) * s.speed;
        if (Math.abs(s.x - s.tx) < 5) formed++;
        c.beginPath();
        c.arc(s.x, s.y, 2, 0, Math.PI * 2);
        c.fillStyle = 'rgba(240, 215, 140, 0.9)';
        c.fill();
      });
      if (formed > 40) {
        c.strokeStyle = 'rgba(240, 215, 140, 0.12)';
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

  // ═══ REPLAY ═══
  document.getElementById('btn-replay').addEventListener('click', () => {
    chapterIndex = 0;
    bookSnitchesCaught = 0;
    vialsOpened = 0;
    unlocked = false;
    lumosActive = false;
    points = [];
    document.getElementById('snitch-count').textContent = '0';
    document.getElementById('secret-reveal').classList.add('hidden');
    document.getElementById('btn-after-wand').classList.add('hidden');
    document.getElementById('amortentia-reveal').classList.add('hidden');
    document.getElementById('btn-after-amortentia').classList.add('hidden');
    document.getElementById('mirror-frame').classList.remove('revealed');
    document.getElementById('mirror-vision').classList.add('hidden');
    document.getElementById('btn-after-mirror').classList.add('hidden');
    document.getElementById('howler').className = 'howler sealed';
    document.getElementById('howler-shout').classList.add('hidden');
    document.getElementById('howler-quiet').classList.add('hidden');
    document.getElementById('btn-after-gifts').classList.add('hidden');
    document.getElementById('btn-stamp').classList.remove('hidden');
    document.getElementById('ticket-stamp').classList.add('hidden');
    document.getElementById('btn-finale').classList.add('hidden');
    document.getElementById('hug-msg').classList.add('hidden');
    document.getElementById('flying-snitch').style.display = '';
    document.querySelectorAll('.vial').forEach(v => v.classList.remove('open'));
    document.querySelectorAll('.frog-card, .living-frame').forEach(c => c.classList.remove('flipped'));
    renderChapter(0);
    resizeCanvas();
    showAct('act-owl');
  });

})();