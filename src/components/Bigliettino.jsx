import React from 'react';

const Bigliettino = ({ frase, progress, side, offsetY, styleClass, decorator, isMobile }) => {
  // Invertiamo: FAR è il punto di nascita, NEAR è il punto di arrivo verso l'utente
  const Z_START = -2000; // Lontano nel fondo
  const Z_END = 500;    // Supera la telecamera
  
  const zPos = Z_START + (Z_END - Z_START) * progress;
  const scaleBase = 0.1 + 1.2 * progress; // Parte piccolo, diventa grande

  // Opacità: appare dal nulla nel fondo, resta visibile al centro, svanisce quando ci viene addosso
  let opacity = 0;
  let blurPx = 0;

  if (progress < 0.2) { 
    opacity = progress * 5; 
    blurPx = 8 * (1 - progress * 5);
  } else if (progress < 0.8) { 
    opacity = 1; 
    blurPx = 0;
  } else { 
    opacity = 1 - (progress - 0.8) * 5; 
    blurPx = (progress - 0.8) * 10;
  }

  const lat = isMobile ? 0 : (side === 'left' ? -22 : 22);

  return (
    <div className="bigliettino-wrap" style={{
      transform: `translateZ(${zPos}px) translateX(${lat}vw) translateY(${offsetY}vh) scale(${scaleBase})`,
      opacity,
      filter: blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : 'none',
      pointerEvents: opacity > 0.8 ? 'auto' : 'none'
    }}>
      <div className={`bigliettino ${styleClass}`}>
        {decorator === 'pin' && <div className="bigliettino-pin"/>}
        {decorator === 'clip' && <div className="bigliettino-pin clip"/>}
        {decorator === 'tape' && <div className="bigliettino-tape"/>}
        <p className="bigliettino-text">{frase}</p>
      </div>
    </div>
  );
};

export default Bigliettino;