import { useState } from 'react';

export default function CaseCard({ data, onOpen, playHover }) {
    const [fleeStyle, setFleeStyle] = useState({});
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cardX, e.clientY - cardY);
        
        if (dist < 150 && !fleeStyle.transform) {
            playHover();
            const dir = Math.random() > 0.5 ? 1 : -1;
            const moveX = (Math.random() * 200 + 100) * dir;
            const moveY = (Math.random() * 200 + 100) * dir;
            setFleeStyle({
                transform: `translateX(${moveX}px) translateY(${moveY}px) rotateZ(${moveX/10}deg)`,
                transition: 'transform 150ms ease-out'
            });
            setTimeout(() => {
                setFleeStyle({
                    transform: `translateX(0px)`,
                    transition: 'transform 2s ease-in'
                });
                setTimeout(() => setFleeStyle({}), 2000);
            }, 3000);
        }
    };

    return (
        <div className="case-card" onMouseMove={handleMouseMove} style={fleeStyle}>
            <div className="card-border"></div>
            <div className="case-number">CASE #{String(data.id).padStart(4, '0')}</div>
            <img src={data.img} className="case-image" alt={data.title} />
            <div className="redacted-stamp">
                <span className="redacted-text">REDACTED</span>
                <span className="actual-text">{data.title}</span>
            </div>
            <div className="status-badge">RESOLUTION STATUS: SOLVED (TRUST US)</div>
            <div className="teaser">{data.teaser}</div>
            <button className="open-file-btn" onClick={() => onOpen(data)}>OPEN FILE</button>
        </div>
    );
}
