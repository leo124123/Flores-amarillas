// Audio Engine for Flores Amarillas experience (Floricienta Song & Sound Effects)

let bgAudio = null;
let soundCtx = null;
let isAudioActive = false;

function getSoundContext() {
  if (!soundCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      soundCtx = new AudioContext();
    }
  }
  if (soundCtx && soundCtx.state === 'suspended') {
    soundCtx.resume();
  }
  return soundCtx;
}

// Initialize Background Song Audio Element
export function getBackgroundAudio() {
  if (!bgAudio && typeof window !== 'undefined') {
    bgAudio = new Audio('/flores_amarillas.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.75;
    bgAudio.preload = 'auto';

    bgAudio.addEventListener('play', () => {
      isAudioActive = true;
    });
    bgAudio.addEventListener('pause', () => {
      isAudioActive = false;
    });
    bgAudio.addEventListener('ended', () => {
      isAudioActive = false;
    });
  }
  return bgAudio;
}

// Play Flores Amarillas song
export async function playSong() {
  const audio = getBackgroundAudio();
  if (!audio) return false;

  try {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
      isAudioActive = true;
      return true;
    }
  } catch (err) {
    console.log('Autoplay was prevented by browser, waiting for user click:', err);
    return false;
  }
  return isAudioActive;
}

// Pause song
export function pauseSong() {
  const audio = getBackgroundAudio();
  if (audio) {
    audio.pause();
    isAudioActive = false;
  }
}

// Toggle song
export async function toggleSong() {
  const audio = getBackgroundAudio();
  if (!audio) return false;

  if (audio.paused) {
    return await playSong();
  } else {
    pauseSong();
    return false;
  }
}

export function isSongPlaying() {
  const audio = getBackgroundAudio();
  return audio ? !audio.paused : false;
}

// Gentle chime / sparkle tone sound effect (overlay on top of song)
export function playChime(freq = 880) {
  try {
    const ctx = getSoundContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Ignore audio context issues silently
  }
}

// Paper envelope open rustle sound
export function playPaperSound() {
  try {
    const ctx = getSoundContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.05;
      b2 = 0.90 * b2 + white * 0.05;
      data[i] = (b0 + b1 + b2) * 0.35;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1500, ctx.currentTime + 0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    // Ignore
  }
}
