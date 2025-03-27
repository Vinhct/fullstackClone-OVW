'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getAllAgents, Agent, Ability } from '@/data/agents';

export default function AgentsPage() {
  const agents = getAllAgents();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeRole, setActiveRole] = useState('ALL');
  const [activeAbility, setActiveAbility] = useState('Q');

  // Filter agents by role
  const filteredAgents = activeRole === 'ALL'
    ? agents
    : agents.filter(agent => agent.role.toUpperCase() === activeRole);

  // Agent details modal
  interface AgentModalProps {
    agent: Agent;
    onClose: () => void;
  }

  const AgentModal = ({ agent, onClose }: AgentModalProps) => {
    if (!agent) return null;

    const selectedAbility = agent.abilities.find(ability => ability.key === activeAbility) || agent.abilities[0];

    return (
      <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative rounded-lg max-w-5xl w-full"
            style={{
              background: `linear-gradient(to bottom, ${agent.backgroundGradient[0]}20, ${agent.backgroundGradient[1]}40)`,
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-valorant-dark hover:text-valorant-red z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Background image - faded */}
            <div className="absolute inset-0 z-0 opacity-10 rounded-lg overflow-hidden">
              <Image
                src={agent.background}
                alt={`${agent.name} background`}
                fill
                className="object-cover"
              />
            </div>

            {/* Agent details */}
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row items-center">
                {/* Agent image */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-[300px] h-[500px]">
                    <Image
                      src={agent.fullPortrait}
                      alt={agent.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Agent details */}
                <div className="md:w-1/2 p-6">
                  <div className="inline-block bg-valorant-red px-3 py-1 text-white font-din uppercase text-sm mb-4">
                    {agent.role}
                  </div>
                  <h1 className="font-tungsten text-5xl md:text-7xl uppercase text-valorant-dark">
                    {agent.name}
                  </h1>
                  <div className="text-sm font-din text-valorant-dark/70 mt-1 mb-6">
                    <span className="font-bold">Origin:</span> {agent.origin} {agent.releaseDate && `• Released: ${agent.releaseDate}`}
                  </div>

                  {/* Quote */}
                  {agent.quote && (
                    <div className="italic text-xl font-din text-valorant-dark mb-6 border-l-4 pl-4 py-2" style={{ borderColor: agent.backgroundGradient[0] }}>
                      "{agent.quote}"
                    </div>
                  )}

                  {/* Biography */}
                  <div className="mb-8">
                    <h2 className="font-tungsten text-3xl uppercase text-valorant-dark mb-2">
                      Biography
                    </h2>
                    <p className="text-valorant-dark/80 font-din">
                      {agent.biography}
                    </p>
                  </div>
                </div>
              </div>

              {/* Abilities section */}
              <div className="bg-valorant-dark text-white p-6 rounded-md mt-8">
                <h2 className="font-tungsten text-4xl uppercase mb-6">
                  Special Abilities
                </h2>

                {/* Ability selector */}
                <div className="flex space-x-4 mb-6">
                  {agent.abilities.map((ability) => (
                    <button
                      key={ability.key}
                      className={`w-16 h-16 rounded-md flex items-center justify-center text-xl font-bold transition-all
                        ${activeAbility === ability.key
                          ? 'bg-valorant-red text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      onClick={() => setActiveAbility(ability.key)}
                    >
                      {ability.key}
                    </button>
                  ))}
                </div>

                {/* Selected ability details */}
                <div className="bg-white/5 p-6 rounded-md">
                  <h3 className="font-din text-xl uppercase font-bold text-valorant-red mb-3">
                    {selectedAbility.name}
                  </h3>
                  <p className="font-din text-white/80 leading-relaxed">
                    {selectedAbility.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-valorant-light pb-16">
      {/* Hero Section */}
      <section className="bg-valorant-dark pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="valorant-container">
          <h1 className="font-tungsten text-white text-7xl md:text-9xl uppercase tracking-wide">
            AGENTS
          </h1>
          <p className="text-gray-400 max-w-2xl mt-4 font-din">
            Your unique arsenal of agents, each bringing their own unique abilities to the battlefield. Find the playstyle that works for you.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-valorant-light -mt-8 relative z-10">
        <div className="valorant-container">
          <div className="bg-white p-4 shadow-md flex overflow-x-auto">
            <button
              className={`px-6 py-2 font-din uppercase font-bold tracking-wide whitespace-nowrap ${
                activeRole === 'ALL'
                  ? 'text-valorant-red border-b-2 border-valorant-red'
                  : 'text-gray-600 hover:text-valorant-red'
              }`}
              onClick={() => setActiveRole('ALL')}
            >
              All Agents
            </button>
            <button
              className={`px-6 py-2 font-din uppercase font-bold tracking-wide whitespace-nowrap ${
                activeRole === 'DUELIST'
                  ? 'text-valorant-red border-b-2 border-valorant-red'
                  : 'text-gray-600 hover:text-valorant-red'
              }`}
              onClick={() => setActiveRole('DUELIST')}
            >
              Duelists
            </button>
            <button
              className={`px-6 py-2 font-din uppercase font-bold tracking-wide whitespace-nowrap ${
                activeRole === 'INITIATOR'
                  ? 'text-valorant-red border-b-2 border-valorant-red'
                  : 'text-gray-600 hover:text-valorant-red'
              }`}
              onClick={() => setActiveRole('INITIATOR')}
            >
              Initiators
            </button>
            <button
              className={`px-6 py-2 font-din uppercase font-bold tracking-wide whitespace-nowrap ${
                activeRole === 'CONTROLLER'
                  ? 'text-valorant-red border-b-2 border-valorant-red'
                  : 'text-gray-600 hover:text-valorant-red'
              }`}
              onClick={() => setActiveRole('CONTROLLER')}
            >
              Controllers
            </button>
            <button
              className={`px-6 py-2 font-din uppercase font-bold tracking-wide whitespace-nowrap ${
                activeRole === 'SENTINEL'
                  ? 'text-valorant-red border-b-2 border-valorant-red'
                  : 'text-gray-600 hover:text-valorant-red'
              }`}
              onClick={() => setActiveRole('SENTINEL')}
            >
              Sentinels
            </button>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 md:py-16">
        <div className="valorant-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAgents.map((agent) => (
              <button
                key={agent.id}
                className="group relative overflow-hidden bg-white hover:bg-gray-100 transition-colors rounded-md shadow-md"
                onClick={() => {
                  setSelectedAgent(agent);
                  setActiveAbility(agent.abilities[0]?.key || 'Q');
                }}
              >
                <div className="aspect-square relative">
                  <div
                    className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(45deg, ${agent.backgroundGradient[0]}, ${agent.backgroundGradient[1]})`,
                    }}
                  />
                  <Image
                    src={agent.bustPortrait}
                    alt={agent.name}
                    fill
                    className="object-cover p-2"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs uppercase font-din text-gray-500 mb-1">
                    {agent.role}
                  </div>
                  <h3 className="font-tungsten text-2xl md:text-3xl text-valorant-dark group-hover:text-valorant-red transition-colors uppercase">
                    {agent.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Modal */}
      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}
