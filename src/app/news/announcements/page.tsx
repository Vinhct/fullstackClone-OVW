'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the announcements data
const announcements = [
  {
    id: 'valorant-community-code',
    title: 'VALORANT Community Code',
    description: 'Here are our expectations of you as we build this long-lasting community together.',
    date: '6/2/2020',
    imageUrl: '/images/news/community-code-header.jpg'
  },
  {
    id: 'beginners-guide',
    title: 'Beginner\'s Guide',
    description: 'Wanna get good at VALORANT? Here\'s your first stop.',
    date: '8/2/2024',
    imageUrl: '/images/news/tier-lists.jpg'
  },
  {
    id: 'vct-americas',
    title: 'VCT Americas: Everything You Need To Know',
    description: 'Find out about the schedule, format, competing teams, and more for VCT Americas 2024.',
    date: '3/5/2024',
    imageUrl: '/images/news/vct-americas-everything.jpg'
  },
  {
    id: 'valentine-day',
    title: 'Love Is In The Lobby: Community-Created Content For V-Day',
    description: 'Check out these community-made VALORANT Valentine\'s Day cards!',
    date: '2/14/2024',
    imageUrl: '/images/news/valentines-day.jpg'
  },
];

const AnnouncementsPage = () => {
  return (
    <div className="bg-[#ece8e3] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-4">ANNOUNCEMENTS</h1>
            <p className="text-[#768079] text-lg">Stay up to date with the latest VALORANT announcements and community updates.</p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <Link key={announcement.id} href={`/news/announcements/${announcement.id}`} className="group">
                <div className="bg-white overflow-hidden h-full">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={announcement.imageUrl}
                      alt={announcement.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <span className="text-[#ff4655] text-xs uppercase">Announcements</span>
                      <span className="text-[#768079] mx-2 text-xs">•</span>
                      <span className="text-[#768079] text-xs">{announcement.date}</span>
                    </div>
                    <h3 className="font-bold text-xl text-[#0f1923] group-hover:text-[#ff4655] transition-colors mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-[#768079]">{announcement.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-6">CATEGORIES</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/news/announcements" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Announcements</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/news/game-updates" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Game Updates</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/news/esports" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Esports</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/news/community" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Community</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/news/dev" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Dev</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/news/merchandise" className="bg-white p-4 hover:bg-[#ff4655] hover:text-white transition-colors flex items-center justify-between group">
                <span className="font-bold">Merchandise</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
