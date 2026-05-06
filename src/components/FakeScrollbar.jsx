import { useEffect, useState } from 'react';

export default function FakeScrollbar({ mainRef }) {
    const [scrollRatio, setScrollRatio] = useState(0);

    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;

        const handleScroll = () => {
            const maxScroll = el.scrollHeight - el.clientHeight;
            if (maxScroll <= 0) {
                setScrollRatio(0);
                return;
            }
            const ratio = el.scrollTop / maxScroll;
            setScrollRatio(ratio);
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [mainRef]);

    return (
        <div className="fake-h-scroll-container">
            <div 
                className="fake-h-scroll-thumb" 
                style={{ transform: `translateX(calc(${scrollRatio} * (100vw - 100px)))` }}
            ></div>
        </div>
    );
}
