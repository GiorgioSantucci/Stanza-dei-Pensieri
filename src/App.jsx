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
  const cardOffsets = useRef(frasi.map(() => Math.round((Math.random() * 30) - 15))).current;

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
      // Scroll positivo = bigliettini che vengono verso l'utente
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
        transition: 'opacity 1.5s ease'
      }}>
        <div className="scene">
          {frasi.map((f, i) => {
            const startScroll = i * config.cardsStep;
            // Il progresso 0.5 è il "dolce stil novo" (bigliettino leggibile al centro)
            // Più scrolli, più il valore aumenta e il bigliettino ti viene incontro
            const progress = 0.5 + (scrollY - startScroll) / (config.cardsStep * 2);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            return (
              <Bigliettino 
                key={i} 
                frase={f} 
                progress={clampedProgress}
                isMobile={isMobile}
                side={i % 2 === 0 ? 'left' : 'right'} 
                offsetY={cardOffsets[i]}
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