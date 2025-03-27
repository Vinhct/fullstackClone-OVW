import React, { useEffect, useState, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setOffset(scrollPosition * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  const getTransformStyle = () => {
    if (direction === 'vertical') {
      return { transform: `translateY(${offset}px)` };
    } else {
      return { transform: `translateX(${offset}px)` };
    }
  };

  return (
    <div 
      className={`transition-transform duration-300 ease-out ${className}`}
      style={getTransformStyle()}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
