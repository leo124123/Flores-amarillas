import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import snoopyBowtieImg from '../assets/snoopy_bowtie.jpg';
import sunflowerBouquetImg from '../assets/sunflower_bouquet.jpg';
import { playChime } from '../utils/audio';

export default function BouquetScreen({ onNext }) {
  const [bloomCount, setBloomCount] = useState(0);

  const handleBouquetClick = (e) => {
    playChime(783.99); // G5 chime
    setBloomCount(prev => prev + 1);

    // Mini confetti burst of yellow petals and pink hearts from the bouquet position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 60,
      origin: { x, y },
      colors: ['#facc15', '#f59e0b', '#fbbf24', '#f472b6', '#ffffff'],
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 120,
      disableForReducedMotion: true
    });
  };

  const handleContinue = () => {
    playChime(880);
    onNext();
  };

  return (
    <div className="screen-container bouquet-screen">
      {/* Top Snoopy with Bowtie */}
      <div className="snoopy-top-wrapper">
        <div className="snoopy-circle-avatar">
          <img
            src={snoopyBowtieImg}
            alt="Snoopy feliz con corbatín"
            className="snoopy-avatar-img"
          />
        </div>
      </div>

      {/* Romantic Quote */}
      <div className="quote-box">
        <p className="romantic-quote">
          "Aunque la distancia exista, <br />
          tus flores amarillas siempre llegarán."
        </p>
      </div>

      {/* Watercolor Sunflower Bouquet */}
      <div
        className="bouquet-wrapper"
        onClick={handleBouquetClick}
        title="¡Haz clic en el ramo para llenarlo de magia!"
        role="button"
        tabIndex={0}
      >
        <div className="bouquet-card">
          <img
            src={sunflowerBouquetImg}
            alt="Ramo de girasoles y margaritas con lazo rosa"
            className="bouquet-img"
          />
          <div className="bouquet-glow-effect"></div>
        </div>

        {/* Micro hint */}
        <div className="bouquet-hint">
          <Sparkles size={14} className="hint-sparkle" />
          <span>Toca el ramo para darle amor {bloomCount > 0 && `(x${bloomCount})`}</span>
          <Heart size={14} className="hint-heart" />
        </div>
      </div>

      {/* Downward indicator / Next Button */}
      <div className="bottom-scroll-prompt">
        <button
          onClick={handleContinue}
          className="continue-pill-btn"
          id="btn-continuar-sorpresa"
        >
          <span>Continuar a la sorpresa</span>
          <ChevronDown className="bounce-arrow" size={20} />
        </button>
      </div>
    </div>
  );
}
