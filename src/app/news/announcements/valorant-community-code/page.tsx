'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunityCodePage = () => {
  return (
    <div className="bg-[#ece8e3] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src="/images/news/community-code-header.jpg"
            alt="Valorant Community Code"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Title and Intro */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
          <div className="bg-[#ece8e3] p-8 pt-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-2">VALORANT Community Code</h1>
              <p className="text-[#768079] text-lg font-din">Here are our expectations of you as we build this long-lasting community together.</p>

              <div className="flex items-center mt-4 border-t border-b border-[#bdbcb7] py-2">
                <Link href="/news/announcements" className="text-[#ff4655] font-bold text-sm hover:underline">
                  Announcements
                </Link>
                <span className="text-[#768079] mx-2">•</span>
                <span className="text-[#768079] text-sm">6/2/2020</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-[#383e3a]">
              <p>
                Before queueing up for your first match, we ask players to agree to the expectations outlined here.
                We encourage everyone to give the full document a read, and we hope this helps you calibrate on
                the community we look forward to building together in VALORANT. Please be aware that this Code of
                Conduct for VALORANT is supplemental to the <a href="https://www.riotgames.com/en/terms-of-service"
                className="text-[#ff4655] hover:underline" target="_blank" rel="noopener noreferrer">Riot Games Terms of Service</a>,
                which you must agree to before being allowed into any of our games.
              </p>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-10 mb-4">Values</h2>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Triumphant through Teamwork</h3>
              <p>
                The best experiences in VALORANT come from teamwork. We believe that coordination with teammates is
                part of an individual's expression of skill, and that everyone plays their best when they're playing together.
              </p>
              <p>
                We celebrate the teammate who clutches the round, but we recognize that these moments have
                the greatest impact when you're working together to set each other up <em>every</em> round. We intend to
                deliver experiences, tools and content that enable teams to play cohesively, whether they've had
                five or five hundred rounds to get to know one another.
              </p>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">Fairness in Every Match</h3>
              <p>
                To have meaningful stakes in every match, the conditions for that match must be fair for all players. We believe
                that fairness means games are free from cheating, misuse of game systems, and all forms of harassment.
              </p>
              <p>
                We aim to uphold competitive integrity, and to ensure that all players are treated with respect in
                our ecosystem. When addressing disruptive behavior, we believe that penalties should reflect the
                standards and needs of the community, and that they should address the specifics of the disruptive
                behaviour rather than being overly punitive.
              </p>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">A Game where Players Thrive</h3>
              <p>
                It's up to us to set the conditions for VALORANT that enable every player to play their best. That means
                ensuring safety, fairness, and agency over experiences on our platform. We strive to give players the
                tools they need to protect themselves and their account, and we trust them to use them to curate their experience.
              </p>
              <p>
                We believe in giving players control over how they interact with their peers, and in providing meaningful
                options for exercising that control - options that don't compromise their ability to compete and
                coordinate with their team. Even with many options, we intend to protect every player's right to choose
                how they coordinate and to prevent players from being forced out of channels due to fear or abuse.
              </p>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-12 mb-4">Expectations</h2>
              <p>
                Every VALORANT player deserves an opportunity to be themselves and play their best. You deserve to be able
                to play each match free from harassment, hatred, and abuse; so do your teammates and your opponents.
              </p>
              <p>
                To create a game that lives up to our values above, we need your help. When you play VALORANT,
                we both ask and expect you to commit to the following:
              </p>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">COMPETE TO WIN, TOGETHER</h3>
              <p className="font-bold">
                Teamwork wins games. Recognize that you can only win WITH teammates, not in spite of them.
              </p>

              <p className="mt-4">For example, we expect and encourage you to:</p>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Stay focused on strategy. If you can't agree, pick something and commit. You're better off working together on a questionable plan than not working together at all.</li>
                <li>Leverage your team's strengths and help cover their weaknesses. They'll cover yours too!</li>
                <li>Celebrate the plays of your teammates. You set them up, help them shine in the moment!</li>
                <li>Bring your best self to every match. Everyone has bad games - we understand! But don't queue up if you're not in it to win.</li>
              </ul>

              <ul className="list-disc pl-5 mt-6 space-y-2">
                <li>Don't give up on teammates, even if they're having a bad game.</li>
                <li>Never sabotage your team or try to ruin the game, even if you're not having fun.</li>
                <li>Please don't tell teammates how they should be playing. If they're open to it, constructive feedback is great! But don't order people around, even if you're frustrated.</li>
                <li>Avoid spending more time arguing than collaborating. If you're out for the round, focus on helping your team finish strong rather than arguing with them while they close it out.</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">COMMIT TO RESPECT AND EMPATHY</h3>
              <p className="font-bold">
                We ask that you treat others with dignity and respect. Exercise empathy and seek to build
                trust with teammates so that they can perform their best.
              </p>

              <p className="mt-4">For example, we expect and encourage you to:</p>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Obey the platinum rule - Treat others as <strong>they</strong> wish to be treated. If you don't know, ask.</li>
                <li>Respect individual differences and experiences. VALORANT is a global community.</li>
                <li>Treat everyone like they can teach you something - they might just broaden your worldview.</li>
                <li>Use spicy language with caution. If you've just met, don't assume everyone will understand your meaning or intent.</li>
                <li>If someone asks you not to use a term, stop - even if you don't think it's offensive.</li>
                <li>Communication channels are a shared space! Keep comms focused on coordination, even if you're waiting to respawn.</li>
              </ul>

              <ul className="list-disc pl-5 mt-6 space-y-2">
                <li>Never use hateful or abusive language. We do not tolerate derogatory comments on any player's gender, race, sexual orientation, age, mental or physical abilities, religious affiliations, or country of origin.</li>
                <li>Don't make jokes about people. People aren't punchlines.</li>
                <li>Threats of any kind are unacceptable in VALORANT. Intent doesn't matter here, and it's on you to know your audience if you think it's just a joke.</li>
                <li>Don't expect someone to "toughen up" over your language. If you upset someone, own it and do better next time.</li>
                <li>Respect people's boundaries.</li>
                <li>Avoid blasting comms channels with background noise, music, or spam.</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">PROTECT YOUR TEAM AND YOUR COMMUNITY</h3>
              <p className="font-bold">
                Build the community you want to play in, one match at a time. Use tools and good judgement to
                protect yourself and your peers, and support others when they need your help.
              </p>

              <p className="mt-4">For example, we expect and encourage you to:</p>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Use settings and systems to manage the experience you want to have. Opt out of communication channels you don't want to be in.</li>
                <li>Turn on language filters, use mutes, and report behavior that isn't okay.</li>
                <li>If someone is harassing a teammate, speak up if you're able. Take care not to make the situation worse, but sometimes a little support can mean a lot to your teammate.</li>
                <li>Help keep games free from cheating or glitch abuse; if you think someone else is doing it, report it so we can take care of it.</li>
              </ul>

              <ul className="list-disc pl-5 mt-6 space-y-2">
                <li>Don't call for mass reports or pull teammates into an argument. One report is enough to let us know something's happening.</li>
                <li>Don't let someone bring you down to their level. If a player is harassing you, often it's better to disengage than to fire back. It takes two to keep a fight going.</li>
              </ul>

              <h3 className="text-2xl font-din font-bold text-[#0f1923] mt-8 mb-3">BE YOUR OWN LAST LINE OF DEFENSE</h3>
              <p className="font-bold">
                Help Riot keep you safe. Be responsible with your account, devices, personal information, and conduct.
              </p>

              <p className="mt-4">For example, we expect and encourage you to:</p>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Use strong passwords and keep all your devices secure.</li>
                <li>Let us know as soon as possible if you think your account has been hacked.</li>
                <li>Accounts have a one-person maximum. We expect you to keep your account secure and not to let anyone else use it.</li>
                <li>If you want to rank up, play with your friends; Don't ask your friends to play for you.</li>
                <li>Play responsibly. Practice self care so you can bring your best to every game you play.</li>
              </ul>

              <ul className="list-disc pl-5 mt-6 space-y-2">
                <li>Never run third-party programs that interfere with gameplay.</li>
                <li>We expect you to exercise caution and good judgment here.</li>
                <li>Don't share personal information with strangers. Also, don't share anyone else's information. We have a zero tolerance policy for doxxing on our platform.</li>
                <li>Do not impersonate anyone. In particular, don't impersonate Rioters or highly visible players.</li>
                <li>Avoid queueing up for one more when you know you're tilted. Take breaks, and recognize when you're getting frustrated.</li>
              </ul>

              <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mt-12 mb-4">Consequences</h2>
              <p>
                If you violate the expectations described here, we may restrict your privileges or access to features
                in our games. Restrictions serve to shield the community from future disruption, and provide an
                opportunity to reflect on the behavior that led to the restriction. We strive to provide a path to
                reform, but not at the expense protecting the rest of the community. We also strive to restrict based
                on the disruption caused, and to avoid action that is needlessly punitive or harsh.
              </p>

              <p className="mt-4">
                Restrictions for violating the expectations above can include (but are not limited to):
              </p>

              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Loss of the ability to use in-game communication systems.</li>
                <li>Restrictions or additional requirements to access experiences such as Ranked queues.</li>
                <li>Restricted access to social systems and features in any of Riot's games.</li>
                <li>Removal of content found to be obtained inappropriately.</li>
                <li>Temporary or indefinite suspension from VALORANT, or all of Riot's games.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="bg-[#ece8e3] py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="text-4xl font-tungsten uppercase text-[#0f1923] tracking-tight mb-8">RELATED ARTICLES</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/news/announcements/beginners-guide" className="group">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/news/tier-lists.jpg"
                      alt="Beginner's Guide"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      <span className="text-[#ff4655] text-xs uppercase">Announcements</span>
                      <span className="text-[#768079] mx-2 text-xs">•</span>
                      <span className="text-[#768079] text-xs">8/2/2024</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0f1923] group-hover:text-[#ff4655] transition-colors">
                      Beginner's Guide
                    </h3>
                    <p className="text-sm text-[#768079]">Wanna get good at VALORANT? Here's your first stop.</p>
                  </div>
                </div>
              </Link>

              <Link href="/news/announcements/valorant-community-code" className="group">
                <div className="bg-white overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/news/masters-toronto.jpg"
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityCodePage;
