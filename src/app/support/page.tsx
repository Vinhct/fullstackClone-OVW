'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';

type FAQItem = {
  question: string;
  answer: string;
};

type SupportCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

export default function Support() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const supportCategories: SupportCategory[] = [
    {
      id: 'general',
      title: 'General Support',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      description: 'Get help with general questions about Overwatch, account issues, and more.'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.107-.397.165-.71.505-.78.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z',
      description: 'Resolve technical issues, including game crashes, performance problems, and hardware compatibility.'
    },
    {
      id: 'billing',
      title: 'Billing & Purchases',
      icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5z',
      description: 'Get assistance with purchases, refunds, and subscription management.'
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z',
      description: 'Manage your Battle.net account, including password resets, account recovery, and security features.'
    },
    {
      id: 'reporting',
      title: 'Reporting & Feedback',
      icon: 'M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5',
      description: 'Report players, provide feedback, or report bugs and other issues.'
    }
  ];

  const faqItems: Record<string, FAQItem[]> = {
    general: [
      {
        question: 'What is Overwatch?',
        answer: 'Overwatch is a team-based multiplayer first-person shooter developed and published by Blizzard Entertainment. The game features various heroes with unique abilities, and players work together to secure and defend control points or escort payloads across the map.'
      },
      {
        question: 'How do I create a Battle.net account?',
        answer: 'To create a Battle.net account, visit the official Battle.net website and click on "Create a Free Account." Follow the instructions to provide your email, create a password, and set up your account details.'
      },
      {
        question: 'Is Overwatch free to play?',
        answer: 'Overwatch 2 is free to play, while the original Overwatch was a paid game. Overwatch 2 offers a free-to-play model with optional in-game purchases for cosmetic items and a premium Battle Pass.'
      },
      {
        question: 'What are the system requirements for Overwatch?',
        answer: 'For Overwatch 2, the minimum requirements include: Windows 10 64-bit, Intel Core i3 or AMD Phenom X3 8650, NVIDIA GeForce GTX 600 series or AMD Radeon HD 7000 series, 6GB RAM, and 50GB available hard drive space. Recommended specifications are higher for optimal performance.'
      },
      {
        question: 'How do I link my console account to Battle.net?',
        answer: 'To link your console account, log into your Battle.net account on the web, go to Account Settings > Connections, and follow the instructions to connect your PlayStation, Xbox, or Nintendo Switch account.'
      }
    ],
    technical: [
      {
        question: 'Why is my game crashing?',
        answer: 'Game crashes can be caused by outdated drivers, incompatible hardware, corrupted game files, or software conflicts. Try updating your graphics drivers, verifying game files through the Battle.net launcher, closing background applications, and ensuring your system meets the minimum requirements.'
      },
      {
        question: 'How can I improve my FPS in Overwatch?',
        answer: 'To improve FPS, try: lowering graphics settings, updating graphics drivers, closing background applications, enabling "Reduce Buffering" in the game settings, setting the game to "High Priority" in Task Manager, and ensuring your PC is not overheating.'
      },
      {
        question: 'What should I do if I experience high ping or latency?',
        answer: 'For high ping issues, try: connecting to a wired internet connection instead of Wi-Fi, closing bandwidth-heavy applications, restarting your router, checking for ISP outages, and selecting the appropriate game region in the Battle.net launcher settings.'
      },
      {
        question: 'How do I fix the "Rendering Device Lost" error?',
        answer: 'To fix the "Rendering Device Lost" error: update your graphics drivers, lower graphics settings, disable overclocking on your GPU, limit your FPS in-game, and ensure your GPU is not overheating. If the issue persists, try reinstalling your graphics drivers completely.'
      },
      {
        question: 'Why can\'t I hear game audio?',
        answer: 'If you can\'t hear game audio, check: if the correct audio device is selected in both Windows and game settings, if the game volume is turned up, if your headphones/speakers are properly connected, and if your audio drivers are up to date. Also try restarting the game and your computer.'
      }
    ],
    billing: [
      {
        question: 'How do I purchase Overwatch Coins?',
        answer: 'To purchase Overwatch Coins, open the game and navigate to the Shop tab. Select the "Purchase Coins" option, choose your desired amount, and follow the checkout process using your preferred payment method.'
      },
      {
        question: 'Can I get a refund for my purchase?',
        answer: 'Blizzard\'s refund policy allows for refunds on digital purchases within 14 days of purchase and if the content has not been significantly consumed. For specific refund requests, contact Blizzard Support through your Battle.net account.'
      },
      {
        question: 'Why was my payment declined?',
        answer: 'Payments may be declined due to insufficient funds, incorrect payment information, bank restrictions, or regional limitations. Verify your payment details, contact your bank to ensure there are no restrictions, or try an alternative payment method.'
      },
      {
        question: 'How do I update my payment method?',
        answer: 'To update your payment method, log into your Battle.net account, go to Account Settings > Payment Methods, and select "Add Payment Method" or edit an existing one. Follow the prompts to update your information.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'To cancel a subscription, log into your Battle.net account, go to Account Settings > Subscriptions, find the subscription you want to cancel, and click "Cancel Subscription." Follow the prompts to confirm the cancellation.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, visit the Battle.net login page and click "Can\'t log in?" then select "I forgot my password." Enter your email address and follow the instructions sent to your email to create a new password.'
      },
      {
        question: 'How do I enable two-factor authentication?',
        answer: 'To enable two-factor authentication, log into your Battle.net account, go to Account Settings > Security, and click "Add Authenticator." You can choose between the mobile app authenticator or SMS authentication. Follow the instructions to complete the setup.'
      },
      {
        question: 'My account was hacked. What should I do?',
        answer: 'If your account was compromised, immediately: change your password, enable two-factor authentication, contact Blizzard Support through the Battle.net website, scan your computer for malware, and review any unauthorized transactions or changes to your account.'
      },
      {
        question: 'How do I change my BattleTag?',
        answer: 'To change your BattleTag, log into your Battle.net account, go to Account Settings > Account Details, and click "Change" next to your BattleTag. Note that you get one free BattleTag change, and additional changes require a purchase.'
      },
      {
        question: 'Can I merge multiple Overwatch accounts?',
        answer: 'Yes, Overwatch 2 supports account merging. To merge accounts, log into the game on each platform where you have played Overwatch, and follow the in-game prompts to connect these accounts to your Battle.net account. Your progress and items will be combined.'
      }
    ],
    reporting: [
      {
        question: 'How do I report a player for inappropriate behavior?',
        answer: 'To report a player in-game, press P to open the Social menu, find the player\'s name, click the arrow next to their name, and select "Report." Choose the appropriate category for the report and provide details if prompted.'
      },
      {
        question: 'How do I report a bug?',
        answer: 'To report bugs, visit the official Overwatch forums, navigate to the Bug Report section, and create a new post describing the issue in detail. Include information about your system, steps to reproduce the bug, and any error messages you received.'
      },
      {
        question: 'What happens when I report someone?',
        answer: 'When you report a player, Blizzard reviews the report along with other data to determine if action is needed. If the player is found to be violating the code of conduct, they may receive warnings, suspensions, or permanent bans depending on the severity and frequency of violations.'
      },
      {
        question: 'How can I provide feedback about the game?',
        answer: 'To provide feedback, visit the official Overwatch forums and post in the appropriate feedback section. You can also participate in official surveys when available, or share your thoughts on official Overwatch social media channels.'
      },
      {
        question: 'How do I appeal a suspension or ban?',
        answer: 'To appeal a suspension or ban, log into your Battle.net account and visit the Support section. Submit a ticket under Account & Technical > Overwatch > Contact Support, and provide details about your situation. A Blizzard representative will review your case.'
      }
    ]
  };

  const handleFAQClick = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden h-[50vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src="/images/support/support-banner.jpg" 
            alt="Support Banner" 
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
              PLAYER <span className="text-primary-blue">SUPPORT</span>
            </h1>
            <div className="max-w-xl transition-all duration-1000 delay-300">
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Get help with gameplay, technical issues, account management, and more
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

      {/* Support Categories */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How Can We Help You?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-700 border-2 ${activeTab === category.id ? 'border-primary-blue' : 'border-transparent'}`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <p className="text-gray-400">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800">
        <div className="valorant-container">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-12">Find answers to common questions about {supportCategories.find(c => c.id === activeTab)?.title.toLowerCase()}</p>
          
          <div className="max-w-3xl mx-auto">
            {faqItems[activeTab].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="mb-4"
              >
                <div 
                  className="bg-gray-700 rounded-lg p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => handleFAQClick(index)}
                >
                  <h3 className="text-white font-medium">{item.question}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedFAQ === index ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedFAQ === index && (
                  <div className="bg-gray-750 rounded-b-lg p-4 mt-1 text-gray-300">
                    <p>{item.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 bg-primary-blue/20">
                <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
                <p className="text-gray-300 mb-6">
                  If you couldn't find the answer to your question, please fill out the form and our support team will get back to you as soon as possible.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/30 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">support@overwatch.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/30 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Support Hours</p>
                      <p className="text-white">24/7 Support Available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/30 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Online Support</p>
                      <p className="text-white">Visit our Support Portal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Support Category</label>
                    <select 
                      id="category" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      {supportCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Describe your issue in detail"
                    ></textarea>
                  </div>
                  <button 
                    type="button" 
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-3 px-4 rounded-md transition-colors"
                  >
                    Submit Support Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}
