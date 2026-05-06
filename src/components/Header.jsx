import { useState, useEffect } from 'react';

export default function Header() {
    const [uptime, setUptime] = useState(0);
    const [operatives, setOperatives] = useState(847);
    const [title, setTitle] = useState("DOOM PORTAL // YEAR 2247 // ALL CASES RESOLVED");

    useEffect(() => {
        const timer = setInterval(() => setUptime(u => u + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setOperatives(Math.floor(Math.random() * 900) + 100);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|:;<>,.?/~';
        const originalTitle = "DOOM PORTAL // YEAR 2247 // ALL CASES RESOLVED";
        
        const scheduleCorruption = () => {
            setTimeout(() => {
                let corrupted = '';
                for (let i = 0; i < originalTitle.length; i++) {
                    corrupted += originalTitle[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
                }
                setTitle(corrupted);
                setTimeout(() => {
                    setTitle(originalTitle);
                    scheduleCorruption();
                }, 1000);
            }, Math.random() * 4000 + 8000);
        };
        scheduleCorruption();
    }, []);

    const h = String(Math.floor(uptime / 3600)).padStart(2, '0');
    const m = String(Math.floor((uptime % 3600) / 60)).padStart(2, '0');
    const s = String(uptime % 60).padStart(2, '0');

    return (
        <header className="app-header">
            <h1 className="header-title glitch-text" data-text={title}>{title}</h1>
            <div className="header-stats">
                <span>UPTIME: {h}:{m}:{s}</span> | 
                <span>ACTIVE OPERATIVES: {operatives}</span>
            </div>
        </header>
    );
}
