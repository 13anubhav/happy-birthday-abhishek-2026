
/* ═══ STARS ═══ */
const SC = document.getElementById('stars-canvas'), sCtx = SC.getContext('2d');
let stars = [];
function rsz() { SC.width = innerWidth; SC.height = innerHeight; stars = Array.from({ length: 220 }, () => ({ x: Math.random() * SC.width, y: Math.random() * SC.height, r: Math.random() * 1.5 + .3, a: Math.random(), sp: Math.random() * .005 + .002, da: Math.random() > .5 ? 1 : -1 })) }
rsz(); addEventListener('resize', rsz);
(function ds() { sCtx.clearRect(0, 0, SC.width, SC.height); stars.forEach(s => { s.a += s.sp * s.da; if (s.a > 1 || s.a < .1) s.da *= -1; sCtx.beginPath(); sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2); sCtx.fillStyle = `rgba(255,255,255,${s.a})`; sCtx.fill() }); requestAnimationFrame(ds) })();

/* ═══ CONFETTI ═══ */
const CC = document.getElementById('confetti-canvas'), cCtx = CC.getContext('2d');
let parts = [];
function rszC() { CC.width = innerWidth; CC.height = innerHeight } rszC(); addEventListener('resize', rszC);
const COLS = ['#FFD700', '#FF4D8D', '#8B5CF6', '#00F5FF', '#FF6B00', '#00FF88', '#FF3366', '#fff'];
function mkP(px, py) { return { x: px ?? Math.random() * CC.width, y: py ?? -10, vx: (Math.random() - .5) * 9, vy: Math.random() * 4 + 2, col: COLS[Math.floor(Math.random() * COLS.length)], sz: Math.random() * 9 + 4, rot: Math.random() * 360, rs: (Math.random() - .5) * 6, life: 1, g: .12, sh: Math.random() > .5 ? 'r' : 'c' } }
function triggerConfetti(px, py) { for (let i = 0; i < 120; i++)setTimeout(() => parts.push(mkP(px, py)), i * 8) }
(function ac() { cCtx.clearRect(0, 0, CC.width, CC.height); parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.rs; p.life -= .007; cCtx.save(); cCtx.globalAlpha = Math.max(0, p.life); cCtx.translate(p.x, p.y); cCtx.rotate(p.rot * Math.PI / 180); cCtx.fillStyle = p.col; if (p.sh === 'r') cCtx.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2); else { cCtx.beginPath(); cCtx.arc(0, 0, p.sz / 2, 0, Math.PI * 2); cCtx.fill() } cCtx.restore() }); parts = parts.filter(p => p.life > 0 && p.y < CC.height + 20); requestAnimationFrame(ac) })();
setTimeout(() => triggerConfetti(), 800);

/* ═══ BALLOONS ═══ */
const BE = ['🎈', '🎀', '🎉', '🎊', '⭐', '💫', '🌟', '🎁'];
const balC = document.getElementById('balloons');
function spB() { const b = document.createElement('div'); b.className = 'balloon'; b.textContent = BE[Math.floor(Math.random() * BE.length)]; const dur = Math.random() * 9 + 9, drift = (Math.random() - .5) * 160 + 'px'; b.style.cssText = `left:${Math.random() * 95}%;animation-duration:${dur}s;animation-delay:${Math.random() * 4}s;--drift:${drift};font-size:${Math.random() * 1.5 + 1.5}rem;`; balC.appendChild(b); setTimeout(() => b.remove(), (dur + 5) * 1000) }
setInterval(spB, 1300); for (let i = 0; i < 6; i++)setTimeout(spB, i * 350);

/* ═══ CURSOR ═══ */
const cur = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
(function ac2() { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(ac2) })();
document.querySelectorAll('a,.cake-scene,.card,.number-ring,.emoji-wheel-wrap,.message-box,.blow-btn,.candle,.image-frame,.nav-logo,.nav-toggle,.nav-links a').forEach(el => { el.addEventListener('mouseenter', () => { cur.style.width = '28px'; cur.style.height = '28px'; ring.style.width = '58px'; ring.style.height = '58px' }); el.addEventListener('mouseleave', () => { cur.style.width = '18px'; cur.style.height = '18px'; ring.style.width = '38px'; ring.style.height = '38px' }) });
document.addEventListener('click', e => triggerConfetti(e.clientX, e.clientY));

