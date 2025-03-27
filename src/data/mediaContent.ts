export type MediaContentType = 'wallpaper' | 'screenshot' | 'artwork' | 'video' | 'gif' | 'concept';
export type MediaAgent = 'jett' | 'sage' | 'omen' | 'reyna' | 'sova' | 'waylay' | 'all';
export type MediaMap = 'haven' | 'bind' | 'split' | 'ascent' | 'icebox' | 'breeze' | 'fracture' | 'pearl' | 'lotus' | 'all';

export type MediaItem = {
  id: string;
  title: string;
  date: string;
  type: MediaContentType;
  imageSrc: string;
  downloadLink: string;
  agent?: MediaAgent;
  map?: MediaMap;
  description?: string;
  category?: string;
};

export const MEDIA_CONTENT: MediaItem[] = [
  {
    id: "episode8-act1-wallpaper",
    title: "Episode 8 Act I Wallpapers",
    date: "5/31/2024",
    type: "wallpaper",
    imageSrc: "/images/media/episode8-act1.jpg",
    downloadLink: "https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/1371084d631d25722a1e4b8d5df41d2ac6a70443.zip",
    category: "Episode"
  },
  {
    id: "clove-artwork",
    title: "Agent Clove Official Artwork",
    date: "5/31/2024",
    type: "artwork",
    imageSrc: "/images/media/clove-agent.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "all",
    category: "Agent"
  },
  {
    id: "tejo-wallpaper",
    title: "Tejo Agent Wallpaper",
    date: "5/31/2024",
    type: "wallpaper",
    imageSrc: "/images/media/tejo-agent.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "all",
    category: "Agent"
  },
  {
    id: "valorant-gameplay-screenshots",
    title: "Valorant Gameplay Screenshots",
    date: "5/31/2024",
    type: "screenshot",
    imageSrc: "/images/media/valorant-gameplay.jpg",
    downloadLink: "https://playvalorant.com/",
    map: "ascent",
    category: "Gameplay"
  },
  {
    id: "agents-roster-art",
    title: "Agents Roster Art",
    date: "5/31/2024",
    type: "artwork",
    imageSrc: "/images/media/agents-collage.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "all",
    category: "Agent"
  },
  {
    id: "vct-ascension-wallpaper",
    title: "VCT Ascension Wallpaper",
    date: "5/31/2024",
    type: "wallpaper",
    imageSrc: "/images/media/vct-ascension.jpg",
    downloadLink: "https://playvalorant.com/",
    category: "Esports"
  },
  {
    id: "state-of-agents-artwork",
    title: "State of the Agents - March 2024",
    date: "5/31/2024",
    type: "artwork",
    imageSrc: "/images/media/state-of-agents.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "all",
    category: "Development"
  },
  {
    id: "jett-agent-wallpaper",
    title: "Jett Agent Wallpaper",
    date: "5/31/2024",
    type: "wallpaper",
    imageSrc: "/images/media/jett-wallpaper.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "jett",
    category: "Agent"
  },
  {
    id: "agents-day-off-artwork",
    title: "Agents Day Off Artwork",
    date: "5/31/2024",
    type: "artwork",
    imageSrc: "/images/media/agents-day-off.jpg",
    downloadLink: "https://playvalorant.com/",
    agent: "all",
    category: "Community"
  },
  {
    id: "jett-gameplay-highlight",
    title: "Jett Gameplay Highlights",
    date: "5/15/2024",
    type: "video",
    imageSrc: "/images/media/jett-wallpaper.jpg", // Reusing image as thumbnail
    downloadLink: "https://www.youtube.com/watch?v=mNWQ4Jv9xgI",
    agent: "jett",
    category: "Gameplay"
  },
  {
    id: "sage-healing-gif",
    title: "Sage Healing Animation",
    date: "5/10/2024",
    type: "gif",
    imageSrc: "/images/agents/sage/sage-background.jpg", // Reusing image as thumbnail
    downloadLink: "https://playvalorant.com/",
    agent: "sage",
    category: "Ability"
  },
  {
    id: "haven-map-concept",
    title: "Haven Map Concept Art",
    date: "5/5/2024",
    type: "concept",
    imageSrc: "/images/media/valorant-gameplay.jpg", // Reusing image
    downloadLink: "https://playvalorant.com/",
    map: "haven",
    category: "Map"
  },
  {
    id: "ascent-map-callouts",
    title: "Ascent Map Callouts Guide",
    date: "4/28/2024",
    type: "screenshot",
    imageSrc: "/images/media/valorant-gameplay.jpg", // Reusing image
    downloadLink: "https://playvalorant.com/",
    map: "ascent",
    category: "Map"
  },
  {
    id: "reyna-abilities-showcase",
    title: "Reyna Abilities Showcase",
    date: "4/20/2024",
    type: "video",
    imageSrc: "/images/agents/reyna/reyna-background.jpg", // Placeholder
    downloadLink: "https://www.youtube.com/watch?v=C-xpl7z7uOA",
    agent: "reyna",
    category: "Agent"
  },
  {
    id: "omen-teleport-spots",
    title: "Omen Teleport Spots - Bind",
    date: "4/15/2024",
    type: "screenshot",
    imageSrc: "/images/agents/omen/omen-background.jpg", // Placeholder
    downloadLink: "https://playvalorant.com/",
    agent: "omen",
    map: "bind",
    category: "Gameplay Tips"
  }
];

export const getMediaItemById = (id: string): MediaItem | undefined => {
  return MEDIA_CONTENT.find(item => item.id === id);
};

export const getMediaItemsByType = (type: MediaContentType): MediaItem[] => {
  return MEDIA_CONTENT.filter(item => item.type === type);
};

export const getMediaItemsByAgent = (agent: MediaAgent): MediaItem[] => {
  return MEDIA_CONTENT.filter(item => item.agent === agent || item.agent === 'all');
};

export const getMediaItemsByMap = (map: MediaMap): MediaItem[] => {
  return MEDIA_CONTENT.filter(item => item.map === map);
};

export const getMediaItemsByCategory = (category: string): MediaItem[] => {
  return MEDIA_CONTENT.filter(item => item.category === category);
};

export const getAllMediaTypes = (): MediaContentType[] => {
  return Array.from(new Set(MEDIA_CONTENT.map(item => item.type)));
};

export const getAllAgents = (): MediaAgent[] => {
  return Array.from(new Set(MEDIA_CONTENT.map(item => item.agent).filter(Boolean) as MediaAgent[]));
};

export const getAllMaps = (): MediaMap[] => {
  return Array.from(new Set(MEDIA_CONTENT.map(item => item.map).filter(Boolean) as MediaMap[]));
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(MEDIA_CONTENT.map(item => item.category).filter(Boolean) as string[]));
};
