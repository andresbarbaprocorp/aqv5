import React from 'react';

const VenetianTile = ({ className, children }) => {
  return (
    <div className={`venetian-tile ${className || ''}`}>
      {children}
      <style jsx="true">{`
        .venetian-tile {
          position: relative;
          background-color: rgba(255, 255, 255, 0.85);
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        
        .venetian-tile::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(135deg, rgba(0, 150, 255, 0.1) 25%, transparent 25%) -10px 0,
            linear-gradient(225deg, rgba(0, 150, 255, 0.1) 25%, transparent 25%) -10px 0,
            linear-gradient(315deg, rgba(0, 150, 255, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, rgba(0, 150, 255, 0.1) 25%, transparent 25%);
          background-size: 20px 20px;
          background-color: transparent;
          opacity: 0.5;
          z-index: 0;
          pointer-events: none;
        }
        
        .venetian-tile > * {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default VenetianTile;