/* ═══ CANDLE TOGGLE ═══ */
function isLit(c) { const fw = c.querySelector('.flame-wrap'); return fw.style.display !== 'none' && (fw.style.opacity === '' || parseFloat(fw.style.opacity || '1') > .05) }

function blowFlame(c) {
    const fw = c.querySelector('.flame-wrap');
    /* multi smoke particles */
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const sm = document.createElement('div'); sm.className = 'smoke-p';
            const sz = 6 + Math.random() * 7;
            sm.style.cssText = `width:${sz}px;height:${sz}px;bottom:${26 + Math.random() * 8}px;left:${2 + Math.random() * 6}px;--sx:${(Math.random() - .5) * 20}px;animation-delay:${i * .1}s;`;
            c.style.position = 'relative'; c.appendChild(sm);
            setTimeout(() => sm.remove(), 1700);
        }, i * 80)
    }
    fw.style.transition = 'opacity .3s ease,transform .3s ease';
    fw.style.opacity = '0'; fw.style.transform = 'scale(.4) translateY(-12px)';
    setTimeout(() => { fw.style.display = 'none'; fw.style.transform = '' }, 340);
    c.dataset.lit = 'false';
}

function relightFlame(c) {
    const fw = c.querySelector('.flame-wrap');
    fw.style.display = ''; fw.style.opacity = '0'; fw.style.transform = 'scale(.2) translateY(14px)';
    void fw.offsetWidth;
    fw.style.transition = 'opacity .42s ease,transform .42s cubic-bezier(.23,1.5,.32,1)';
    requestAnimationFrame(() => { fw.style.opacity = '1'; fw.style.transform = 'scale(1) translateY(0)' });
    /* sparkle */
    const sp = document.createElement('div'); sp.className = 'relight-spark'; sp.textContent = '✨'; sp.style.cssText = 'top:0;left:50%;';
    c.style.position = 'relative'; c.appendChild(sp); setTimeout(() => sp.remove(), 600);
    c.dataset.lit = 'true';
}

function toggleCandle(c) {
    if (isLit(c)) { blowFlame(c); setTimeout(checkAllBlown, 450) }
    else { relightFlame(c); updateBlowBtn() }
}

function checkAllBlown() {
    const all = [...document.querySelectorAll('.candle')];
    if (all.every(c => c.dataset.lit === 'false')) {
        const sc = document.getElementById('cakeScene');
        sc.classList.remove('cake-burst'); void sc.offsetWidth; sc.classList.add('cake-burst');
        triggerConfetti(); showToast('🎂 Wish made! Happy Birthday Abhishek! 🎉');
        const btn = document.getElementById('blowBtn');
        btn.style.background = 'linear-gradient(135deg,#FFD700,#FF9500,#FF5722)'; btn.style.animation = 'none';
        document.getElementById('blowBtnLabel').textContent = 'Relight All Candles 🕯️';
        document.querySelector('.btn-icon').textContent = '🕯️';
    }
    updateBlowBtn();
}

function updateBlowBtn() {
    if ([...document.querySelectorAll('.candle')].some(c => c.dataset.lit === 'true')) {
        const btn = document.getElementById('blowBtn');
        btn.style.background = ''; btn.style.animation = 'gradShift 3s ease infinite';
        document.getElementById('blowBtnLabel').textContent = 'Blow All Candles';
        document.querySelector('.btn-icon').textContent = '💨';
    }
}

function blowAllCandles() {
    const all = [...document.querySelectorAll('.candle')];
    const allOut = all.every(c => c.dataset.lit === 'false');
    if (allOut) { all.forEach((c, i) => setTimeout(() => relightFlame(c), i * 130)); const btn = document.getElementById('blowBtn'); btn.style.background = ''; btn.style.animation = 'gradShift 3s ease infinite'; document.getElementById('blowBtnLabel').textContent = 'Blow All Candles'; document.querySelector('.btn-icon').textContent = '💨'; return }
    spawnWind();
    all.forEach((c, i) => { if (c.dataset.lit === 'true') setTimeout(() => blowFlame(c), i * 165) });
    setTimeout(checkAllBlown, all.length * 165 + 500);
}

