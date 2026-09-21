import React, { useState, useEffect } from 'react';
import PetalsCanvas from './components/PetalsCanvas';
import MusicPlayer from './components/MusicPlayer';
import CoverScreen from './components/CoverScreen';
import BouquetScreen from './components/BouquetScreen';
import EnvelopeScreen from './components/EnvelopeScreen';
import LetterModal from './components/LetterModal';
import AnimatedGarden from './components/AnimatedGarden/AnimatedGarden';
import { playSong, pauseSong, toggleSong, isSongPlaying, getBackgroundAudio } from './utils/audio';
import './App.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Initialize audio and listen for playback changes
  useEffect(() => {
    const audio = getBackgroundAudio();
    if (!audio) return;

    const handlePlay = () => setIsPlayingMusic(true);
    const handlePause = () => setIsPlayingMusic(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try starting playback immediately
    playSong().then((started) => {
      if (started) setIsPlayingMusic(true);
    });

    // Start playback on first user interaction anywhere if browser blocked initial autoplay
    const handleFirstUserGesture = () => {
      if (!isSongPlaying()) {
        playSong().then((started) => {
          if (started) setIsPlayingMusic(true);
        });
      }
    };

    window.addEventListener('click', handleFirstUserGesture, { once: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true });
    window.addEventListener('keydown', handleFirstUserGesture, { once: true });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };
  }, []);

  // Toggle song manual control
  const handleToggleMusic = async () => {
    const active = await toggleSong();
    setIsPlayingMusic(active);
  };

  // Move to next step, ensuring music is playing
  const handleNextStep = (nextStepNumber) => {
    if (!isSongPlaying()) {
      playSong();
    }
    setStep(nextStepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Background Falling Sunflower Petals & Golden Sparkles */}
      <PetalsCanvas />

      {/* Floating Music Controller for "Flores Amarillas" */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onToggle={handleToggleMusic}
      />

      {/* Main Experience Viewport or Fullscreen Animated Garden */}
      {step === 5 ? (
        <AnimatedGarden onBack={() => handleNextStep(4)} />
      ) : (
        <main className="story-viewport">
          <div className="story-card-body">
            {step === 1 && (
              <div className="step-fade-in">
                <CoverScreen onNext={() => handleNextStep(2)} />
              </div>
            )}

            {step === 2 && (
              <div className="step-fade-in">
                <BouquetScreen onNext={() => handleNextStep(3)} />
              </div>
            )}

            {step === 3 && (
              <div className="step-fade-in">
                <EnvelopeScreen onOpenLetter={() => handleNextStep(4)} />
              </div>
            )}

            {step === 4 && (
              <div className="step-fade-in">
                <LetterModal
                  onClose={() => setStep(3)}
                  onRestart={handleRestart}
                  onOpenGarden={() => handleNextStep(5)}
                />
              </div>
            )}
          </div>

          {/* Step Navigation Dots */}
          <nav className="step-indicators" aria-label="Progreso de la sorpresa">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                className={`dot-indicator ${step === s ? 'active' : ''}`}
                onClick={() => handleNextStep(s)}
                title={`Ir al paso ${s}`}
                aria-label={`Paso ${s}`}
              />
            ))}
          </nav>
        </main>
      )}

      {/* Footer message (Hidden in full-screen garden) */}
      {step !== 5 && (
        <footer className="app-footer">
          <span>Con amor para Lisa Mari • 🌻 Leonardo</span>
        </footer>
      )}
    </div>
  );
}
