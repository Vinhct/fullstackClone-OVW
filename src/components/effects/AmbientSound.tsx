"use client";

import React, { useState, useEffect, useRef } from 'react';

interface AmbientSoundProps {
  volume?: number; // 0-1
  autoplay?: boolean;
  loop?: boolean;
  sounds?: {
    src: string;
    weight?: number; // Trọng số để xác định tần suất phát (mặc định: 1)
  }[];
  minDelay?: number; // Thời gian tối thiểu giữa các âm thanh (ms)
  maxDelay?: number; // Thời gian tối đa giữa các âm thanh (ms)
  backgroundMusic?: string; // Nhạc nền liên tục
  backgroundVolume?: number; // Âm lượng nhạc nền (0-1)
}

const AmbientSound: React.FC<AmbientSoundProps> = ({
  volume = 0.3,
  autoplay = true,
  loop = true,
  sounds = [
    { src: '/sounds/ambient/wind.mp3', weight: 3 },
    { src: '/sounds/ambient/distant_shots.mp3', weight: 2 },
    { src: '/sounds/ambient/footsteps.mp3', weight: 1 },
  ],
  minDelay = 5000,
  maxDelay = 15000,
  backgroundMusic = '/sounds/ambient/background_muisic.mp3',
  backgroundVolume = 0.1,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Khởi tạo và quản lý âm thanh nền
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log("AmbientSound component mounted");
    console.log("Background music path:", backgroundMusic);

    // Tạo audio elements cho âm thanh ngẫu nhiên
    audioRefs.current = sounds.map(() => new Audio());
    
    // Tạo audio element cho nhạc nền
    if (backgroundMusic) {
      bgMusicRef.current = new Audio(backgroundMusic);
      bgMusicRef.current.loop = loop;
      bgMusicRef.current.volume = backgroundVolume;
      
      // Thêm event listener để debug
      bgMusicRef.current.addEventListener('canplaythrough', () => {
        console.log('Background music loaded successfully');
      });
      
      bgMusicRef.current.addEventListener('error', (e) => {
        console.error('Error loading background music:', e);
        setAudioError(`Không thể tải file nhạc nền: ${backgroundMusic}`);
      });
      
      if (autoplay && !isMuted) {
        console.log("Attempting to autoplay background music");
        bgMusicRef.current.play().then(() => {
          console.log("Background music playing successfully");
          setUserInteracted(true);
        }).catch(error => {
          console.warn('Autoplay prevented:', error);
          // Không hiển thị thông báo lỗi ngay lập tức, chờ người dùng tương tác
        });
      }
    }
    
    // Bắt đầu phát âm thanh ngẫu nhiên nếu autoplay = true
    if (autoplay && !isMuted) {
      playRandomSound();
    }
    
    // Thêm event listener cho tương tác người dùng để bật âm thanh
    const handleUserInteraction = () => {
      if (userInteracted) return;
      
      setUserInteracted(true);
      
      if (bgMusicRef.current && isPlaying && !isMuted) {
        console.log("User interaction detected, playing audio");
        bgMusicRef.current.play().then(() => {
          setAudioError(null);
          
          // Hiển thị thông báo nhỏ khi âm thanh bắt đầu phát
          const notification = document.createElement('div');
          notification.className = 'fixed bottom-20 right-4 bg-black/70 text-white text-sm p-2 rounded-md z-50 animate-fade-out';
          notification.textContent = 'Âm thanh đã được bật';
          notification.style.animation = 'fadeOut 2s forwards';
          document.body.appendChild(notification);
          
          // Thêm style cho animation
          const style = document.createElement('style');
          style.textContent = `
            @keyframes fadeOut {
              0% { opacity: 1; }
              70% { opacity: 1; }
              100% { opacity: 0; }
            }
            .animate-fade-out {
              animation: fadeOut 2s forwards;
            }
          `;
          document.head.appendChild(style);
          
          // Xóa thông báo sau 2 giây
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
          
          // Hiển thị controls trong 5 giây sau khi bật âm thanh
          setShowControls(true);
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
          controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
          }, 5000);
        }).catch(e => {
          console.error("Still couldn't play audio:", e);
        });
      }
    };
    
    // Thêm sự kiện cho tất cả các tương tác người dùng
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);
    
    // Hiển thị/ẩn controls khi di chuột vào vùng controls
    const handleMouseEnter = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = null;
      }
    };
    
    const handleMouseLeave = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    };
    
    // Thêm event listener cho vùng controls
    const controlsArea = document.createElement('div');
    controlsArea.className = 'fixed bottom-0 right-0 w-20 h-20 z-40';
    controlsArea.addEventListener('mouseenter', handleMouseEnter);
    controlsArea.addEventListener('mouseleave', handleMouseLeave);
    document.body.appendChild(controlsArea);
    
    return () => {
      // Dọn dẹp khi component unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.src = '';
      }
      
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
      
      if (document.body.contains(controlsArea)) {
        document.body.removeChild(controlsArea);
      }
      
      console.log("AmbientSound component unmounted");
    };
  }, []);
  
  // Cập nhật trạng thái khi các props thay đổi
  useEffect(() => {
    if (!bgMusicRef.current) return;
    
    bgMusicRef.current.volume = isMuted ? 0 : backgroundVolume;
    
    if (isPlaying && !isMuted && userInteracted) {
      bgMusicRef.current.play().then(() => {
        setAudioError(null);
      }).catch(error => {
        console.warn('Play prevented:', error);
        setAudioError("Trình duyệt chặn phát nhạc. Vui lòng nhấn nút play để nghe nhạc.");
      });
    } else if (!isPlaying || isMuted) {
      bgMusicRef.current.pause();
    }
  }, [isPlaying, isMuted, backgroundVolume, userInteracted]);
  
  // Hiển thị/ẩn controls khi di chuột
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bottomRight = e.clientX > window.innerWidth - 100 && e.clientY > window.innerHeight - 100;
      
      if (bottomRight) {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
          controlsTimeoutRef.current = null;
        }
      } else if (showControls && !controlsTimeoutRef.current) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 2000);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showControls]);
  
  // Hàm phát một âm thanh ngẫu nhiên
  const playRandomSound = () => {
    if (isMuted || !isPlaying || sounds.length === 0 || !userInteracted) return;
    
    console.log("Attempting to play random ambient sound");
    
    // Tính tổng trọng số
    const totalWeight = sounds.reduce((sum, sound) => sum + (sound.weight || 1), 0);
    
    // Chọn âm thanh ngẫu nhiên dựa trên trọng số
    let randomValue = Math.random() * totalWeight;
    let selectedIndex = 0;
    
    for (let i = 0; i < sounds.length; i++) {
      randomValue -= (sounds[i].weight || 1);
      if (randomValue <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    // Phát âm thanh đã chọn
    const audio = audioRefs.current[selectedIndex];
    audio.src = sounds[selectedIndex].src;
    audio.volume = isMuted ? 0 : volume;
    
    audio.addEventListener('error', (e) => {
      console.error(`Error loading sound: ${sounds[selectedIndex].src}`, e);
    });
    
    audio.play().then(() => {
      console.log(`Playing ambient sound: ${sounds[selectedIndex].src}`);
    }).catch(error => {
      console.warn('Play prevented:', error);
    });
    
    // Lên lịch phát âm thanh tiếp theo
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    timeoutRef.current = setTimeout(playRandomSound, delay);
  };
  
  // Hàm bật/tắt âm thanh
  const toggleMute = () => {
    setIsMuted(prev => !prev);
    
    // Cập nhật âm lượng cho tất cả các audio elements
    audioRefs.current.forEach(audio => {
      audio.volume = isMuted ? volume : 0;
    });
    
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = isMuted ? backgroundVolume : 0;
    }
    
    // Hiển thị controls trong 2 giây sau khi thay đổi
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };
  
  // Hàm bật/tắt phát nhạc
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    
    if (!isPlaying) {
      // Nếu đang tắt và chuyển sang bật
      if (bgMusicRef.current && !isMuted) {
        bgMusicRef.current.play().then(() => {
          setAudioError(null);
          setUserInteracted(true);
          console.log("Background music playing after user interaction");
        }).catch(error => {
          console.warn('Play prevented:', error);
          setAudioError("Không thể phát nhạc. Vui lòng thử lại.");
        });
      }
      
      playRandomSound();
    } else {
      // Nếu đang bật và chuyển sang tắt
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      
      audioRefs.current.forEach(audio => {
        audio.pause();
      });
    }
    
    // Hiển thị controls trong 2 giây sau khi thay đổi
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      {audioError && (
        <div className="bg-black/70 text-white text-sm p-2 rounded-md mb-2 max-w-xs">
          {audioError}
        </div>
      )}
      
      <div className="flex gap-2">
        <button 
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
          )}
        </button>
        
        <button 
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
              <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default AmbientSound;
