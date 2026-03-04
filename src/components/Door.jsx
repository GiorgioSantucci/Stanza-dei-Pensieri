import React, { useState } from 'react';
import './Door.css';

const Door = ({ isOpen, onClick }) => {
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    // Se lo swipe è verso destra di almeno 50px
    if (touchStart - touchEnd < -50) {
      onClick();
    }
  };

  return (
    <div 
      className={`door-overlay ${isOpen ? 'is-open' : ''}`} 
      onClick={!isOpen ? onClick : null}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="door-surface">
        <div className="door-content">
          <div className="door-lock-icon">
             <div className="knob" />
          </div>
          <p className="hint-text">
            {window.innerWidth < 768 ? "Scorri verso destra per entrare nella Stanza dei Pensieri" : "Tocca per entrare nella Stanza dei Pensieri"}
          </p>
        </div>
        <div className="door-bottom-light"></div>
      </div>
    </div>
  );
};

export default Door;