import React from 'react';
import './Door.css';

const Door = ({ isOpen, onClick }) => {
  return (
    <div 
      className={`door-overlay ${isOpen ? 'is-open' : ''}`} 
      onClick={!isOpen ? onClick : null}
    >
      <div className="door-surface">
        <div className="door-content">
          <div className="door-lock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <p className="hint-text">Tocca per entrare nell'archivio</p>
        </div>
      </div>
    </div>
  );
};

export default Door;