import { useEffect, useState } from 'react';

export default function CaseModal({ data, onClose, playExplosion }) {
    const [isDropping, setIsDropping] = useState(false);
    const [showWhiteout, setShowWhiteout] = useState(false);

    useEffect(() => {
        if (!data) return;
        
        setIsDropping(false);
        setShowWhiteout(false);

        // 10 Second Timer for Brick Drop Event
        const timer = setTimeout(() => {
            setIsDropping(true);
            setTimeout(() => {
                setShowWhiteout(true);
                playExplosion();
                setTimeout(() => {
                    onClose(); // Triggers app state reset back to main page
                    setShowWhiteout(false);
                }, 1000);
            }, 1500); // Wait for drop animation
        }, 10000);

        return () => clearTimeout(timer);
    }, [data, onClose, playExplosion]);

    if (!data) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${isDropping ? 'brick-drop' : ''}`}>
                <h2 className="modal-header">CLASSIFIED — NOW DECLASSIFIED — WAIT, RE-CLASSIFIED — STATUS: UNCLEAR</h2>
                <div className="modal-inner-flex">
                    <img src={data.img} className="modal-image" alt="Case Image" />
                    <div className="modal-text-content">
                        <div className="modal-body">
                            <h3>{data.title}</h3>
                            <p>{data.content}</p>
                        </div>
                        
                        <div className="modal-metadata">
                            <table>
                                <tbody>
                                    {Object.entries(data.metadata).map(([key, value]) => (
                                        <tr key={key}>
                                            <th>{key}</th>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="close-modal" onClick={onClose}>CLOSE FILE (INADVISABLE)</button>
            </div>
            {showWhiteout && <div className="whiteout"></div>}
        </div>
    );
}
