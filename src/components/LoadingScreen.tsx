"use client";

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + Math.random() * 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  if (!isLoading && progress === 100) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-dark transition-opacity duration-500 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-24 h-24 mb-8 relative">
        {/* Overwatch logo animation */}
        <div className="absolute inset-0 border-4 border-primary-blue rounded-full opacity-75 animate-ping"></div>
        <div className="absolute inset-2 border-4 border-secondary-blue rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute inset-4 border-4 border-accent-orange rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-dark-blue rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-primary-blue transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-primary-blue font-bold text-lg">
        {Math.round(progress)}%
      </div>
      
      <p className="text-text-light mt-4 text-sm uppercase tracking-widest animate-pulse">
        Đang tải...
      </p>
    </div>
  );
};

export default LoadingScreen;
