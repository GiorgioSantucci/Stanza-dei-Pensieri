import React from 'react';

const Door = ({ doorProgress }) => {
  const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const eased = easeInOutCubic(Math.min(1, doorProgress));
  const translateY = -eased * 100;
  const hintOpacity = Math.max(0, 1 - doorProgress * 8);

  return (
    <div className="door-scene" style={{
        transform: `translateY(${translateY}%)`,
        visibility: doorProgress >= 1 ? 'hidden' : 'visible',
      }}>
      <div className="door-surface" />
      <div className="door-panels">
        <div className="door-panel-row top"><div className="door-panel-box" /><div className="door-panel-box" /></div>
        <div className="door-panel-row middle"><div className="door-panel-box" /></div>
        <div className="door-panel-row bottom"><div className="door-panel-box" /><div className="door-panel-box" /></div>
      </div>
      <div className="door-knob-wrap">
        <div className="door-knob" />
        <div className="door-keyhole" />
      </div>
      <div className="door-kh-glow" />
      <div className="door-bottom-light" />
      <div className="door-hint" style={{ opacity: hintOpacity }}>
        <span>scorri per entrare</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>
  );
};

export default Door;