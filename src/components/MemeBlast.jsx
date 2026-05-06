import { useState, useEffect } from 'react';

export default function MemeBlast({ active, playExplosion }) {
    const [errors, setErrors] = useState([]);
    const [showMeme, setShowMeme] = useState(false);
    const [showWhiteout, setShowWhiteout] = useState(false);

    useEffect(() => {
        if (!active) return;
        
        let errorCount = 0;
        const spawnError = () => {
            setErrors(prev => [...prev, {
                id: errorCount,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }]);
            errorCount++;
            if (errorCount < 100) {
                setTimeout(spawnError, 20);
            } else {
                // Blast
                setShowWhiteout(true);
                playExplosion();
                setTimeout(() => {
                    setShowWhiteout(false);
                    setShowMeme(true);
                }, 500);
            }
        };
        spawnError();
        
    }, [active, playExplosion]);

    if (!active) return null;

    if (showMeme) {
        return (
            <div className="meme-blast-container">
                <img src="/images/meme_this_is_fine_alien_1778076516459.png" className="meme-image" alt="This is fine alien" />
                <div className="meme-text">SYSTEM OBLITERATED. THIS IS FINE.</div>
            </div>
        );
    }

    return (
        <>
            {errors.map(err => (
                <div key={err.id} className="fake-error" style={{ left: err.x, top: err.y }}>
                    CRITICAL SYSTEM FAILURE: 0xDEADBEEF
                </div>
            ))}
            {showWhiteout && <div className="whiteout"></div>}
        </>
    );
}
