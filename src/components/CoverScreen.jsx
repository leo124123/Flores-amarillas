import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import snoopyFlowersImg from '../assets/snoopy_flowers.jpg';
import { playChime } from '../utils/audio';

export default function CoverScreen({ onNext }) {
  const handleVerRegalo = () => {
    playChime(659.25); // E5 chime
    onNext();
  };

  return (
    <div className="screen-container cover-screen">
      {/* Top Sparkles */}
      <div className="sparkle-header">
        <span className="sparkle-icon">✨</span>
      </div>

      {/* Recipient Name */}
      <div className="recipient-box">
        <h2 className="para-text">Para</h2>
        <h1 className="name-text">Lisa Mari</h1>
      </div>

      {/* Connected Hearts with Pink Ribbon */}
      <div className="connected-hearts-wrapper">
        <div className="ribbon-bow-svg">
          <svg viewBox="0 0 100 40" className="pink-ribbon-svg">
            <path
              d="M 50 15 C 38 0, 20 5, 26 22 C 32 35, 48 24, 50 18 C 52 24, 68 35, 74 22 C 80 5, 62 0, 50 15 Z"
              fill="#f48fb1"
              stroke="#ec407a"
              strokeWidth="1.5"
            />
            {/* Ribbons tails */}
            <path
              d="M 46 20 C 40 30, 32 38, 22 40"
              fill="none"
              stroke="#f48fb1"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 54 20 C 60 30, 68 38, 78 40"
              fill="none"
              stroke="#f48fb1"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="hearts-duo">
          <div className="heart-badge heart-left" title="Leonardo">
            <div className="heart-shape">
              <span className="heart-initial">L</span>
            </div>
            <span className="heart-tooltip">Leonardo</span>
          </div>

          <div className="heart-badge heart-right" title="Lisa Mari">
            <div className="heart-shape">
              <span className="heart-initial">LM</span>
            </div>
            <span className="heart-tooltip">Lisa Mari</span>
          </div>
        </div>
      </div>

      {/* Snoopy with Sunflowers Illustration */}
      <div className="illustration-wrapper cover-illustration">
        <div className="image-card-soft">
          <img
            src={snoopyFlowersImg}
            alt="Snoopy con girasoles para Lisa Mari"
            className="screen-img snoopy-main-img"
          />
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="bottom-action-wrapper">
        <button
          onClick={handleVerRegalo}
          className="cta-button pulse-effect"
          id="btn-ver-regalo"
        >
          <span className="btn-sparkle">✨</span>
          <span>VER REGALO</span>
          <span className="btn-flower">🌻</span>
        </button>
      </div>
    </div>
  );
}
