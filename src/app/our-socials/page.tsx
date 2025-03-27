'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';

type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  url: string;
  username: string;
  followers: string;
  color: string;
  description: string;
};

type SocialPost = {
  id: number;
  platform: string;
  content: string;
  image?: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
};

export default function OurSocials() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialPlatforms: SocialPlatform[] = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
      url: 'https://twitter.com/PlayOverwatch',
      username: '@PlayOverwatch',
      followers: '2.8M',
      color: 'bg-blue-400',
      description: 'Follow us for the latest game updates, event announcements, and community highlights.'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9a4.5 4.5 0 0 0-4.5-4.5h-9A4.5 4.5 0 0 0 3 7.5v9a4.5 4.5 0 0 0 4.5 4.5z',
      url: 'https://www.instagram.com/playoverwatch',
      username: '@playoverwatch',
      followers: '3.1M',
      color: 'bg-pink-500',
      description: 'Check out our Instagram for stunning artwork, behind-the-scenes content, and community creations.'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
      url: 'https://www.facebook.com/PlayOverwatch',
      username: 'PlayOverwatch',
      followers: '2.5M',
      color: 'bg-blue-600',
      description: 'Join our Facebook community for exclusive content, event streams, and to connect with other players.'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02V8.48l5.75 3.27-5.75 3.27z',
      url: 'https://www.youtube.com/channel/UClOf1XXinvZsy4wKPAkro2A',
      username: 'PlayOverwatch',
      followers: '4.2M',
      color: 'bg-red-600',
      description: 'Subscribe to our channel for cinematic shorts, developer updates, and gameplay tutorials.'
    },
    {
      id: 'twitch',
      name: 'Twitch',
      icon: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z',
      url: 'https://www.twitch.tv/playoverwatch',
      username: 'playoverwatch',
      followers: '1.8M',
      color: 'bg-purple-600',
      description: 'Watch live streams of tournaments, special events, and developer Q&A sessions.'
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
      url: 'https://discord.gg/overwatch',
      username: 'Overwatch',
      followers: '850K',
      color: 'bg-indigo-500',
      description: 'Join our Discord server to find teammates, discuss strategies, and participate in community events.'
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'twitter',
      content: 'The Overwatch Anniversary event is now live! Log in to collect exclusive skins and participate in weekly challenges.',
      image: '/images/socials/twitter-post-1.jpg',
      date: '2022-05-24',
      likes: 12500,
      comments: 843,
      shares: 3200
    },
    {
      id: 2,
      platform: 'instagram',
      content: 'Behind the scenes look at the making of our latest cinematic short. #Overwatch #BehindTheScenes',
      image: '/images/socials/instagram-post-1.jpg',
      date: '2022-06-15',
      likes: 45200,
      comments: 1243,
      shares: 892
    },
    {
      id: 3,
      platform: 'facebook',
      content: 'Join us for a developer livestream this Friday at 1 PM PT where we\'ll discuss upcoming balance changes and answer your questions!',
      image: '/images/socials/facebook-post-1.jpg',
      date: '2022-07-02',
      likes: 8700,
      comments: 2100,
      shares: 1500
    },
    {
      id: 4,
      platform: 'youtube',
      content: 'New hero spotlight: Learn about Echo\'s abilities and backstory in our latest video.',
      image: '/images/socials/youtube-post-1.jpg',
      date: '2022-07-18',
      likes: 65400,
      comments: 4200,
      shares: 7800
    },
    {
      id: 5,
      platform: 'twitch',
      content: 'The Overwatch League Grand Finals are this weekend! Tune in to see who will be crowned champion.',
      image: '/images/socials/twitch-post-1.jpg',
      date: '2022-08-05',
      likes: 9300,
      comments: 1700,
      shares: 2400
    },
    {
      id: 6,
      platform: 'discord',
      content: 'Join our community tournament this Saturday! Sign up with your team or as a solo player looking for a group.',
      image: '/images/socials/discord-post-1.jpg',
      date: '2022-08-22',
      likes: 3200,
      comments: 980,
      shares: 450
    }
  ];

  // Filter posts based on active tab
  const filteredPosts = activeTab === 'all' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === activeTab);

  // Format number with K/M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden h-[50vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src="/images/socials/socials-banner.jpg" 
            alt="Social Media Banner" 
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
              OUR <span className="text-primary-blue">SOCIALS</span>
            </h1>
            <div className="max-w-xl transition-all duration-1000 delay-300">
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Connect with us and join the Overwatch community across all social platforms
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

      {/* Social Platforms */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Follow Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform, index) => (
              <motion.a 
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-lg overflow-hidden group"
              >
                <div className={`h-2 ${platform.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center mr-4`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={platform.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                      <p className="text-gray-400 text-sm">{platform.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{platform.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{platform.followers} followers</span>
                    <span className="text-primary-blue group-hover:text-white transition-colors text-sm font-bold flex items-center">
                      FOLLOW
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="py-16 bg-gray-800">
        <div className="valorant-container">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Latest Updates</h2>
          <p className="text-gray-400 text-center mb-12">Stay up to date with our latest posts and announcements</p>
          
          {/* Platform Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'all' 
                  ? 'bg-primary-blue text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Platforms
            </button>
            {socialPlatforms.map(platform => (
              <button 
                key={platform.id}
                onClick={() => setActiveTab(platform.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === platform.id 
                    ? `${platform.color} text-white` 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
          
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => {
              const platform = socialPlatforms.find(p => p.id === post.platform);
              
              return (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-700 rounded-lg overflow-hidden"
                >
                  {post.image && (
                    <div className="relative h-48">
                      <Image 
                        src={post.image} 
                        alt={`${platform?.name} post`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full ${platform?.color} flex items-center justify-center mr-3`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={platform?.icon || ''} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{platform?.name}</h3>
                        <p className="text-gray-400 text-xs">{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>{formatNumber(post.likes)} likes</span>
                      <span>{formatNumber(post.comments)} comments</span>
                      <span>{formatNumber(post.shares)} shares</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Community Spotlight</h2>
          <p className="text-gray-400 text-center mb-12">Highlighting amazing content from our community</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-72">
                <Image 
                  src="/images/socials/community-1.jpg" 
                  alt="Community Artwork" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Fan Art Showcase</h3>
                <p className="text-gray-300 mb-4">
                  Check out this incredible artwork created by our talented community members. From digital paintings to 3D models, our fans continue to amaze us with their creativity.
                </p>
                <a 
                  href="#" 
                  className="text-primary-blue hover:text-white transition-colors flex items-center font-bold"
                >
                  VIEW GALLERY
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-72">
                <Image 
                  src="/images/socials/community-2.jpg" 
                  alt="Community Cosplay" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Cosplay Highlights</h3>
                <p className="text-gray-300 mb-4">
                  Our community brings Overwatch heroes to life through incredible cosplay creations. See the latest costumes, props, and transformations from dedicated fans around the world.
                </p>
                <a 
                  href="#" 
                  className="text-primary-blue hover:text-white transition-colors flex items-center font-bold"
                >
                  VIEW COSPLAYS
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-blue/20">
        <div className="valorant-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive the latest news, updates, and exclusive content directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <button className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-3 px-6 rounded-md transition-colors">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              By subscribing, you agree to receive marketing emails from Overwatch. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}
