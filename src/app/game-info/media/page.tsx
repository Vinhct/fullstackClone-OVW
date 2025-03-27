'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';

// Define media item types
type MediaItem = {
  id: number;
  title: string;
  type: 'video' | 'screenshot' | 'artwork';
  thumbnailSrc: string;
  fullSrc?: string;
  videoUrl?: string;
  description: string;
  date: string;
};

export default function GameInfoMedia() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Media items data
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: "Overwatch 2 Announcement Cinematic",
      type: "video",
      thumbnailSrc: "/images/media/video-1-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/GKXS_YA9s7E",
      description: "The official announcement cinematic for Overwatch 2, featuring our heroes reuniting to face a new threat.",
      date: "2021-11-05"
    },
    {
      id: 2,
      title: "Hanamura Map Showcase",
      type: "video",
      thumbnailSrc: "/images/media/video-2-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/oJ09xdxzIJQ",
      description: "A detailed tour of the Hanamura map, showcasing its unique features and strategic points.",
      date: "2022-02-15"
    },
    {
      id: 3,
      title: "New Hero: Echo Reveal",
      type: "video",
      thumbnailSrc: "/images/media/video-3-thumb.jpg",
      videoUrl: "https://www.youtube.com/embed/WeKUX6a5Nws",
      description: "Introducing Echo, the evolutionary robot programmed with a rapidly adapting artificial intelligence.",
      date: "2022-04-10"
    },
    {
      id: 4,
      title: "King's Row Battle",
      type: "screenshot",
      thumbnailSrc: "/images/media/screenshot-1-thumb.jpg",
      fullSrc: "/images/media/screenshot-1.jpg",
      description: "An intense team fight on King's Row with ultimates being exchanged.",
      date: "2022-05-20"
    },
    {
      id: 5,
      title: "Payload Escort on Route 66",
      type: "screenshot",
      thumbnailSrc: "/images/media/screenshot-2-thumb.jpg",
      fullSrc: "/images/media/screenshot-2.jpg",
      description: "The team works together to escort the payload through Route 66.",
      date: "2022-06-12"
    },
    {
      id: 6,
      title: "Tracer vs Widowmaker",
      type: "screenshot",
      thumbnailSrc: "/images/media/screenshot-3-thumb.jpg",
      fullSrc: "/images/media/screenshot-3.jpg",
      description: "A close encounter between Tracer and Widowmaker on Ilios.",
      date: "2022-07-08"
    },
    {
      id: 7,
      title: "Heroes Never Die",
      type: "artwork",
      thumbnailSrc: "/images/media/artwork-1-thumb.jpg",
      fullSrc: "/images/media/artwork-1.jpg",
      description: "Official artwork featuring Mercy using her ultimate ability to resurrect fallen teammates.",
      date: "2022-08-15"
    },
    {
      id: 8,
      title: "Overwatch Anniversary",
      type: "artwork",
      thumbnailSrc: "/images/media/artwork-2-thumb.jpg",
      fullSrc: "/images/media/artwork-2.jpg",
      description: "Commemorative artwork celebrating the anniversary of Overwatch's release.",
      date: "2022-09-22"
    },
    {
      id: 9,
      title: "Heroes Assembled",
      type: "artwork",
      thumbnailSrc: "/images/media/artwork-3-thumb.jpg",
      fullSrc: "/images/media/artwork-3.jpg",
      description: "The complete roster of Overwatch heroes gathered together.",
      date: "2022-10-30"
    }
  ];

  // Filter media items based on active filter
  const filteredMedia = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.type === activeFilter);

  // Handle media item click
  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close media modal
  const closeModal = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden h-[50vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src="/images/game-info/media-banner.jpg" 
            alt="Media Banner" 
            fill 
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          
          {/* Overlay geometric shapes - Overwatch style */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-primary-blue/30 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border-2 border-secondary-blue/20 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent-orange/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div 
            className="valorant-container z-10 transition-all duration-1000"
            style={{paddingTop: '80px'}}
          >
            <h1 className="overwatch-heading text-5xl md:text-6xl lg:text-7xl mb-4 text-white drop-shadow-lg">
              MEDIA <span className="text-primary-blue">GALLERY</span>
            </h1>
            <div className="max-w-xl transition-all duration-1000 delay-300">
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Explore videos, screenshots, and artwork from the world of Overwatch
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-white text-sm mb-2">SCROLL DOWN</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Media Filter */}
      <section className="bg-gray-800 sticky top-[80px] z-40 border-b border-gray-700">
        <div className="valorant-container py-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-primary-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Media
            </button>
            <button 
              onClick={() => setActiveFilter('video')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'video' 
                  ? 'bg-primary-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Videos
            </button>
            <button 
              onClick={() => setActiveFilter('screenshot')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'screenshot' 
                  ? 'bg-primary-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Screenshots
            </button>
            <button 
              onClick={() => setActiveFilter('artwork')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'artwork' 
                  ? 'bg-primary-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Artwork
            </button>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleMediaClick(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={item.thumbnailSrc} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                      item.type === 'video' ? 'bg-red-500/80' : 
                      item.type === 'screenshot' ? 'bg-green-500/80' : 
                      'bg-purple-500/80'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-gray-500 text-xs">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl text-white font-bold mb-2">No media found</h3>
              <p className="text-gray-400 text-center max-w-md">
                We couldn't find any media matching your current filter. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="absolute inset-0" onClick={closeModal}></div>
          <div className="relative bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] z-10">
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={closeModal}
                className="bg-gray-900/80 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Media Content */}
              <div className="relative w-full">
                {selectedMedia.type === 'video' ? (
                  <div className="relative pt-[56.25%]">
                    <iframe 
                      src={selectedMedia.videoUrl} 
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      title={selectedMedia.title}
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative pt-[56.25%]">
                    <Image 
                      src={selectedMedia.fullSrc || selectedMedia.thumbnailSrc} 
                      alt={selectedMedia.title} 
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              
              {/* Media Info */}
              <div className="p-6">
                <h2 className="text-2xl text-white font-bold mb-2">{selectedMedia.title}</h2>
                <p className="text-gray-400 mb-4">{selectedMedia.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`mr-4 px-2 py-1 rounded ${
                    selectedMedia.type === 'video' ? 'bg-red-500/20 text-red-400' : 
                    selectedMedia.type === 'screenshot' ? 'bg-green-500/20 text-green-400' : 
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {selectedMedia.type.toUpperCase()}
                  </span>
                  <span>{new Date(selectedMedia.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}
