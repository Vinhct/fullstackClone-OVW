import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting
    if (!isStarted) {
      timeout = setTimeout(() => {
        setIsStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    // Start typing effect
    if (isStarted && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (isStarted && currentIndex === text.length && onComplete) {
      onComplete();
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, isStarted, onComplete, speed, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;
