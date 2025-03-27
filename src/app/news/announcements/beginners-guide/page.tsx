'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BeginnersGuidePage = () => {
  return (
    <div className="bg-[#ece8e3] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src="/images/news/tier-lists.jpg"
            alt="Valorant Beginners Guide"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Title and Intro */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
          <div className="bg-[#ece8e3] p-8 pt-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-2">Beginner's Guide</h1>
              <p className="text-[#768079] text-lg font-din">Wanna get good at VALORANT? Here's your first stop.</p>

              <div className="flex items-center mt-4 border-t border-b border-[#bdbcb7] py-2">
                <Link href="/news/announcements" className="text-[#ff4655] font-bold text-sm hover:underline">
                  Announcements
                </Link>
                <span className="text-[#768079] mx-2">•</span>
                <span className="text-[#768079] text-sm">8/2/2024</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-[#383e3a]">
              <p>
                Welcome to VALORANT! Whether you're a complete beginner to tactical shooters or coming from another
                FPS game, this guide will help you get started and improve your skills in the world of VALORANT.
              </p>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-10 mb-4">The Basics</h2>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">What is VALORANT?</h3>
              <p>
                VALORANT is a free-to-play 5v5 character-based tactical shooter developed by Riot Games.
                It blends precise gunplay with unique agent abilities, creating a dynamic gameplay experience
                that rewards both mechanical skill and strategic thinking.
              </p>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Game Modes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Unrated:</strong> The standard 5v5 game mode with no rank at stake. Great for learning the game.</li>
                <li><strong>Competitive:</strong> Ranked mode where you play to climb the ladder.</li>
                <li><strong>Spike Rush:</strong> Faster-paced mode with random weapons and all players having the spike.</li>
                <li><strong>Deathmatch:</strong> Free-for-all mode focused on gunplay practice.</li>
                <li><strong>Swiftplay:</strong> A shorter version of the standard game.</li>
                <li><strong>Premier:</strong> Team-based competitive system with tournaments.</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Basic Controls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Movement:</strong> WASD to move, Space to jump, Left Ctrl to crouch, Left Shift to walk quietly</li>
                <li><strong>Mouse:</strong> Aim with mouse, Left-click to shoot, Right-click for alternative fire</li>
                <li><strong>Abilities:</strong> C, Q, E for standard abilities, X for ultimate (when charged)</li>
                <li><strong>Weapons:</strong> 1-5 to switch weapons, B to open buy menu</li>
                <li><strong>Communication:</strong> Enter for text chat, Alt for team voice chat</li>
              </ul>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-12 mb-4">Getting Started</h2>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Choose Your First Agents</h3>
              <p>
                When starting out, it's good to focus on agents with straightforward abilities:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Brimstone:</strong> Smoke Controller with easy-to-use area control abilities</li>
                <li><strong>Sage:</strong> Sentinel who can heal teammates and block paths</li>
                <li><strong>Phoenix:</strong> Duelist with self-healing abilities</li>
                <li><strong>Sova:</strong> Initiator who can gather information with recon abilities</li>
              </ul>

              <div className="mt-6 mb-10">
                <Image
                  src="/images/agents-group.png"
                  alt="Valorant Agents"
                  width={800}
                  height={400}
                  className="rounded"
                />
              </div>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Master the Shooting Mechanics</h3>
              <p>
                VALORANT's gunplay is highly precise and rewards careful aim:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Recoil Control:</strong> Weapons have predictable spray patterns. Pull down slightly as you shoot to compensate.</li>
                <li><strong>Counter-Strafing:</strong> Stop moving before shooting for maximum accuracy.</li>
                <li><strong>Crosshair Placement:</strong> Always keep your crosshair at head level where enemies are likely to appear.</li>
                <li><strong>Burst Fire:</strong> For longer ranges, tap or burst fire instead of spraying.</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Economy Management</h3>
              <p>
                Managing your credits is crucial in VALORANT:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pistol Rounds:</strong> The first round of each half where everyone starts with limited credits.</li>
                <li><strong>Eco Rounds:</strong> When your team is low on credits, save by buying minimal or no equipment.</li>
                <li><strong>Full Buy:</strong> When you can afford a premium rifle, armor, and abilities.</li>
                <li><strong>Team Economy:</strong> Coordinate buys with your team to maintain economic advantage.</li>
              </ul>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-12 mb-4">Tips for Improvement</h2>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Practice Regularly</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Range to warm up and practice aim</li>
                <li>Play Deathmatch to improve gunplay in realistic scenarios</li>
                <li>Learn callouts for each map to communicate effectively</li>
                <li>Watch high-level players to understand strategies</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Communication is Key</h3>
              <p>
                VALORANT is a team game, and clear communication makes a huge difference:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Call out enemy positions and abilities used</li>
                <li>Plan strategies at the start of rounds</li>
                <li>Use the minimap to track teammates and known enemy positions</li>
                <li>Stay positive and avoid tilting - review the <Link href="/news/announcements/valorant-community-code" className="text-[#ff4655] hover:underline">Community Code</Link> for best practices</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Keep Learning</h3>
              <p>
                The journey to mastery in VALORANT is long but rewarding:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Expand your agent pool as you get comfortable</li>
                <li>Learn lineup spots for utility on different maps</li>
                <li>Study pro matches to understand high-level strategy</li>
                <li>Record and review your gameplay to identify mistakes</li>
              </ul>

              <div className="bg-[#0f1923] text-white p-6 rounded-md mt-10">
                <h3 className="text-2xl font-din font-bold mb-3">Remember:</h3>
                <p>
                  Everyone was a beginner once! Focus on improvement rather than results,
                  take breaks when needed, and most importantly - have fun! VALORANT has a
                  steep learning curve, but the satisfaction of mastering its mechanics makes it worth it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="bg-[#ece8e3] py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-8">RELATED ARTICLES</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/news/announcements/valorant-community-code" className="group">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/news/community-code-header.jpg"
                      alt="Community Code"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-[#ff4655] text-xs uppercase">Announcements</span>
                      <span className="text-[#768079] mx-2 text-xs">•</span>
                      <span className="text-[#768079] text-xs">6/2/2020</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0f1923] group-hover:text-[#ff4655] transition-colors">
                      VALORANT Community Code
                    </h3>
                    <p className="text-sm text-[#768079]">Here are our expectations of you as we build this long-lasting community together.</p>
                  </div>
                </div>
              </Link>

              <Link href="/news/game-updates/valorant-patch-notes-10-05" className="group">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/news/patch-10-05.jpg"
                      alt="Patch Notes 10.05"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-[#ff4655] text-xs uppercase">Game Updates</span>
                      <span className="text-[#768079] mx-2 text-xs">•</span>
                      <span className="text-[#768079] text-xs">3/15/2024</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0f1923] group-hover:text-[#ff4655] transition-colors">
                      VALORANT Patch Notes 10.05
                    </h3>
                    <p className="text-sm text-[#768079]">Game system updates and bug fixes in Patch 10.05.</p>
                  </div>
                </div>
              </Link>

              <Link href="/news/game-updates/valorant-patch-notes-10-04" className="group">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/news/patch-10-04.jpg"
                      alt="Patch Notes 10.04"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-[#ff4655] text-xs uppercase">Game Updates</span>
                      <span className="text-[#768079] mx-2 text-xs">•</span>
                      <span className="text-[#768079] text-xs">2/21/2024</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0f1923] group-hover:text-[#ff4655] transition-colors">
                      VALORANT Patch Notes 10.04
                    </h3>
                    <p className="text-sm text-[#768079]">Agent balancing, bug fixes, and more in the latest patch.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BeginnersGuidePage;
