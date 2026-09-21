import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import snoopyNotedImg from '../assets/snoopy_noted.jpg';
import envelopeImg from '../assets/envelope.jpg';
import { playPaperSound, playChime } from '../utils/audio';

export default function EnvelopeScreen({ onOpenLetter }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = (e) => {
    if (isOpening) return;
    setIsOpening(true);

    playPaperSound();
    playChime(1046.5); // C6 chime

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 75,
      origin: { x, y },
      colors: ['#facc15', '#f59e0b', '#fbbf24', '#fef08a', '#f472b6'],
      scalar: 1.15,
      disableForReducedMotion: true
    });

    // Allow opening animation to complete before revealing the letter
    setTimeout(() => {
      onOpenLetter();
    }, 900);
  };

  return (
    <div className="screen-container envelope-screen">
      {/* Snoopy Noted Explorer - Enhanced & seamlessly blended */}
      <div className="snoopy-noted-wrapper">
        <div className="noted-header-text">
          <span className="noted-label">Noted</span>
          <span className="noted-star">⭐</span>
        </div>
        <div className="snoopy-noted-card enlarged-snoopy-card">
          <img
            src={snoopyNotedImg}
            alt="Snoopy tomando notas con sombrero explorador"
            className="snoopy-noted-img blended-art"
          />
        </div>
      </div>

      {/* Romantic teaser text */}
      <div className="surprise-teaser-box">
        <h3 className="surprise-title">
          Tengo una sorpresa más para ti...
        </h3>
      </div>

      {/* Interactive Envelope Card - Larger & Seamlessly Blended */}
      <div
        className={`interactive-envelope-container enlarged-envelope ${isOpening ? 'is-opening' : ''}`}
        onClick={handleEnvelopeClick}
        role="button"
        tabIndex={0}
        id="envelope-btn"
        title="Haz clic para abrir la carta de Leonardo"
      >
        <div className="envelope-card-glow">
          {/* Decorative drifting petals around envelope (matching screenshot) */}
          <div className="drifting-petal petal-left-top">🌻</div>
          <div className="drifting-petal petal-left-bottom">✨</div>
          <div className="drifting-petal petal-right-top">✨</div>

          <img
            src={envelopeImg}
            alt="Sobre con sello de girasol"
            className="envelope-art-img blended-art"
          />

          {/* Golden floating sparkles around envelope */}
          <div className="envelope-stars">
            <span className="star-dot s1">✨</span>
            <span className="star-dot s2">✨</span>
            <span className="star-dot s3">✨</span>
            <span className="star-dot s4">✨</span>
          </div>

          {/* Letter peeking animation when opened */}
          <div className={`letter-peek ${isOpening ? 'slide-up' : ''}`}>
            <div className="letter-peek-inner">
              <span className="peek-title">Para: Lisa Mari 💛</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions below */}
      <div className="click-instruction">
        <p className="instruction-text">
          {isOpening ? 'Abriendo tu carta con amor...' : 'Da clic sobre la carta y descúbrelo'}
        </p>
      </div>
    </div>
  );
}
