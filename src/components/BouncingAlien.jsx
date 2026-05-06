import { useEffect, useState, useRef } from 'react';

export default function BouncingAlien({ hasEntered }) {
    const [pos, setPos] = useState({ x: 100, y: 100 });
    const vel = useRef({ dx: 3, dy: 3 });
    const size = 50;

    useEffect(() => {
        if (!hasEntered) return;
        
        let reqId;
        const animate = () => {
            setPos(prev => {
                let nextX = prev.x + vel.current.dx;
                let nextY = prev.y + vel.current.dy;

                if (nextX <= 0 || nextX + size >= window.innerWidth) {
                    vel.current.dx *= -1;
                    nextX = prev.x + vel.current.dx;
                }
                if (nextY <= 0 || nextY + size >= window.innerHeight) {
                    vel.current.dy *= -1;
                    nextY = prev.y + vel.current.dy;
                }

                return { x: nextX, y: nextY };
            });
            reqId = requestAnimationFrame(animate);
        };
        reqId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(reqId);
    }, [hasEntered]);

    if (!hasEntered) return null;

    return (
        <div style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            fontSize: `${size}px`,
            lineHeight: 1,
            zIndex: 99999,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 10px #00ff00)'
        }}>
            👽
        </div>
    );
}