function spawnWind() {
    const btn = document.getElementById('blowBtn'), r = btn.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 10; i++) { setTimeout(() => { const l = document.createElement('div'); l.className = 'wind-line'; const ang = (Math.random() - .5) * 55 - 72, oy = (Math.random() - .5) * 75; l.style.cssText = `left:${cx}px;top:${cy + oy}px;transform:rotate(${ang}deg);transform-origin:left center;`; document.body.appendChild(l); setTimeout(() => l.remove(), 850) }, i * 50) }
    btn.style.transform = 'scale(.92) rotate(-4deg)'; setTimeout(() => btn.style.transform = '', 200);
}

/* ═══ TOAST ═══ */
function showToast(msg) { let t = document.getElementById('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(139,92,246,.93),rgba(255,77,141,.93));color:#fff;padding:1rem 2rem;border-radius:100px;font-family:Poppins,sans-serif;font-size:.95rem;z-index:9999;backdrop-filter:blur(14px);transition:opacity .5s;box-shadow:0 12px 34px rgba(139,92,246,.48);text-align:center;max-width:90vw;'; document.body.appendChild(t) } t.textContent = msg; t.style.opacity = '1'; clearTimeout(t._t); t._t = setTimeout(() => t.style.opacity = '0', 3500) }

/* ═══ RIPPLE ═══ */
function addRipple(e, el) { const r = document.createElement('div'); r.className = 'ripple'; const rc = el.getBoundingClientRect(); r.style.left = ((e.clientX || rc.left + rc.width / 2) - rc.left) + 'px'; r.style.top = ((e.clientY || rc.top + rc.height / 2) - rc.top) + 'px'; el.style.position = 'relative'; el.appendChild(r); setTimeout(() => r.remove(), 700) }

/* ═══ FUN EMOJI WHEEL ═══ */
const WHEEL_EMOJIS = ['🎂', '🎉', '🎈', '🌟', '🎁', '🎊', '💫', '🎀', '🥳', '✨', '🍰', '🎆', '🎇', '🥂', '🌈', '🎵'];
const PRIZE_MSGS = [
    '🎂 You got: Infinite Birthday Cake!',
    '🌟 You got: A Sky Full of Stars!',
    '🎁 You got: The Best Gift Ever!',
    '🥳 You got: Party Mode ACTIVATED!',
    '💫 You got: Magic & Sparkle Dust!',
    '🎉 You got: Non-stop Celebrations!',
    '🌈 You got: All the Good Vibes!',
    '🎵 You got: Your Favourite Song on Repeat!',
    '🍰 You got: Unlimited Desserts!',
    '🥂 You got: A Toast to Awesomeness!',
];
let wheelIdx = 0, wheelSpinning = false, spinCount = 0;

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    spinCount++;

    const orbit = document.getElementById('emojiOrbit');
    const center = document.getElementById('emojiCenter');
    const ring = document.getElementById('wheelRing');
    const label = document.getElementById('wheelLabel');
    const banner = document.getElementById('prizeBanner');

    // Hide banner
    banner.classList.remove('show');

    // Ring flash
    ring.classList.remove('ring-flash'); void ring.offsetWidth; ring.classList.add('ring-flash');

    // Speed lines burst
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sl = document.createElement('div');
            sl.className = 'speed-line';
            const angle = Math.random() * 360;
            const len = 40 + Math.random() * 50;
            sl.style.cssText = `transform:rotate(${angle}deg) translateX(80px);--sl:${len}px;width:${len}px;`;
            ring.appendChild(sl);
            setTimeout(() => sl.remove(), 450);
        }, i * 30);
    }

    // Shoot emoji particles from wheel center
    const wr = ring.getBoundingClientRect();
    const wcx = wr.left + wr.width / 2, wcy = wr.top + wr.height / 2;
    const burstEmojis = ['🎉', '✨', '💥', '🌟', '🎊', '💫', '🎈', '🥳'];
    for (let i = 0; i < 14; i++) {
        setTimeout(() => {
            const ep = document.createElement('div');
            ep.className = 'emoji-particle';
            ep.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
            const angle = (Math.random() * 360) * Math.PI / 180;
            const dist = 100 + Math.random() * 180;
            ep.style.cssText = `left:${wcx}px;top:${wcy}px;--ex:${Math.cos(angle) * dist}px;--ey:${Math.sin(angle) * dist}px;--er:${(Math.random() - 0.5) * 360}deg;`;
            document.body.appendChild(ep);
            setTimeout(() => ep.remove(), 1500);
        }, i * 40);
    }

    // Ramp-up: fast spin
    orbit.style.transition = 'none';
    orbit.style.animationDuration = '0.6s';

    // Center rapidly cycles emojis
    let ticks = 0;
    const totalTicks = 14 + Math.floor(Math.random() * 6); // 14–20 ticks
    const baseInterval = 90;

    function tick() {
        wheelIdx = (wheelIdx + 1) % WHEEL_EMOJIS.length;
        center.textContent = WHEEL_EMOJIS[wheelIdx];
        center.style.transform = 'scale(1.5) rotate(15deg)';
        setTimeout(() => { center.style.transform = ''; }, 120);
        ticks++;

        // Slow down near end
        const remaining = totalTicks - ticks;
        const delay = remaining > 4 ? baseInterval : baseInterval + (5 - remaining) * 80;

        if (ticks < totalTicks) {
            setTimeout(tick, delay);
        } else {
            // LANDED!
            onWheelLand();
        }
    }
    setTimeout(tick, 80);
}

