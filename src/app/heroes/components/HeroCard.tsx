import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeroCardProps {
  character: {
    id: string;
    name: string;
    role: string;
    fullPortrait: string;
    difficulty?: 1 | 2 | 3;
    backgroundGradient?: string[];
  };
  roleColor?: string;
}

const HeroCard = ({ character, roleColor: propRoleColor }: HeroCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  // Reset image error state when character changes
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [character.id, character.fullPortrait]);
  
  // Function to fix image path if needed
  const getImagePath = (path: string) => {
    if (!path) {
      return '/images/valorant-hero-bg.jpg';
    }
    
    // Handle special cases for default heroes
    if (character.id === 'jett' || character.id.toLowerCase().includes('jett')) {
      return '/images/agents/jett/jett-full.png';
    }
    
    if (character.id === 'sage' || character.id.toLowerCase().includes('sage')) {
      return '/images/agents/sage/sage-full.png';
    }
    
    if (character.id === 'phoenix' || character.id.toLowerCase().includes('phoenix')) {
      return '/images/valorant-hero-bg.jpg';
    }
    
    if (path.startsWith('http')) {
      return path;
    }
    
    if (path.startsWith('/image/')) {
      const correctedPath = path.replace('/image/', '/images/');
      return correctedPath;
    }
    
    // Fallback for special cases
    if (path.includes('jett')) {
      return '/images/agents/jett/jett-full.png';
    }
    
    if (path.includes('sage')) {
      return '/images/agents/sage/sage-full.png';
    }
    
    return path;
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // Get role color
  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      'Tank': '#3C7DFF',
      'Damage': '#FF5C5C',
      'Support': '#44CC55',
      'Duelist': '#FF9E4C',
      'Sentinel': '#33AACC',
      'Controller': '#8C5EFF',
      'Initiator': '#FFD24C'
    };
    
    return roleColors[role] || '#FF4655';
  };
  
  // Sử dụng roleColor từ props nếu có, nếu không thì tính toán
  const roleColor = propRoleColor || getRoleColor(character.role);
  
  // Generate dynamic gradient
  const gradient = character.backgroundGradient && character.backgroundGradient.length >= 2
    ? `linear-gradient(to bottom, ${character.backgroundGradient[0]}, ${character.backgroundGradient[1]})`
    : `linear-gradient(to bottom, ${roleColor}, #1E1E1E)`;

  return (
    <Link href={`/heroes/${character.id}`} className="group block">
      <div 
        className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        style={{ height: '380px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Background gradient layer */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{ 
            background: gradient,
            opacity: isHovered ? 0.9 : 0.7
          }}
        ></div>
        
        {/* Hero image */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-500">
          <img
            src={imageError ? '/images/valorant-hero-bg.jpg' : getImagePath(character.fullPortrait)}
            alt={character.name || 'Hero portrait'}
            className={`w-full h-full object-cover object-top transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoaded}
            onError={handleImageError}
          />
        </div>
        
        {/* Hero info overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {/* Role badge */}
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 self-start transition-transform duration-300 transform group-hover:translate-y-0"
            style={{ backgroundColor: `${roleColor}33`, border: `1px solid ${roleColor}`, color: 'white' }}
          >
            {character.role}
          </div>
          
          {/* Hero name with glow effect */}
          <h2 
            className="text-2xl font-bold text-white mb-2 transition-all duration-300 group-hover:text-3xl"
            style={{ 
              textShadow: isHovered ? `0 0 10px ${roleColor}, 0 0 20px ${roleColor}50` : 'none'
            }}
          >
            {character.name || 'Unknown Hero'}
          </h2>
          
          {/* Difficulty indicators */}
          {character.difficulty && (
            <div className="flex items-center mb-3">
              <span className="text-xs text-gray-300 mr-2">Difficulty:</span>
              <div className="flex">
                {[1, 2, 3].map((level) => (
                  <div 
                    key={level}
                    className={`w-2 h-2 rounded-full mr-1 transition-all duration-300 ${
                      level <= character.difficulty! 
                        ? `bg-${roleColor} shadow-glow` 
                        : 'bg-gray-600'
                    }`}
                    style={{
                      backgroundColor: level <= character.difficulty! ? roleColor : '#4A4A4A',
                      boxShadow: level <= character.difficulty! && isHovered 
                        ? `0 0 5px ${roleColor}, 0 0 10px ${roleColor}50` 
                        : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom action hint */}
          <div 
            className={`text-xs text-white opacity-0 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Bấm để xem chi tiết
            <div className="h-0.5 bg-white mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
