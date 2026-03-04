import React from 'react';

const Bigliettino = ({ frase, progress, side, offsetY, styleClass, decorator, isMobile }) => {
  const Z_NEAR = 280, Z_FAR = -1600;
  const zPos = Z_FAR + (Z_NEAR - Z_FAR) * progress;
  const scaleBase = 0.18 + 0.82 * Math.max(0, progress);

  let opacity = 0, blurPx = 0;
  if (progress < 0.15) { opacity = 0; blurPx = 10; }
  else if (progress < 0.35) { const t=(progress-0.15)/0.20; opacity=t*0.85; blurPx=10-t*10; }
  else if (progress < 0.72) { opacity = 1; blurPx = 0; }
  else if (progress < 0.88) { const t=(progress-0.72)/0.16; opacity=1-t*0.55; blurPx=t*3; }
  else { const t=(progress-0.88)/0.12; opacity=0.45-t*0.45; blurPx=3+t*4; }

  const lat = isMobile ? 0 : (side === 'left' ? -20 : 20);

  return (
    <div className="bigliettino-wrap" style={{
      transform: `translateZ(${zPos}px) translateX(${lat}vw) translateY(${offsetY}vh) scale(${scaleBase})`,
      opacity,
      filter: blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : 'none'
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