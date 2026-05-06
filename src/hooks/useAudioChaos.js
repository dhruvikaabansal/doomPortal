import { useRef, useCallback } from 'react';

export function useAudioChaos() {
    const audioCtx = useRef(null);

    const initAudio = useCallback(() => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.current.state === 'suspended') {
            audioCtx.current.resume();
        }
    }, []);

    const playTone = useCallback((freq, type, duration, vol = 0.1) => {
        if (!audioCtx.current) return;
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
        
        gain.gain.setValueAtTime(vol, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.current.destination);
        
        osc.start();
        osc.stop(audioCtx.current.currentTime + duration);
    }, []);

    const playType = useCallback(() => playTone(Math.random() * 200 + 400, 'square', 0.1, 0.05), [playTone]);
    const playHover = useCallback(() => playTone(150, 'sawtooth', 0.2, 0.05), [playTone]);
    const playError = useCallback(() => playTone(100, 'square', 0.5, 0.2), [playTone]);
    const playClick = useCallback(() => playTone(800, 'sine', 0.1, 0.1), [playTone]);
    
    const playExplosion = useCallback(() => {
        if (!audioCtx.current) return;
        const bufferSize = audioCtx.current.sampleRate * 2; // 2 seconds
        const buffer = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // White noise
        }
        
        const noise = audioCtx.current.createBufferSource();
        noise.buffer = buffer;
        
        const filter = audioCtx.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, audioCtx.current.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, audioCtx.current.currentTime + 1.5);
        
        const gain = audioCtx.current.createGain();
        gain.gain.setValueAtTime(1, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 2);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.current.destination);
        
        noise.start();
    }, []);

    return { initAudio, playType, playHover, playError, playClick, playExplosion };
}
