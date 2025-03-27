"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Add window message listener for YouTube API events
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onReady') {
          // Video is ready, try to play it
          playVideo();
          setVideoLoaded(true);
        }
      } catch (e) {
        // Not a JSON message or not from YouTube, ignore
      }
    };

    window.addEventListener('message', handleMessage);

    // Force video to play on load
    const playVideo = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          // Try to play using YouTube iframe API
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
          setIsPlaying(true);
        } catch (error) {
          console.log("Error playing video:", error);
        }
      }
    };

    // Try multiple times with increasing delays
    const playTimers = [
      setTimeout(playVideo, 1000),
      setTimeout(playVideo, 2000),
      setTimeout(playVideo, 3000)
    ];

    // Reload iframe if video doesn't load after 5 seconds
    const reloadTimer = setTimeout(() => {
      if (!videoLoaded && iframeRef.current) {
        const src = iframeRef.current.src;
        iframeRef.current.src = '';
        setTimeout(() => {
          if (iframeRef.current) iframeRef.current.src = src;
        }, 100);
      }
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('message', handleMessage);
      playTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(reloadTimer);
    };
  }, [videoLoaded]);

  const togglePlayPause = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        if (isPlaying) {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        } else {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.log("Error toggling video:", error);
      }
    }
  };

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        if (isMuted) {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            '*'
          );
        } else {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"mute","args":""}',
            '*'
          );
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.log("Error toggling mute:", error);
      }
    }
  };

  // Parallax effect values
  const titleY = scrollY * 0.2;
  const subtitleY = scrollY * 0.3;

  return (
    <section className="relative w-full overflow-hidden min-h-screen">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full pt-[56.25%]">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/UOxkGD8qRB4?autoplay=1&mute=0&loop=1&playlist=UOxkGD8qRB4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=http://localhost:3000"
            title="Overwatch 2 Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-overwatch-blue-dark/60 mix-blend-multiply"></div>
        
        {/* Video controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button 
            onClick={togglePlayPause}
            className="bg-overwatch-blue-dark/80 hover:bg-overwatch-orange/80 p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
            aria-label={isPlaying ? "Dừng video" : "Phát video"}
            title={isPlaying ? "Dừng video" : "Phát video"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          <button 
            onClick={toggleMute}
            className="bg-overwatch-blue-dark/80 hover:bg-overwatch-orange/80 p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
        
        {/* Overlay geometric shapes - Overwatch style */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-primary-blue/30 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border-2 border-secondary-blue/20 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent-orange/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-screen flex items-center">
        <div 
          className={`valorant-container z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transform: `translateY(${titleY}px)` }}
        >
          <h1 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl mb-4 text-white drop-shadow-lg">
            OVERWATCH <span className="text-primary-blue">WORLD</span>
          </h1>
          <div 
            className="max-w-xl transition-all duration-1000 delay-300"
            style={{ transform: `translateY(${subtitleY}px)` }}
          >
            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
              Tham gia cùng các anh hùng từ khắp nơi trên thế giới. Chiến đấu cho tương lai trong các trận chiến đội hình 5v5 đầy kịch tính.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/game-info" className="overwatch-btn-primary transform hover:scale-105 transition-transform">
                TÌM HIỂU THÊM
              </a>
              <button className="overwatch-btn-secondary transform hover:scale-105 transition-transform">
                CHƠI NGAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-2">CUỘN XUỐNG</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
