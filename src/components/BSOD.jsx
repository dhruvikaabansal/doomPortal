import { useEffect } from 'react';

export default function BSOD({ active, onClose }) {
    useEffect(() => {
        if (!active) return;

        const handleKeyDown = () => {
            onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleKeyDown);
        };
    }, [active, onClose]);

    if (!active) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0000AA',
            color: '#FFFFFF',
            fontFamily: '"Lucida Console", Monaco, monospace',
            padding: '50px',
            zIndex: 999999,
            overflow: 'hidden',
            boxSizing: 'border-box',
            textAlign: 'left',
            userSelect: 'none'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
                <div style={{
                    background: '#FFFFFF',
                    color: '#0000AA',
                    display: 'inline-block',
                    padding: '2px 10px',
                    fontWeight: 'bold',
                    marginBottom: '40px'
                }}>
                    SYSTEM_FAILURE
                </div>
                
                <p>A fatal exception 0E has occurred at 028:C0011E36 in VXD VMM(01) + 00010E36. The current application "DOOM_PORTAL.EXE" has defected your local system memory cores.</p>
                
                <p style={{ marginTop: '35px' }}>
                    *  Press any key or click anywhere to attempt system reboot.<br />
                    *  If you lose files from 2247, contact your local extraterrestrial handler.<br />
                    *  Your hardware is currently undergoing atomic restructuring.
                </p>

                <p style={{ marginTop: '40px' }}>
                    Current Dossier Integrity: <span style={{ color: '#FFFF00' }}>COMPROMISED (0%)</span><br />
                    Error Code: <span style={{ color: '#FFFF00' }}>0x000000D1 (DRIVER_IRQL_NOT_LESS_OR_EQUAL)</span>
                </p>

                <div style={{ marginTop: '60px', textAlign: 'center', fontSize: '1rem', opacity: 0.8 }}>
                    Press any key to continue _
                </div>
            </div>
        </div>
    );
}
