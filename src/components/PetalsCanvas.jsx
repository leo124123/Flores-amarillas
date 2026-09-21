import React, { useEffect, useRef } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Petal class
    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20 - Math.random() * 50;
        this.size = Math.random() * 10 + 9; // Size between 9 and 19
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayRange = Math.random() * 1.5 + 0.5;
        this.time = Math.random() * 100;
        this.opacity = Math.random() * 0.35 + 0.55;

        // Colors: warm sunflower petal variations
        const colors = [
          'rgba(255, 209, 58, ',
          'rgba(255, 193, 7, ',
          'rgba(251, 191, 36, ',
          'rgba(245, 158, 11, ',
          'rgba(254, 240, 138, '
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.time += this.swaySpeed;
        this.x += Math.sin(this.time) * this.swayRange + this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;

        if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.beginPath();
        // Sunflower petal shape (pointed curve)
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
          this.size * 0.5, -this.size * 0.5,
          this.size * 0.6, this.size * 0.4,
          0, this.size
        );
        ctx.bezierCurveTo(
          -this.size * 0.6, this.size * 0.4,
          -this.size * 0.5, -this.size * 0.5,
          0, -this.size
        );
        ctx.fill();

        // Subtle center vein
        ctx.strokeStyle = `rgba(217, 119, 6, ${this.opacity * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 0.7);
        ctx.lineTo(0, this.size * 0.7);
        ctx.stroke();

        ctx.restore();
      }
    }

    // Golden sparkles / dust particles
    class Sparkle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.4 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.t = Math.random() * Math.PI;
      }

      update() {
        this.t += this.twinkleSpeed;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10) this.reset();
      }

      draw() {
        const curAlpha = Math.abs(Math.sin(this.t)) * this.alpha;
        ctx.save();
        ctx.fillStyle = `rgba(254, 222, 100, ${curAlpha})`;
        ctx.shadowColor = 'rgba(250, 204, 21, 0.6)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Number of petals adjusted for screen size
    const petalCount = Math.min(Math.floor(width / 35), 32);
    const petals = Array.from({ length: petalCount }, () => new Petal());
    const sparkles = Array.from({ length: 24 }, () => new Sparkle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach((s) => {
        s.update();
        s.draw();
      });

      petals.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="petals-canvas"
      aria-hidden="true"
    />
  );
}
