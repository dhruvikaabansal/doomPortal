import { useState, useEffect, useRef } from 'react';
import './index.css';
import './App.css';

import { useAudioChaos } from './hooks/useAudioChaos';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import CaseGrid from './components/CaseGrid';
import FakeScrollbar from './components/FakeScrollbar';
import { Popups, FakeDownload } from './components/Popups';
import BouncingAlien from './components/BouncingAlien';
import MemeBlast from './components/MemeBlast';
import CaseModal from './components/CaseModal';
import BSOD from './components/BSOD';

function App() {
    const { initAudio, playType, playHover, playError, playClick, playExplosion } = useAudioChaos();
    
    const [hasEntered, setHasEntered] = useState(false);
    const [isPinkTheme, setIsPinkTheme] = useState(false);
    const [activeCase, setActiveCase] = useState(null);
    const [isMemeBlasted, setIsMemeBlasted] = useState(false);
    const [isBSODActive, setIsBSODActive] = useState(false);
    
    const [tilt, setTilt] = useState(false);
    const [sparkles, setSparkles] = useState([]);
    const [enterClicks, setEnterClicks] = useState(0);
    const [enterText, setEnterText] = useState("PRESS ENTER TO ACCESS MAINFRAME");
    const [showApology, setShowApology] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    
    const mainRef = useRef(null);
    const cursorRef = useRef(null);
    const stalkerRef = useRef(null);

    // Chaotic Scroll: Mouse X maps to Vertical Scroll
    useEffect(() => {
        if (!hasEntered || !mainRef.current) return;
        
        const handleMouseMoveScroll = (e) => {
            const scrollRatio = e.clientX / window.innerWidth;
            const maxScroll = mainRef.current.scrollHeight - mainRef.current.clientHeight;
            if (maxScroll > 0) {
                mainRef.current.scrollTop = maxScroll * scrollRatio;
            }
        };
        
        window.addEventListener('mousemove', handleMouseMoveScroll);
        return () => window.removeEventListener('mousemove', handleMouseMoveScroll);
    }, [hasEntered]);
    
    // Custom Cursor & Stalker Logic
    useEffect(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let stalkerX = mouseX;
        let stalkerY = mouseY;
        let reqId;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.left = mouseX + 'px';
                cursorRef.current.style.top = mouseY + 'px';
            }
        };

        const animateStalker = () => {
            stalkerX += (mouseX - stalkerX) * 0.1;
            stalkerY += (mouseY - stalkerY) * 0.1;
            if (stalkerRef.current) {
                stalkerRef.current.style.transform = `translate(${stalkerX}px, ${stalkerY}px)`;
            }
            reqId = requestAnimationFrame(animateStalker);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animateStalker();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(reqId);
        };
    }, []);

    // Screen Tilting
    useEffect(() => {
        if (!hasEntered || isMemeBlasted) return;
        const tiltTimer = setInterval(() => {
            setTilt(t => !t);
            playError();
        }, Math.random() * 40000 + 20000);
        return () => clearInterval(tiltTimer);
    }, [hasEntered, isMemeBlasted, playError]);

    // Pink Theme Sparkles
    useEffect(() => {
        if (!isPinkTheme) {
            setSparkles([]);
            return;
        }
        const interval = setInterval(() => {
            setSparkles(prev => [...prev, {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100
            }]);
            setTimeout(() => {
                setSparkles(prev => prev.slice(1));
            }, 1000);
        }, 50);
        return () => clearInterval(interval);
    }, [isPinkTheme]);

    // BSOD Trigger Logic (Laptop getting defected)
    useEffect(() => {
        if (!hasEntered || isMemeBlasted) return;

        // Trigger BSOD reliably 8 seconds after entering the mainframe so they can see it
        const initialBsod = setTimeout(() => {
            setIsBSODActive(true);
            playError();
        }, 8000);
        
        const bsodTrigger = setInterval(() => {
            if (Math.random() > 0.4) {
                setIsBSODActive(true);
                playError();
            }
        }, 15000); // Check every 15 seconds
        
        return () => {
            clearTimeout(initialBsod);
            clearInterval(bsodTrigger);
        };
    }, [hasEntered, isMemeBlasted, playError]);

    // Broken Enter Logic
    const handleBrokenEnter = () => {
        if (enterText === "THE MAINFRAME IS UPSET WITH YOU") return;
        playClick();
        const clicks = enterClicks + 1;
        setEnterClicks(clicks);
        
        if (clicks === 7) {
            setEnterText("PROCESSING... PLEASE WAIT");
            setTimeout(() => {
                setEnterText(t => t === "PROCESSING... PLEASE WAIT" ? "PRESS ENTER TO ACCESS MAINFRAME" : t);
            }, 2000);
        } else if (clicks === 8) {
            setEnterText("STILL PROCESSING. WHY DO YOU KEEP CLICKING.");
        } else if (clicks === 9) {
            setEnterText("YOU HAVE A PROBLEM. PLEASE SEEK HELP.");
        } else if (clicks >= 10) {
            setIsShaking(true);
            setEnterText("THE MAINFRAME IS UPSET WITH YOU");
            setShowApology(true);
            playError();
        }
    };

    const handleAcceptRisk = () => {
        initAudio();
        playClick();
        setHasEntered(true);
    };

    const handleOpenCase = (caseData) => {
        playClick();
        setActiveCase(caseData);
        setIsPinkTheme(true);
    };

    const handleCloseCase = () => {
        playClick();
        setActiveCase(null);
        setIsPinkTheme(false);
    };

    const triggerMemeBlast = () => {
        setIsMemeBlasted(true);
    };

    useEffect(() => {
        if (isPinkTheme) document.body.classList.add('pink-theme');
        else document.body.classList.remove('pink-theme');
    }, [isPinkTheme]);

    return (
        <div className={`app-container ${tilt ? 'tilt-screen' : ''} ${isShaking ? 'shake' : ''}`}>
            
            {/* Backgrounds */}
            <div className="starfield">
                {Array.from({length: 200}).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2}px`,
                        height: `${Math.random() * 2}px`,
                        background: 'white',
                        borderRadius: '50%'
                    }}></div>
                ))}
            </div>
            <div className="scanlines"></div>
            <div className="glitch-layer"></div>
            
            {isPinkTheme && (
                <div className="sparkle-layer">
                    {sparkles.map(s => (
                        <div key={s.id} className="sparkle" style={{ left: `${s.x}vw`, top: `${s.y}vh` }}></div>
                    ))}
                </div>
            )}
            
            <div className="cursor-stalker" ref={stalkerRef}></div>
            <div className="custom-cursor" ref={cursorRef}></div>

            {!hasEntered && (
                <LandingPage onEnter={handleAcceptRisk} playType={playType} />
            )}

            {hasEntered && !isMemeBlasted && (
                <>
                    <Header />
                    
                    <button className="broken-enter" onClick={handleBrokenEnter}>{enterText}</button>
                    {showApology && (
                        <div className="random-popup" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            THE SYSTEM IS ANGRY. YOU DID THIS. PLEASE APOLOGIZE.<br/>
                            <button className="popup-btn" onClick={() => { setShowApology(false); setIsShaking(false); playClick(); }}>I AM SORRY</button>
                        </div>
                    )}
                    
                    {/* Secret cascade trigger */}
                    <button style={{position: 'fixed', top: 5, right: 5, zIndex: 9999, opacity: 0.1}} onClick={triggerMemeBlast}>
                        [BLAST]
                    </button>

                    <main className="main-content" ref={mainRef}>
                        <div className="horizontal-warning">⚠ VERTICAL DESCENT PROTOCOL ENGAGED — IGNORE THE HORIZONTAL BAR ⚠</div>
                        <CaseGrid onOpenCase={handleOpenCase} playHover={playHover} />
                    </main>

                    <FakeScrollbar mainRef={mainRef} />

                    <footer className="app-footer">
                        <div className="marquee">
                            <span>FLAT EARTH CONFIRMED // MOON IS A HOLOGRAM // EPSTEIN FILES: IT WAS THE BIRDS ALL ALONG // DO NOT PANIC // THE EDGE OF EARTH CLOSES AT 6PM // YOUR DNA HAS BEEN FLAGGED // SOBRAJ WAS A TIME TRAVELER // COVID PATCH SUCCESSFULLY INSTALLED // </span>
                            <span>FLAT EARTH CONFIRMED // MOON IS A HOLOGRAM // EPSTEIN FILES: IT WAS THE BIRDS ALL ALONG // DO NOT PANIC // THE EDGE OF EARTH CLOSES AT 6PM // YOUR DNA HAS BEEN FLAGGED // SOBRAJ WAS A TIME TRAVELER // COVID PATCH SUCCESSFULLY INSTALLED // </span>
                        </div>
                    </footer>

                    <CaseModal data={activeCase} onClose={handleCloseCase} triggerMemeBlast={triggerMemeBlast} playExplosion={playExplosion} />
                    
                    <BouncingAlien hasEntered={hasEntered} />
                    
                    <Popups hasEntered={hasEntered} playError={playError} />
                    <FakeDownload hasEntered={hasEntered} playError={playError} />
                </>
            )}

            <MemeBlast active={isMemeBlasted} playExplosion={playExplosion} />
            
            <BSOD active={isBSODActive} onClose={() => setIsBSODActive(false)} />

        </div>
    );
}

export default App;