function onWheelLand() {
    const orbit = document.getElementById('emojiOrbit');
    const center = document.getElementById('emojiCenter');
    const label = document.getElementById('wheelLabel');
    const banner = document.getElementById('prizeBanner');

    // Slow orbit back
    orbit.style.animationDuration = '7s';

    // Bounce land
    center.style.transition = 'transform .4s cubic-bezier(.23,2,.32,1)';
    center.style.transform = 'scale(1.7)';
    setTimeout(() => { center.style.transform = ''; }, 420);

    // Show prize
    const prize = PRIZE_MSGS[Math.floor(Math.random() * PRIZE_MSGS.length)];
    banner.textContent = prize;
    banner.classList.remove('show'); void banner.offsetWidth;
    banner.classList.add('show');

    // Confetti burst from wheel
    const wr = document.getElementById('wheelRing').getBoundingClientRect();
    triggerConfetti(wr.left + wr.width / 2, wr.top + wr.height / 2);

    // Update label with fun spin count
    const msgs = ['🔥 On Fire! Spin Again!', '💥 Again! Again!', '🌀 Keep Spinning!', '🎯 Lucky! Try Again?', '⚡ Electric! One More?'];
    label.textContent = msgs[spinCount % msgs.length] || '✨ Spin Again ✨';

    wheelSpinning = false;
}

/* Touch support */
document.getElementById('wheelWrap').addEventListener('touchstart', e => { e.preventDefault(); spinWheel(); }, { passive: false });

/* ═══ NAVBAR ═══ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
const navOverlay = document.getElementById('navOverlay');

// Scroll: shrink + glass effect
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    // Active link highlight
    const sections = [
        { id: 'top', el: document.getElementById('top') },
        { id: 'celebrate', el: document.getElementById('celebrate') },
        { id: 'wishes', el: document.getElementById('wishes') },
        { id: 'message', el: document.getElementById('message') },
    ];
    let current = 'top';
    sections.forEach(s => {
        if (s.el && window.scrollY >= s.el.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
        const href = a.getAttribute('href').replace('#', '');
        a.classList.toggle('active', href === current);
    });
});

// Hamburger open/close
function openNav() {
    navToggle.classList.add('open');
    navMobile.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeNav() {
    navToggle.classList.remove('open');
    navMobile.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
}
navToggle.addEventListener('click', () => {
    navToggle.classList.contains('open') ? closeNav() : openNav();
});
// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

/* ═══ SCROLL REVEAL ═══ */
const io = new IntersectionObserver(es => { es.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80) }) }, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ═══ TOUCH ═══ */
document.querySelectorAll('.card,.message-box').forEach(el => el.addEventListener('touchstart', e => addRipple(e.touches[0], el), { passive: true }));
document.querySelectorAll('.candle').forEach(c => c.addEventListener('touchstart', e => { e.preventDefault(); toggleCandle(c) }, { passive: false }));
document.getElementById('blowBtn').addEventListener('touchstart', e => { e.preventDefault(); blowAllCandles() }, { passive: false });
