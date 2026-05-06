import { useState, useEffect } from 'react';

const ALIEN_POPUPS = [
    "⚠ YOU ARE BEING OBSERVED BY 3 ENTITIES. ONE OF THEM IS A PLANT.",
    "🛸 PROXIMITY ALERT: AN UNREGISTERED CRAFT IS 0.3 MILES FROM YOUR CURRENT LOCATION.",
    "📡 YOUR BROWSER HAS BEEN FLAGGED FOR INDEPENDENT THINKING.",
    "🧬 DNA SCAN COMPLETE. 4.7% UNCLASSIFIED GENETIC MATERIAL.",
    "🌍 REMINDER: THE EDGE OF THE EARTH IS CLOSED FOR MAINTENANCE.",
    "👁 EPSTEIN'S BIRDS ARE WATCHING THIS SESSION."
];

export function Popups({ hasEntered, playError }) {
    const [popups, setPopups] = useState([]);
    
    useEffect(() => {
        if (!hasEntered) return;
        const interval = setInterval(() => {
            if (Math.random() > 0.5) {
                const msg = ALIEN_POPUPS[Math.floor(Math.random() * ALIEN_POPUPS.length)];
                setPopups(prev => [...prev, {
                    id: Date.now(),
                    msg,
                    x: Math.random() * (window.innerWidth - 400),
                    y: Math.random() * (window.innerHeight - 200)
                }]);
                playError();
            }
        }, 15000);
        return () => clearInterval(interval);
    }, [hasEntered, playError]);

    return (
        <>
            {popups.map(p => (
                <div key={p.id} className="random-popup" style={{ left: p.x, top: p.y }}>
                    {p.msg}<br/>
                    <button className="popup-btn" onClick={() => setPopups(prev => prev.filter(x => x.id !== p.id))}>
                        ACKNOWLEDGE & COMPLY
                    </button>
                </div>
            ))}
        </>
    );
}

export function FakeDownload({ hasEntered, playError }) {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("0%");
    const [isError, setIsError] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (!hasEntered || hasTriggered) return;
        setHasTriggered(true);
        const timer = setTimeout(() => {
            setIsVisible(true);
            playError();
        }, Math.random() * 20000 + 10000); // Between 10 and 30 seconds
        return () => clearTimeout(timer);
    }, [hasEntered, hasTriggered, playError]);

    useEffect(() => {
        let interval;
        if (isVisible && progress < 99 && !isError) {
            interval = setInterval(() => {
                setProgress(p => {
                    const next = p + Math.random() * 5;
                    return next > 99 ? 99 : next;
                });
            }, 200);
        } else if (progress >= 99 && !isError) {
            setIsError(true);
            setTimeout(() => {
                setStatus("ERROR. YOUR TASTE IS TOO AWFUL. ABORTING.");
                playError();
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            }, 1500);
        }
        
        if (!isError && progress < 99) {
            setStatus(Math.floor(progress) + '%');
        }

        return () => clearInterval(interval);
    }, [isVisible, progress, isError, playError]);

    if (!isVisible) return null;

    return (
        <div className="fake-download">
            <h2 className="glitch-text" data-text="DOWNLOADING YOUR SEARCH HISTORY...">DOWNLOADING YOUR SEARCH HISTORY...</h2>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%`, background: isError ? 'var(--alert)' : 'var(--primary)' }}></div>
            </div>
            <div className="download-status" style={{ color: isError ? 'var(--alert)' : 'var(--warning)' }}>{status}</div>
        </div>
    );
}
