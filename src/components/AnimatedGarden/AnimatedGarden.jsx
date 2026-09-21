import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { getBackgroundAudio, playSong, isSongPlaying } from '../../utils/audio';
import './flowers.css';

// Synchronized lyrics for "Flores Amarillas" by Floricienta
const FLORES_AMARILLAS_LYRICS = [
  { text: "🎵 Él la estaba esperando con una flor amarilla...", time: 11, end: 17 },
  { text: "Ella lo estaba soñando con la luz en su pupila...", time: 17, end: 23 },
  { text: "Y el amarillo del sol iluminaba la esquina...", time: 23, end: 29 },
  { text: "Lo sentía tan cercano, lo sentía desde niña...", time: 29, end: 35 },
  { text: "Ella sabía que él sabía...", time: 35, end: 38 },
  { text: "Que algún día pasaría...", time: 38, end: 41 },
  { text: "Que vendría a buscarla con sus flores amarillas... 🌻", time: 41, end: 48 },
  { text: "No te apures, no detengas el instante del encuentro...", time: 48, end: 54 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho...", time: 54, end: 60 },
  { text: "No te olvides que la vida casi nunca está dormida... 💛", time: 60, end: 72 },
  { text: "En ese bar tan desierto los esperaba el encuentro...", time: 73, end: 79 },
  { text: "Ella llegó en limosina amarilla, por supuesto...", time: 79, end: 85 },
  { text: "Él se acercó de repente, la miró tan de frente...", time: 85, end: 91 },
  { text: "Toda una vida soñada y no pudo decir nada...", time: 91, end: 97 },
  { text: "Ella sabía que él sabía...", time: 97, end: 100 },
  { text: "Que algún día pasaría...", time: 100, end: 103 },
  { text: "Que vendría a buscarla con sus flores amarillas... 🌻✨", time: 103, end: 110 },
  { text: "No te apures, no detengas el instante del encuentro...", time: 110, end: 116 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho...", time: 116, end: 122 },
  { text: "No te olvides que la vida casi nunca está dormida... 🌟", time: 122, end: 134 },
  { text: "Flores amarillas para ti, Lisa Mari... 🌻💛", time: 135, end: 155 },
  { text: "Con todo mi amor, Leonardo ✨", time: 155, end: 210 }
];

export default function AnimatedGarden({ onBack }) {
  const canvasRef = useRef(null);
  const [currentLyric, setCurrentLyric] = useState("");
  const [showTitulo, setShowTitulo] = useState(true);

  // Synchronize lyrics with the playing audio
  useEffect(() => {
    const audio = getBackgroundAudio();
    if (!audio) return;

    if (!isSongPlaying()) {
      playSong();
    }

    const interval = setInterval(() => {
      if (!audio) return;
      const t = audio.currentTime;

      const matched = FLORES_AMARILLAS_LYRICS.find(
        (l) => t >= l.time && t < l.end
      );

      if (matched) {
        setCurrentLyric(matched.text);
      } else {
        setCurrentLyric("");
      }
    }, 250);

    // Hide title after 15 seconds so the user can enjoy the flowers and lyrics
    const titleTimeout = setTimeout(() => {
      setShowTitulo(false);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(titleTimeout);
    };
  }, []);

  // Starry sky background canvas with color palettes, shooting stars & fireflies
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const palettes = [
      { from: [8, 4, 38], to: [35, 12, 75] },
      { from: [4, 18, 55], to: [12, 45, 100] },
      { from: [28, 4, 55], to: [60, 12, 95] },
      { from: [4, 32, 48], to: [8, 65, 90] },
      { from: [48, 4, 28], to: [90, 16, 65] },
      { from: [4, 38, 38], to: [12, 75, 75] }
    ];

    let pIdx = 0, pNext = 1, tPalette = 0;
    const PALETTE_DUR = 6000;

    const NUM_STARS = 220;
    const stars = [];

    for (let i = 0; i < NUM_STARS; i++) {
      const size = Math.random() * 2.2 + 0.3;
      const warm = Math.random();
      let color;
      if (warm < 0.2) color = `hsl(${45 + Math.random() * 30}, 100%, 92%)`;
      else if (warm < 0.35) color = `hsl(${200 + Math.random() * 40}, 80%, 88%)`;
      else color = '#ffffff';

      stars.push({
        x: Math.random(),
        y: Math.random(),
        size,
        baseAlpha: Math.random() * 0.55 + 0.35,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
        color
      });
    }

    const NUM_FIREFLIES = 32;
    const fireflies = [];
    for (let i = 0; i < NUM_FIREFLIES; i++) {
      fireflies.push({
        x: Math.random() * (window.innerWidth || 1000),
        y: Math.random() * (window.innerHeight || 1000),
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        offset: Math.random() * Math.PI * 2
      });
    }

    const shooters = Array.from({ length: 4 }, (_, i) => ({
      active: false,
      delay: i * 3500 + Math.random() * 3000,
      x: 0, y: 0, len: 0, angle: 0, speed: 0, progress: 0
    }));

    function spawnShooter(s) {
      s.active = true;
      s.progress = 0;
      s.x = Math.random() * W * 0.75 + W * 0.05;
      s.y = Math.random() * H * 0.45;
      s.len = Math.random() * 160 + 90;
      s.angle = Math.random() * 0.45 + 0.18;
      s.speed = Math.random() * 3.5 + 3;
      s.delay = Math.random() * 9000 + 5000;
    }

    function lerp3(a, b, t) {
      return a.map((v, i) => Math.round(v + (b[i] - v) * t));
    }
    function eio(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    let last = null;
    let animId;
    const timers = shooters.map((_, i) => i * 3500 + 2000);

    function frame(ts) {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;

      tPalette += dt;
      if (tPalette >= PALETTE_DUR) {
        tPalette -= PALETTE_DUR;
        pIdx = pNext;
        pNext = (pNext + 1) % palettes.length;
      }
      const pt = eio(Math.min(tPalette / PALETTE_DUR, 1));
      const topC = lerp3(palettes[pIdx].from, palettes[pNext].from, pt);
      const botC = lerp3(palettes[pIdx].to, palettes[pNext].to, pt);

      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, `rgb(${topC})`);
      g.addColorStop(1, `rgb(${botC})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const t2 = ts * 0.001;

      // Draw Stars
      for (const s of stars) {
        const tw = Math.sin(t2 * s.twinkleSpeed * 6 + s.twinkleOffset);
        const alpha = Math.max(0.05, Math.min(1, s.baseAlpha + tw * 0.28));
        const sx = s.x * W;
        const sy = s.y * H;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size * 4;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.size > 1.5) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.shadowBlur = s.size * 10;
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw Golden Floating Embers
      for (const f of fireflies) {
        f.y -= f.speedY;
        f.x += Math.sin(t2 * 1.5 + f.offset) * 0.5 + f.speedX;

        if (f.y < -10) {
          f.y = H + 10;
          f.x = Math.random() * W;
        }
        if (f.x < -10) f.x = W + 10;
        if (f.x > W + 10) f.x = -10;

        const fAlpha = Math.max(0.1, f.baseAlpha * (0.65 + 0.35 * Math.sin(t2 * 2.5 + f.offset)));
        ctx.save();
        ctx.globalAlpha = fAlpha;
        ctx.fillStyle = '#ffe066';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = f.size * 7;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Shooting Stars
      for (let i = 0; i < shooters.length; i++) {
        timers[i] -= dt;
        const s = shooters[i];

        if (!s.active && timers[i] <= 0) {
          spawnShooter(s);
        }

        if (s.active) {
          s.progress += s.speed;
          const px = s.x + Math.cos(s.angle) * s.progress;
          const py = s.y + Math.sin(s.angle) * s.progress;
          const tail = Math.min(s.len, s.progress);
          const tx = px - Math.cos(s.angle) * tail;
          const ty = py - Math.sin(s.angle) * tail;
          const fade = 1 - s.progress / (s.len * 2.8);

          if (fade <= 0) {
            s.active = false;
            timers[i] = s.delay;
            continue;
          }

          const sg = ctx.createLinearGradient(tx, ty, px, py);
          sg.addColorStop(0, 'rgba(255,255,255,0)');
          sg.addColorStop(1, `rgba(255,255,255,${(fade * 0.92).toFixed(3)})`);

          ctx.save();
          ctx.strokeStyle = sg;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = 'rgba(200,225,255,0.85)';
          ctx.shadowBlur = 7;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="animated-garden-container">
      {/* Dynamic Starry Sky & Fireflies Canvas */}
      <canvas ref={canvasRef} className="garden-canvas" />

      {/* Back button to return to the letter */}
      <button
        onClick={onBack}
        className="garden-back-btn"
        title="Volver a la carta"
        aria-label="Volver a la carta"
      >
        <ArrowLeft size={18} />
        <span>Volver a la carta</span>
      </button>

      {/* Synchronized Song Lyrics */}
      <div className="garden-lyrics-wrapper">
        {currentLyric && (
          <div id="lyrics" key={currentLyric}>
            {currentLyric}
          </div>
        )}
      </div>

      {/* Heartfelt title / Get well wish from Leonardo */}
      {showTitulo && (
        <h1 className="titulo">
          Espero que te mejores de la gripe, Lisaaa 💛
          <br /><br />
          Toma este hermoso jardín de flores amarillas para iluminar tu día y hacerte sonreír. ¡Que te mejores pronto! 🌻✨
        </h1>
      )}

      {/* Night ambience gradient overlay */}
      <div className="night"></div>

      {/* 3 Blooming Animated CSS Flowers with leaves, light particles and stems */}
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
            <div className="flower__line__leaf flower__line__leaf--5"></div>
            <div className="flower__line__leaf flower__line__leaf--6"></div>
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>

            <div className="flower__light flower__light--1"></div>
            <div className="flower__light flower__light--2"></div>
            <div className="flower__light flower__light--3"></div>
            <div className="flower__light flower__light--4"></div>
            <div className="flower__light flower__light--5"></div>
            <div className="flower__light flower__light--6"></div>
            <div className="flower__light flower__light--7"></div>
            <div className="flower__light flower__light--8"></div>
          </div>
          <div className="flower__line">
            <div className="flower__line__leaf flower__line__leaf--1"></div>
            <div className="flower__line__leaf flower__line__leaf--2"></div>
            <div className="flower__line__leaf flower__line__leaf--3"></div>
            <div className="flower__line__leaf flower__line__leaf--4"></div>
          </div>
        </div>

        {/* Growing Grass & Stems */}
        <div className="grow-ans" style={{ '--d': '1.2s' }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            <div className="flower__grass__leaf flower__grass__leaf--1"></div>
            <div className="flower__grass__leaf flower__grass__leaf--2"></div>
            <div className="flower__grass__leaf flower__grass__leaf--3"></div>
            <div className="flower__grass__leaf flower__grass__leaf--4"></div>
            <div className="flower__grass__leaf flower__grass__leaf--5"></div>
            <div className="flower__grass__leaf flower__grass__leaf--6"></div>
            <div className="flower__grass__leaf flower__grass__leaf--7"></div>
            <div className="flower__grass__leaf flower__grass__leaf--8"></div>
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.4s' }}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-front">
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
              <div className="flower__g-front__leaf"></div>
            </div>
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '3.2s' }}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
            <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
          </div>
        </div>

        {/* Long Grass Variations */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={`long-g long-g--${i}`}>
            <div className="grow-ans" style={{ '--d': `${3 + (i % 3) * 0.4}s` }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': `${2.2 + (i % 3) * 0.5}s` }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': `${3.4 + (i % 2) * 0.3}s` }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': `${3.6 + (i % 2) * 0.4}s` }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
