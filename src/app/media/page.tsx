"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_CONTENT, getAllMediaTypes, getAllAgents, getAllMaps, getAllCategories,
         type MediaContentType, type MediaAgent, type MediaMap } from "@/data/mediaContent";

type FilterState = {
  type: MediaContentType | 'all';
  agent: MediaAgent | 'all';
  map: MediaMap | 'all';
  category: string | 'all';
};

type ViewMode = 'grid' | 'masonry';

export default function MediaPage() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    agent: 'all',
    map: 'all',
    category: 'all'
  });
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredItems, setFilteredItems] = useState(MEDIA_CONTENT);

  const mediaTypes = ['all', ...getAllMediaTypes()];
  const agentOptions = ['all', ...getAllAgents()];
  const mapOptions = ['all', ...getAllMaps()];
  const categoryOptions = ['all', ...getAllCategories()];

  // Apply filters whenever the filter state changes
  useEffect(() => {
    let results = MEDIA_CONTENT;

    if (filters.type !== 'all') {
      results = results.filter(item => item.type === filters.type);
    }

    if (filters.agent !== 'all') {
      results = results.filter(item => item.agent === filters.agent || item.agent === 'all');
    }

    if (filters.map !== 'all') {
      results = results.filter(item => item.map === filters.map);
    }

    if (filters.category !== 'all') {
      results = results.filter(item => item.category === filters.category);
    }

    setFilteredItems(results);
    setVisibleItems(6); // Reset visible items when filters change
  }, [filters]);

  const handleShowMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, filteredItems.length));
  };

  const updateFilter = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      agent: 'all',
      map: 'all',
      category: 'all'
    });
  };

  const isFilterActive = () => {
    return filters.type !== 'all' || filters.agent !== 'all' ||
           filters.map !== 'all' || filters.category !== 'all';
  };

  return (
    <div className="min-h-screen bg-valorant-light">
      {/* Hero Section */}
      <section className="bg-valorant-red py-12 md:py-20 relative overflow-hidden">
        <div className="valorant-container relative z-10">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="font-tungsten text-white text-7xl md:text-9xl uppercase tracking-wide mb-6">
                MEDIA
              </h1>
              <div className="text-white/90 space-y-4">
                <p className="font-din text-lg">
                  Our work is your play. Whether you're press, a content creator
                  or something in between, if you see it here it's yours to use.
                </p>
                <p className="font-din text-lg">
                  Don't forget, if you create something with these files, tag
                  @VALORANT on social media. We cannot wait to see what you
                  make, just remember to keep in mind our{" "}
                  <a
                    href="https://www.riotgames.com/en/legal"
                    className="underline hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Legal Jibber Jabber
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative h-full md:h-[300px] rounded overflow-hidden shadow-lg">
              <Image
                src="/images/media/valorant-gameplay.jpg"
                alt="VALORANT Media"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 transform rotate-45 translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute top-12 left-4 w-24 h-24 bg-white opacity-5 transform -rotate-12"></div>
      </section>

      {/* Advanced Filters Section */}
      <section className="py-8 bg-valorant-light border-b border-gray-300">
        <div className="valorant-container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-tungsten text-3xl uppercase">Filters</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'text-valorant-red' : 'text-gray-600'}`}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 ${viewMode === 'masonry' ? 'text-valorant-red' : 'text-gray-600'}`}
                  aria-label="Masonry view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9"></rect>
                    <rect x="14" y="3" width="7" height="5"></rect>
                    <rect x="14" y="12" width="7" height="9"></rect>
                    <rect x="3" y="16" width="7" height="5"></rect>
                  </svg>
                </button>
              </div>
              {isFilterActive() && (
                <button
                  onClick={resetFilters}
                  className="text-valorant-red hover:underline font-din text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Content Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 font-din uppercase">Content Type</label>
              <select
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value as MediaContentType | 'all')}
                className="w-full p-2 border border-gray-300 rounded-md bg-white font-din"
              >
                {mediaTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                  </option>
                ))}
              </select>
            </div>

            {/* Agent Filter */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 font-din uppercase">Agent</label>
              <select
                value={filters.agent}
                onChange={(e) => updateFilter('agent', e.target.value as MediaAgent | 'all')}
                className="w-full p-2 border border-gray-300 rounded-md bg-white font-din"
              >
                {agentOptions.map(agent => (
                  <option key={agent} value={agent}>
                    {agent === 'all' ? 'All Agents' : agent.charAt(0).toUpperCase() + agent.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Map Filter */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 font-din uppercase">Map</label>
              <select
                value={filters.map}
                onChange={(e) => updateFilter('map', e.target.value as MediaMap | 'all')}
                className="w-full p-2 border border-gray-300 rounded-md bg-white font-din"
              >
                {mapOptions.map(map => (
                  <option key={map} value={map}>
                    {map === 'all' ? 'All Maps' : map.charAt(0).toUpperCase() + map.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 font-din uppercase">Category</label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white font-din"
              >
                {categoryOptions.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-valorant-light">
        <div className="valorant-container">
          <p className="font-din text-sm text-gray-600">
            Showing {Math.min(visibleItems, filteredItems.length)} of {filteredItems.length} results
          </p>
        </div>
      </section>

      {/* Media Content */}
      <section className="py-8 bg-valorant-light">
        <div className="valorant-container">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="font-tungsten text-2xl mb-2">No Media Found</h3>
              <p className="font-din text-gray-600">Try adjusting your filters to find what you're looking for.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.slice(0, visibleItems).map((item) => (
                <div key={item.id} className="group">
                  <a
                    href={item.downloadLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="relative overflow-hidden rounded-sm mb-3">
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <div className="h-0 pb-[56.25%] relative">
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            width={400}
                            height={225}
                          />
                        </div>
                      </div>

                      {/* Media type badge */}
                      <div className="absolute top-0 left-0 bg-valorant-red text-white text-xs font-din uppercase px-3 py-1">
                        {item.type}
                      </div>

                      {/* Download button */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.type === 'video' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                    <h3 className="font-bold text-lg group-hover:text-valorant-red transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-700 mt-1 text-sm line-clamp-2">{item.description}</p>
                    )}
                    {(item.agent || item.map) && (
                      <div className="mt-2 flex gap-2">
                        {item.agent && item.agent !== 'all' && (
                          <span className="inline-block text-xs bg-gray-200 rounded-full px-2 py-1 font-din">
                            {item.agent.charAt(0).toUpperCase() + item.agent.slice(1)}
                          </span>
                        )}
                        {item.map && item.map !== 'all' && (
                          <span className="inline-block text-xs bg-gray-200 rounded-full px-2 py-1 font-din">
                            {item.map.charAt(0).toUpperCase() + item.map.slice(1)}
                          </span>
                        )}
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
              {filteredItems.slice(0, visibleItems).map((item, index) => {
                // Create variant heights for masonry layout
                const isLarge = index % 5 === 0 || index % 7 === 0;
                const heightClass = isLarge ? 'pb-[100%]' : 'pb-[75%]';

                return (
                  <div
                    key={item.id}
                    className={`group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <a
                      href={item.downloadLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <div className="relative overflow-hidden rounded-sm">
                        <div className="w-full">
                          <div className={`h-0 ${heightClass} relative`}>
                            <Image
                              src={item.imageSrc}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              width={400}
                              height={isLarge ? 400 : 300}
                            />
                          </div>
                        </div>

                        {/* Overlay with info */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
                          <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="inline-block bg-valorant-red text-white text-xs font-din uppercase px-2 py-1 mb-2">
                              {item.type}
                            </div>
                            <h3 className="text-white font-bold">
                              {item.title}
                            </h3>
                            <div className="text-white/70 text-xs mt-1">{item.date}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More Button */}
          {visibleItems < filteredItems.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={handleShowMore}
                className="flex items-center space-x-2 font-din uppercase font-bold text-sm tracking-wider hover:text-valorant-red transition-colors"
              >
                <span>SHOW MORE</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
