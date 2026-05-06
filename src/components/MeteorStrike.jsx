import { useEffect } from 'react';

export default function MeteorStrike({ active, onImpact, playExplosion }) {
    useEffect(() => {
        if (!active) return;
        
        // Impact after 1s (meteor animation duration)
        const timer = setTimeout(() => {
            playExplosion();
            onImpact();
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [active, onImpact, playExplosion]);

    if (!active) return null;

    return (
        <div className="meteor-container">
            <div className="meteor">☄️</div>
        </div>
    );
}
