import React, { useState, useEffect, useRef } from 'react';
import content from './data/content.json';
import Door from './components/Door';
import Bigliettino from './components/Bigliettino';
import { Atmosphere } from './components/Atmosphere';
import './App.css';

const { frasi, config } = content;
const TOTAL_SCROLL = config.doorEnd + frasi.length * config.cardsStep;

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const targetY = useRef(0);
  
  // Genera offset stabili per i bigliettini
  const cardOffsets = useRef(frasi.map(() => Math.round((Math.random() * 36) - 18))).current;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animazione fluida (LERP)
  useEffect(() => {
    let rafId;
    const tick = () => {
      setScrollY(prev => {
        const diff = targetY.current - prev;
        if (Math.abs(diff) < 0.1) return targetY.current;
        return prev + diff * 0.08;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Input listener
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      targetY.current = Math.max(0, Math.min(TOTAL_SCROLL, targetY.current + e.deltaY));
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const doorProgress = Math.min(1, scrollY / config.doorEnd);
  const roomScrollY = Math.max(0, scrollY - config.doorEnd);
  const roomAtmo = Math.max(0, Math.min(1, (doorProgress - 0.4) / 0.6));

  return (
    <div className="app-container">
      <div className="room-bg" />
      <Atmosphere opacity={roomAtmo} />
      
      <div className="progress-bar" style={{ width: `${(scrollY / TOTAL_SCROLL) * 100}%` }} />

      <div className="scroll-container" style={{ opacity: roomAtmo, pointerEvents: 'none' }}>
        <div className="scene">
          {frasi.map((f, i) => {
            const cs = i * config.cardsStep;
            const ce = cs + config.cardsStep * config.visibleWin;
            const p = Math.max(0, Math.min(1, (roomScrollY - cs) / (ce - cs)));
            return (
              <Bigliettino 
                key={i} frase={f} progress={p} isMobile={isMobile}
                side={i % 2 === 0 ? 'left' : 'right'} offsetY={cardOffsets[i]}
                styleClass={config.styles[i % config.styles.length]} 
                decorator={config.decorators[i % config.decorators.length]}
              />
            );
          })}
        </div>
      </div>

      <Door doorProgress={doorProgress} />
    </div>
  );
}

export default App;