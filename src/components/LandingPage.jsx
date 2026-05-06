import { useState, useEffect } from 'react';

export default function LandingPage({ onEnter, playType }) {
    const [bootLines, setBootLines] = useState([]);
    const [showGuide, setShowGuide] = useState(false);

    const fullLines = [
        "> INITIATING DOOM PORTAL MAINFRAME...",
        "> BYPASSING GOVERNMENT FIREWALLS...",
        "> INJECTING CHAOS PROTOCOL...",
        "> DECRYPTING CLASSIFIED FILES...",
        "> WAKING UP THE BIRDS...",
        "> SYSTEM READY."
    ];

    useEffect(() => {
        let index = 0;
        const typeLine = () => {
            if (index < fullLines.length) {
                setBootLines(prev => [...prev, fullLines[index]]);
                playType();
                index++;
                setTimeout(typeLine, Math.random() * 300 + 200);
            } else {
                setTimeout(() => setShowGuide(true), 500);
            }
        };
        setTimeout(typeLine, 500);
    }, [playType]); // eslint-disable-line

    return (
        <div className="landing-page">
            <h1 className="glitch-text doom-title" data-text="DOOM PORTAL">DOOM PORTAL</h1>
            <div className="terminal-text">
                {bootLines.map((line, i) => <p key={i}>{line}</p>)}
            </div>
            
            {showGuide && (
                <div className="survival-guide">
                    <h2 className="glitch-text" data-text="⚠ SURVIVAL GUIDE: HOW TO SURF ⚠">⚠ SURVIVAL GUIDE: HOW TO SURF ⚠</h2>
                    <ul>
                        <li><strong>MOUSE X NAVIGATION:</strong> Vertical scrolling is forbidden. Move your mouse horizontally to scroll vertically.</li>
                        <li><strong>TRAP THE FILES:</strong> The entire case file will flee from your cursor. Good luck.</li>
                        <li><strong>THE BROKEN BUTTON:</strong> Do not press the Enter button in the corner. The Mainframe does not like it.</li>
                        <li><strong>10-SECOND BOMB:</strong> Once a file is open, you have 10 seconds before the structural integrity of the file drops into the void.</li>
                        <li><strong>IGNORE THE ALIEN:</strong> It is just bouncing. Do not look at it.</li>
                    </ul>
                    <button onClick={onEnter} className="glitch-btn">ACCEPT RISK & ENTER MAINFRAME</button>
                </div>
            )}
        </div>
    );
}
