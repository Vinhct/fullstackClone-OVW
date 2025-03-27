export type AgentRole = 'Duelist' | 'Sentinel' | 'Controller' | 'Initiator';

export type Ability = {
  name: string;
  key: string; // keyboard key (Q, E, C, X)
  description: string;
  icon?: string;
};

export type Agent = {
  id: string;
  name: string;
  role: AgentRole;
  biography: string;
  abilities: Ability[];
  fullPortrait: string;
  bustPortrait: string;
  background: string;
  backgroundGradient: string[];
  releaseDate?: string;
  origin: string;
  quote?: string;
  developerNotes?: string;
};

export const AGENTS: Agent[] = [
  {
    id: "jett",
    name: "Jett",
    role: "Duelist",
    biography: "Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies up before they even know what hit them.",
    abilities: [
      {
        name: "Updraft",
        key: "Q",
        description: "INSTANTLY propel Jett high into the air."
      },
      {
        name: "Tailwind",
        key: "E",
        description: "INSTANTLY propel Jett in the direction she is moving. If Jett is standing still, she propels forward."
      },
      {
        name: "Cloudburst",
        key: "C",
        description: "INSTANTLY throw a projectile that expands into a brief smoke cloud on impact with a surface. HOLD the ability key to curve the smoke in the direction of your crosshair."
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
    origin: "South Korea",
    quote: "They'll never know what hit them.",
    developerNotes: "Jett is designed to be an aggressive entry fragger with high mobility."
  },
  {
    id: "sage",
    name: "Sage",
    role: "Sentinel",
    biography: "The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.",
    abilities: [
      {
        name: "Slow Orb",
        key: "Q",
        description: "EQUIP a slowing orb. FIRE to throw a slowing orb forward that detonates upon landing, creating a lingering field that slows players caught inside of it."
      },
      {
        name: "Healing Orb",
        key: "E",
        description: "EQUIP a healing orb. FIRE with your crosshairs over a damaged ally to activate a heal-over-time on them. ALT FIRE while Sage is damaged to activate a self heal-over-time."
      },
      {
        name: "Barrier Orb",
        key: "C",
        description: "EQUIP a barrier orb. FIRE places a solid wall. ALT FIRE rotates the targeter."
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
    origin: "China",
    quote: "I am both shield and sword.",
    developerNotes: "Sage is the only agent able to directly heal and resurrect teammates, making her invaluable to any team composition."
  },
  {
    id: "omen",
    name: "Omen",
    role: "Controller",
    biography: "A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to learn where he might strike next.",
    abilities: [
      {
        name: "Paranoia",
        key: "Q",
        description: "INSTANTLY fire a shadow projectile forward, briefly reducing the vision range of all players it touches. This projectile can pass straight through walls."
      },
      {
        name: "Dark Cover",
        key: "E",
        description: "EQUIP a shadow orb and see its range indicator. FIRE to throw the shadow orb to the marked location, creating a long-lasting smoke cloud that blocks vision. HOLD ALTERNATE FIRE to move the marker further away. HOLD the ability key to curve the smoke in the direction of your crosshair."
      },
      {
        name: "Shrouded Step",
        key: "C",
        description: "EQUIP a shadow walk ability and see its range indicator. FIRE to begin a brief channel, then teleport to the marked location."
      },
      {
        name: "From the Shadows",
        key: "X",
        description: "EQUIP a tactical map. FIRE to begin teleporting to the selected location. While teleporting, Omen appears as a Shade that can be destroyed by an enemy to cancel his teleport."
      }
    ],
    fullPortrait: "/images/agents/omen/omen-full.png",
    bustPortrait: "/images/agents/omen/omen-bust.png",
    background: "/images/agents/omen/omen-background.jpg",
    backgroundGradient: ["#5E4C9B", "#2A285D"],
    releaseDate: "Original Release",
    origin: "Unknown",
    quote: "I'm the beginning. I'm the end.",
    developerNotes: "Omen excels at controlling the battlefield with persistent smokes and the ability to reposition unexpectedly."
  },
  {
    id: "reyna",
    name: "Reyna",
    role: "Duelist",
    biography: "Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance.",
    abilities: [
      {
        name: "Devour",
        key: "Q",
        description: "INSTANTLY consume a nearby Soul Orb, rapidly healing for a short duration. Health gained through this skill exceeding 100 will decay over time. If EMPRESS is active, this skill will automatically cast and not consume the Soul Orb."
      },
      {
        name: "Dismiss",
        key: "E",
        description: "INSTANTLY consume a nearby Soul Orb, becoming intangible for a short duration. If EMPRESS is active, also become invisible."
      },
      {
        name: "Leer",
        key: "C",
        description: "EQUIP an ethereal destructible eye. FIRE to cast the eye a short distance forward. The eye will nearsight all enemies who look at it."
      },
      {
        name: "Empress",
        key: "X",
        description: "INSTANTLY enter a frenzy, increasing firing speed, equip and reload speed dramatically. Scoring a kill renews the duration."
      }
    ],
    fullPortrait: "/images/agents/reyna/reyna-full.png",
    bustPortrait: "/images/agents/reyna/reyna-bust.png",
    background: "/images/agents/reyna/reyna-background.jpg",
    backgroundGradient: ["#AD4A76", "#521B3A"],
    releaseDate: "June 2, 2020",
    origin: "Mexico",
    quote: "They will fear, they will cry, they will die!",
    developerNotes: "Reyna is a high-risk, high-reward agent who focuses on getting kills and thriving off of them with her abilities."
  },
  {
    id: "sova",
    name: "Sova",
    role: "Initiator",
    biography: "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide.",
    abilities: [
      {
        name: "Shock Bolt",
        key: "Q",
        description: "EQUIP a bow with a shock bolt. FIRE to send the explosive forward, detonating upon collision and damaging players nearby. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow."
      },
      {
        name: "Recon Bolt",
        key: "E",
        description: "EQUIP a bow with a recon bolt. FIRE to send the recon bolt forward, activating upon collision and revealing the location of nearby enemies caught in the line of sight of the bolt. HOLD FIRE to extend the range of the projectile. ALTERNATE FIRE to add up to two bounces to this arrow."
      },
      {
        name: "Owl Drone",
        key: "C",
        description: "EQUIP an owl drone. FIRE to deploy and take control of movement of the drone. While in control of the drone, FIRE to shoot a marking dart. This dart will reveal the location of any player struck by the dart."
      },
      {
        name: "Hunter's Fury",
        key: "X",
        description: "EQUIP a bow with three long-range wall-piercing energy blasts. FIRE to release an energy blast in a line in front of Sova, dealing damage and revealing the location of enemies caught in the line. This ability can be RE-USED up to two more times while the ability timer is active."
      }
    ],
    fullPortrait: "/images/agents/sova/sova-full.png",
    bustPortrait: "/images/agents/sova/sova-bust.png",
    background: "/images/agents/sova/sova-background.jpg",
    backgroundGradient: ["#327CBA", "#2B4E7B"],
    releaseDate: "Original Release",
    origin: "Russia",
    quote: "I am the hunter.",
    developerNotes: "Sova excels at gathering information and revealing hidden enemies, allowing his team to make informed decisions."
  },
  {
    id: "waylay",
    name: "Waylay",
    role: "Duelist",
    biography: "Trained in the ancient art of light manipulation, Waylay brings a unique set of abilities to bend light and deceive enemies. As a former operative of a covert Thai intelligence agency, she now uses her skills to disrupt and disorient opponents on the battlefield.",
    abilities: [
      {
        name: "Prism Dash",
        key: "Q",
        description: "EQUIP a light prism. FIRE to dash forward, creating a light copy that continues in your original trajectory. HOLD FIRE to adjust dash direction. Copies confuse enemies and deal 30 damage on contact."
      },
      {
        name: "Refraction",
        key: "E",
        description: "EQUIP a light disruptor. FIRE to deploy a disruptor that, when shot, splits into 3 light beams that blind enemies looking at them. The beams last 2 seconds."
      },
      {
        name: "Mirage",
        key: "C",
        description: "EQUIP a hologram projector. FIRE to place a stationary copy of Waylay. ALT FIRE to place a copy that runs forward. Copies will explode when shot or when enemy players move within 2m, dealing 60 damage and creating a flashpoint."
      },
      {
        name: "Spectrum Shift",
        key: "X",
        description: "EQUIP a light manipulator. FIRE to enter an accelerated light state for 8 seconds, becoming partially invisible and gaining increased move speed. Killing an enemy extends duration by 2 seconds. When shooting or using abilities, you briefly become visible."
      }
    ],
    fullPortrait: "/images/agents/waylay/waylay-full.png",
    bustPortrait: "/images/agents/waylay/waylay-bust.png",
    background: "/images/agents/waylay/waylay-background.jpg",
    backgroundGradient: ["#65A8E8", "#27BBA8"],
    releaseDate: "March 5, 2025",
    origin: "Thailand",
    quote: "They'll never see me coming—until it's too late.",
    developerNotes: "Waylay's deceptive abilities allow her to confuse enemies and create tactical advantages that can turn the tide of a round."
  }
];

export const getAgentById = (id: string): Agent | undefined => {
  return AGENTS.find(agent => agent.id === id);
};

export const getAgentsByRole = (role: AgentRole): Agent[] => {
  return AGENTS.filter(agent => agent.role === role);
};

export const getAllAgentIds = (): string[] => {
  return AGENTS.map(agent => agent.id);
};

export function getAllAgents(): Agent[] {
  return AGENTS;
}
