import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <div className="music-player-container">
      <button
        onClick={onToggle}
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? 'Pausar canción Flores Amarillas' : 'Reproducir canción Flores Amarillas'}
        aria-label="Control de música Flores Amarillas"
      >
        <div className="music-disc-icon">
          <span className="flower-disc">🌻</span>
        </div>

        <div className="music-info">
          <span className="music-title">Flores Amarillas 🎵</span>
          <div className="soundwave-bars">
            <span className={`bar bar-1 ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar bar-2 ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar bar-3 ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar bar-4 ${isPlaying ? 'anim' : ''}`}></span>
          </div>
        </div>

        <div className="volume-icon">
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </div>
      </button>
    </div>
  );
}
