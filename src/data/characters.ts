export type CharacterRole = 'Tank' | 'Damage' | 'Support' | 'Duelist' | 'Sentinel' | 'Controller' | 'Initiator';

export type Ability = {
  name: string;
  key: string; // keyboard key (Q, E, SHIFT, ULTIMATE)
  description: string;
  icon?: string;
  cooldown?: number; // Thêm thuộc tính cooldown cho khả năng
  damage?: number;
  duration?: number;
  video?: string;
};

export type Character = {
  id: string;
  name: string;
  role: CharacterRole;
  origin: string;
  biography: string;
  abilities: Ability[];
  bustPortrait: string;
  fullPortrait: string;
  background?: string;
  backgroundGradient: string[];
  difficulty?: 1 | 2 | 3; // 1 = Easy, 2 = Medium, 3 = Hard
  releaseDate?: string;
  age?: number; // Thêm thuộc tính tuổi
  cooldown?: number;
  developerNotes?: string;
  health?: number;
  armor?: number;
  shield?: number;
  quote?: string;
  roleIcon?: string;
  abilityIcons?: {
    [key: string]: string;
  };
  sectionThumbnails?: {
    [key: string]: string;
  };
};

export const CHARACTERS: Character[] = [
  // Agents from Valorant
  {
    id: "jett",
    name: "Jett",
    role: "Duelist",
    difficulty: 3,
    origin: "South Korea",
    biography: "Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies up before they even know what hit them.",
    abilities: [
      {
        name: "Updraft",
        key: "Q",
        description: "INSTANTLY propel Jett high into the air.",
        cooldown: 7
      },
      {
        name: "Tailwind",
        key: "E",
        description: "INSTANTLY propel Jett in the direction she is moving. If Jett is standing still, she propels forward.",
        cooldown: 12
      },
      {
        name: "Cloudburst",
        key: "C",
        description: "INSTANTLY throw a projectile that expands into a brief smoke cloud on impact with a surface. HOLD the ability key to curve the smoke in the direction of your crosshair.",
        cooldown: 35
      },
      {
        name: "Blade Storm",
        key: "X",
        description: "EQUIP a set of highly accurate throwing knives. FIRE to throw a single knife and recharge knives on a kill. ALTERNATE FIRE to throw all remaining daggers but does not recharge on a kill."
      }
    ],
    fullPortrait: "/images/agents/jett/jett-full.png",
    bustPortrait: "/images/agents/jett/jett-bust.png",
    background: "/images/agents/jett/jett-background.jpg",
    backgroundGradient: ["#5ACEAE", "#7A95E1"],
    releaseDate: "Original Release",
    quote: "They'll never know what hit them.",
    developerNotes: "Jett is designed to be an aggressive entry fragger with high mobility.",
    age: 25
  },
  {
    id: "sage",
    name: "Sage",
    role: "Sentinel",
    difficulty: 3,
    origin: "China",
    biography: "The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.",
    abilities: [
      {
        name: "Slow Orb",
        key: "Q",
        description: "EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, creating a lingering field that slows players caught inside of it.",
        cooldown: 30
      },
      {
        name: "Healing Orb",
        key: "E",
        description: "EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them. ALT FIRE while Sage is damaged to activate a self heal-over-time.",
        cooldown: 45
      },
      {
        name: "Barrier Orb",
        key: "C",
        description: "EQUIP a barrier orb. FIRE places a solid wall. ALT FIRE rotates the targeter.",
        cooldown: 40
      },
      {
        name: "Resurrection",
        key: "X",
        description: "EQUIP a resurrection ability. FIRE with your crosshairs placed over a dead ally to begin resurrecting them. After a brief channel, the ally will be brought back to life with full health."
      }
    ],
    fullPortrait: "/images/agents/sage/sage-full.png",
    bustPortrait: "/images/agents/sage/sage-bust.png",
    background: "/images/agents/sage/sage-background.jpg",
    backgroundGradient: ["#33AACC", "#5580E7"],
    releaseDate: "Original Release",
    quote: "I am both shield and sword.",
    developerNotes: "Sage is the only agent able to directly heal and resurrect teammates, making her invaluable to any team composition.",
    age: 30
  },
  // Heroes from Overwatch
  {
    id: "tracer",
    name: "Tracer",
    role: "Damage",
    difficulty: 2,
    origin: "London, England",
    biography: "Tearing through time and space, Tracer is a former Overwatch agent and adventurer. With the power to control her own time, she's a speedy offensive hero who can blink across battlefields and rewind to her previous position.",
    abilities: [
      {
        name: "Pulse Pistols",
        key: "PRIMARY",
        description: "Rapid-fire dual pistols with short range but high damage potential.",
        video: "/videos/heroes/tracer/pulse-pistols.mp4"
      },
      {
        name: "Blink",
        key: "SHIFT",
        description: "Teleport a short distance in the direction you're moving. Can store up to three charges.",
        video: "/videos/heroes/tracer/blink.mp4",
        cooldown: 3
      },
      {
        name: "Recall",
        key: "E",
        description: "Travel back in time to your position and health 3 seconds ago.",
        video: "/videos/heroes/tracer/recall.mp4",
        cooldown: 12
      },
      {
        name: "Pulse Bomb",
        key: "Q",
        description: "Throw a powerful sticky explosive that attaches to enemies and surfaces, exploding after a short delay.",
        video: "/videos/heroes/tracer/pulse-bomb.mp4"
      }
    ],
    fullPortrait: "/images/heroes/tracer/tracer-full.png",
    bustPortrait: "/images/heroes/tracer/tracer-bust.png",
    background: "/images/heroes/tracer/tracer-background.jpg",
    backgroundGradient: ["#FF9E4C", "#FF5A5A"],
    releaseDate: "Original Release",
    quote: "Cheers, love! The cavalry's here!",
    health: 150,
    age: 26
  },
  {
    id: "reinhardt",
    name: "Reinhardt",
    role: "Tank",
    difficulty: 1,
    origin: "Stuttgart, Germany",
    biography: "Reinhardt Wilhelm is a decorated Overwatch veteran and a steadfast champion of justice. With his Rocket Hammer and Barrier Field, he protects his allies and leads the charge into battle.",
    abilities: [
      {
        name: "Rocket Hammer",
        key: "PRIMARY",
        description: "A massive hammer that deals significant damage in a wide arc with each swing.",
        video: "/videos/heroes/reinhardt/rocket-hammer.mp4"
      },
      {
        name: "Barrier Field",
        key: "RIGHT CLICK",
        description: "Deploy a wide energy barrier that blocks enemy attacks.",
        video: "/videos/heroes/reinhardt/barrier-field.mp4",
        cooldown: 5
      },
      {
        name: "Charge",
        key: "SHIFT",
        description: "Rocket forward to pin an enemy against a wall, dealing massive damage.",
        video: "/videos/heroes/reinhardt/charge.mp4",
        cooldown: 10
      },
      {
        name: "Fire Strike",
        key: "E",
        description: "Launch a fiery projectile that pierces through enemies and barriers.",
        video: "/videos/heroes/reinhardt/fire-strike.mp4",
        cooldown: 6
      },
      {
        name: "Earthshatter",
        key: "Q",
        description: "Slam the ground to knock down all enemies in front of you.",
        video: "/videos/heroes/reinhardt/earthshatter.mp4"
      }
    ],
    fullPortrait: "/images/heroes/reinhardt/reinhardt-full.png",
    bustPortrait: "/images/heroes/reinhardt/reinhardt-bust.png",
    background: "/images/heroes/reinhardt/reinhardt-background.jpg",
    backgroundGradient: ["#7D7D7D", "#3C3C3C"],
    releaseDate: "Original Release",
    quote: "Honor and glory!",
    health: 300,
    armor: 225,
    age: 61
  }
];

// Utility functions for accessing character data
export const charactersApi = {
  getCharacterById: (id: string): Character | undefined => {
    return CHARACTERS.find(character => character.id === id);
  },
  
  getCharacterByIdIgnoreCase: (id: string): Character | undefined => {
    const lowercaseId = id.toLowerCase();
    return CHARACTERS.find(character => character.id.toLowerCase() === lowercaseId);
  },
  
  getCharactersByRole: (role: CharacterRole): Character[] => {
    return CHARACTERS.filter(character => character.role === role);
  },
  
  getAllCharacterIds: (): string[] => {
    return CHARACTERS.map(character => character.id);
  },
  
  getAllCharacters: (): Character[] => {
    return CHARACTERS;
  }
};
