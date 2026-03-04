import React, { useRef } from 'react';

export const Atmosphere = ({ opacity }) => {
  const dustParticles = useRef(Array.from({length: 26}, (_, i) => ({
    id: i, size: Math.random() * 2.5 + 0.8,
    left: Math.random() * 100,
    delay: Math.random() * 18, duration: Math.random() * 14 + 10,
    op: Math.random() * 0.5 + 0.2,
  }))).current;

  const fogWisps = useRef(Array.from({length: 6}, (_, i) => ({
    id: i, width: Math.random() * 300 + 200, height: Math.random() * 150 + 100,
    left: Math.random() * 90, top: Math.random() * 80,
    delay: Math.random() * 6, duration: Math.random() * 8 + 8, op: Math.random() * 0.5 + 0.3,
  }))).current;

  return (
    <>
      <div className="particles-layer" style={{ opacity, transition: 'opacity 1.2s' }}>
        {dustParticles.map(p => (
          <div key={p.id} className="dust-particle" style={{
            width: p.size, height: p.size, left: `${p.left}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, opacity: p.op
          }}/>
        ))}
      </div>
      <div className="fog-layer" style={{ opacity, transition: 'opacity 1.2s' }}>
        {fogWisps.map(w => (
          <div key={w.id} className="fog-wisp" style={{
            width: w.width, height: w.height, left: `${w.left}%`, top: `${w.top}%`,
            animationDelay: `${w.delay}s`, animationDuration: `${w.duration}s`, opacity: w.op
          }}/>
        ))}
      </div>
    </>
  );
};