import React from 'react';

const FallingParticles: React.FC = () => {
  const particleCount = 50;

  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDuration: `${Math.random() * 5 + 8}s`, // 8s to 13s duration
      animationDelay: `${Math.random() * 10}s`, // 0s to 10s delay
    };
    return <div key={i} className="particle" style={style}></div>;
  });

  return <div className="particles-container">{particles}</div>;
};

export default FallingParticles;