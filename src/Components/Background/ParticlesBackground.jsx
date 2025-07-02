import React, { useRef, useEffect } from "react";

const VantaNetCDNBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Wait for VANTA and THREE to be available on window
    const interval = setInterval(() => {
      if (window.VANTA && window.THREE && vantaRef.current) {
        if (!vantaEffect.current) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3fff69, // Green
            backgroundColor: 0xd0c0e, // Purple
            points: 10.0,
            maxDistance: 20.0,
            spacing: 15.0,
            showDots: true,
            showLines: true,
          });
        }
        clearInterval(interval);
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (e) {}
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default VantaNetCDNBackground; 