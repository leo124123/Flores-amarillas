import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, X } from 'lucide-react';
import coupleHandsImg from '../assets/couple_holding_hands.jpg';
import snoopyBowtieImg from '../assets/snoopy_bowtie.jpg';
import sunflowerCornerImg from '../assets/sunflower_corner.jpg';
import { playChime } from '../utils/audio';

export default function LetterModal({ onClose, onRestart, onOpenGarden }) {
  // Trigger romantic celebration burst when letter appears
  useEffect(() => {
    triggerFlowerShower();
  }, []);

  const handleLluviaClick = () => {
    triggerFlowerShower();
    if (onOpenGarden) {
      setTimeout(() => {
        onOpenGarden();
      }, 500);
    }
  };

  const triggerFlowerShower = () => {
    playChime(659.25);
    playChime(880);

    const end = Date.now() + 1800;
    const colors = ['#facc15', '#f59e0b', '#fbbf24', '#f472b6', '#ffffff', '#eab308'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="letter-overlay">
      <div className="letter-parchment-sheet">
        {/* Heart Garland at the Top */}
        <div className="garland-container">
          <div className="garland-string"></div>
          <div className="garland-flags">
            <div className="garland-flag"><Heart size={14} className="g-heart" /></div>
            <div className="garland-flag"><Heart size={14} className="g-heart" /></div>
            <div className="garland-flag"><Heart size={14} className="g-heart" /></div>
            <div className="garland-flag"><Heart size={14} className="g-heart" /></div>
            <div className="garland-flag"><Heart size={14} className="g-heart" /></div>
          </div>
        </div>

        {/* Top Corner Sunflower */}
        <div className="corner-sunflower top-right-sunflower">
          <img
            src={sunflowerCornerImg}
            alt="Girasol decorativo"
            className="corner-flower-img"
          />
        </div>

        {/* Letter Header Information */}
        <div className="letter-header-meta">
          <div className="meta-line">
            <span className="meta-label">De:</span>
            <span className="meta-value author">Leonardo</span>
          </div>
          <div className="meta-line">
            <span className="meta-label">Para:</span>
            <span className="meta-value recipient">Lisa Mari</span>
          </div>
        </div>

        {/* Letter Title */}
        <div className="letter-title-section">
          <h2 className="letter-heading">Una carta para ti</h2>
          <div className="title-divider-sunflower">
            <span>🌻</span>
          </div>
        </div>

        {/* Heartfelt Letter Text */}
        <div className="letter-body-content">
          <p className="letter-paragraph">
            Los momentos más bonitos no siempre son los más grandes.
          </p>
          <p className="letter-paragraph">
            A veces son las risas, las conversaciones largas, los pequeños detalles o simplemente compartir tiempo juntos.
          </p>
          <p className="letter-paragraph">
            Cada recuerdo contigo se guarda como algo especial. Y espero que todavía nos queden muchísimos momentos más por vivir.
          </p>
          <p className="letter-paragraph love-highlight">
            Eres la persona más grande e increíble que he conocido y quiero dar todo por ti. Deseo de todo corazón que Dios nos siga guiando juntos cada día y que Él sea siempre el centro de toda nuestra relación... ¡Te quiero muchooo! 💛✨
          </p>
          <p className="letter-signature">
            ¡Feliz día de las Flores Amarillas, Lisa Mari! 🌻<br />
            <span className="sign-author">Con todo mi amor, Leonardo</span>
          </p>
        </div>

        {/* Memories Collage / Polaroids */}
        <div className="letter-memories-row">
          {/* Polaroid 1: Holding Hands - 21 Sep */}
          <div className="polaroid-card hands-polaroid">
            <div className="washi-tape tape-top"></div>
            <div className="polaroid-photo-frame">
              <img
                src={coupleHandsImg}
                alt="21 de Septiembre - Flores Amarillas"
                className="polaroid-img"
              />
            </div>
            <div className="polaroid-caption">
              <span>21 Sep • 🌻</span>
            </div>
          </div>

          {/* Polaroid 2: Snoopy Happy */}
          <div className="polaroid-card snoopy-polaroid">
            <div className="washi-tape tape-angle"></div>
            <div className="polaroid-photo-frame">
              <img
                src={snoopyBowtieImg}
                alt="Snoopy sonriente"
                className="polaroid-img"
              />
            </div>
            <div className="polaroid-caption">
              <span>Tú & Yo 💛</span>
            </div>
          </div>
        </div>

        {/* Bottom Corner Sunflower */}
        <div className="corner-sunflower bottom-left-sunflower">
          <img
            src={sunflowerCornerImg}
            alt="Girasol decorativo"
            className="corner-flower-img flipped"
          />
        </div>

        {/* Interactive Buttons */}
        <div className="letter-actions-panel">
          <button
            onClick={handleLluviaClick}
            className="action-btn flower-shower-btn"
            id="btn-lluvia-flores"
            title="Entrar al jardín mágico de flores animadas"
          >
            <Sparkles size={18} />
            <span>¡Lluvia de flores animadas! 🌻</span>
          </button>

          <button
            onClick={onRestart}
            className="action-btn replay-btn"
            id="btn-volver-inicio"
            title="Volver a disfrutar la sorpresa desde el inicio"
          >
            <RefreshCw size={18} />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
