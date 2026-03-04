import React, { useState, useEffect, useRef } from 'react';
import content from './data/content.json';
import Door from './components/Door';
import Bigliettino from './components/Bigliettino';
import { Atmosphere } from './components/Atmosphere';
import './App.css';

const { frasi, config } = content;
const TOTAL_SCROLL = (frasi.length - 1) * config.cardsStep;

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const targetY = useRef(0);
  
  // Memorizziamo le posizioni casuali per non farle rigenerare a ogni render
  const cardOffsets = useRef(frasi.map(() => ({
    y: Math.round(Math.random() * 30 - 15),
    rot: Math.round(Math.random() * 10 - 5)
  }))).current;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDoorOpen) return;
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
  }, [isDoorOpen]);

  useEffect(() => {
    if (!isDoorOpen) return;
    const handleWheel = (e) => {
      e.preventDefault();
      targetY.current = Math.max(0, Math.min(TOTAL_SCROLL, targetY.current + e.deltaY));
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isDoorOpen]);

  return (
    <div className="app-container">
      <div className="room-bg" />
      <Atmosphere opacity={isDoorOpen ? 1 : 0} />
      
      {isDoorOpen && (
        <div className="progress-bar" style={{ width: `${(scrollY / TOTAL_SCROLL) * 100}%` }} />
      )}

      <div className="scroll-container" style={{ 
        opacity: isDoorOpen ? 1 : 0, 
        transition: 'opacity 1.5s ease',
        perspectiveOrigin: `50% ${isMobile ? '45%' : '50%'}`
      }}>
        <div className="scene">
          {frasi.map((f, i) => {
            const startScroll = i * config.cardsStep;
            // Progress 0.5 = Bigliettino centrato e leggibile
            const progress = 0.5 + (scrollY - startScroll) / (config.cardsStep * 2.5);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            return (
              <Bigliettino 
                key={i} 
                frase={f} 
                progress={clampedProgress}
                isMobile={isMobile}
                side={i % 2 === 0 ? 'left' : 'right'} 
                offsetY={cardOffsets[i].y}
                rotation={cardOffsets[i].rot}
                styleClass={config.styles[i % config.styles.length]} 
                decorator={config.decorators[i % config.decorators.length]}
              />
            );
          })}
        </div>
      </div>

      <Door isOpen={isDoorOpen} onClick={() => setIsDoorOpen(true)} />
    </div>
  );
}

export default App;