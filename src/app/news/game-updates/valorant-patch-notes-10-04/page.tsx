import Link from "next/link";
import Image from "next/image";

export default function PatchNotesPage() {
  return (
    <div className="min-h-screen bg-valorant-light">
      {/* Hero Section */}
      <section className="bg-valorant-dark py-12 md:py-20 relative overflow-hidden">
        <div className="valorant-container relative z-10">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-valorant-red font-din uppercase text-sm mb-2">GAME UPDATES</div>
              <h1 className="font-tungsten text-white text-6xl md:text-8xl uppercase tracking-wide mb-2">
                VALORANT PATCH NOTES 10.04
              </h1>
              <div className="text-white/70 text-sm font-din">03/04/2025</div>
              <div className="mt-6 text-white/90 space-y-4">
                <p className="font-din text-lg">
                  New Duelist: Waylay, major updates to various Agents, new map rotation, updates to Ascent, and more.
                </p>
              </div>
            </div>
            <div className="md:w-3/5 relative h-full min-h-[240px] md:min-h-[320px]">
              <Image
                src="/images/news/patch-10-04.jpg"
                alt="VALORANT Patch Notes 10.04"
                fill
                className="object-cover object-center rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-valorant-light">
        <div className="valorant-container">
          <div className="max-w-4xl mx-auto">
            {/* New Agent: Waylay */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">NEW AGENT: WAYLAY</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex flex-col md:flex-row mb-6">
                  <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                    <div className="aspect-square bg-gray-100 rounded-md relative overflow-hidden">
                      <Image
                        src="/images/news/waylay-agent.jpg"
                        alt="Waylay Agent"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="font-din uppercase text-xl font-bold text-valorant-red mb-2">WAYLAY</h3>
                    <p className="font-din text-gray-700 mb-4">
                      A new Duelist from Thailand joins the roster. Waylay will be released in a staggered rollout to all regions starting at 9:00 AM PT on March 5th.
                    </p>
                    <div className="font-din space-y-2">
                      <p className="font-bold">Role: Duelist</p>
                      <p className="font-bold">Biography:</p>
                      <p className="text-gray-700">Trained in the ancient art of light manipulation, Waylay brings a unique set of abilities to bend light and deceive enemies. As a former operative of a covert Thai intelligence agency, she now uses her skills to disrupt and disorient opponents on the battlefield.</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-din uppercase text-lg font-bold mb-3">ABILITIES</h4>
                <div className="space-y-6 font-din">
                  <div>
                    <p className="font-bold">Q - PRISM DASH</p>
                    <p className="text-gray-700 ml-4">EQUIP a light prism. FIRE to dash forward, creating a light copy that continues in your original trajectory. HOLD FIRE to adjust dash direction. Copies confuse enemies and deal 30 damage on contact.</p>
                  </div>
                  <div>
                    <p className="font-bold">E - REFRACTION</p>
                    <p className="text-gray-700 ml-4">EQUIP a light disruptor. FIRE to deploy a disruptor that, when shot, splits into 3 light beams that blind enemies looking at them. The beams last 2 seconds.</p>
                  </div>
                  <div>
                    <p className="font-bold">C - MIRAGE</p>
                    <p className="text-gray-700 ml-4">EQUIP a hologram projector. FIRE to place a stationary copy of Waylay. ALT FIRE to place a copy that runs forward. Copies will explode when shot or when enemy players move within 2m, dealing 60 damage and creating a flashpoint.</p>
                  </div>
                  <div>
                    <p className="font-bold">X - SPECTRUM SHIFT (Ultimate)</p>
                    <p className="text-gray-700 ml-4">EQUIP a light manipulator. FIRE to enter an accelerated light state for 8 seconds, becoming partially invisible and gaining increased move speed. Killing an enemy extends duration by 2 seconds. When shooting or using abilities, you briefly become visible.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Rotation */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">MAP ROTATION</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-4 font-din text-gray-700">
                  <p>
                    We're refreshing the map pool to keep the competitive and casual experience feeling fresh:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="font-bold">Ascent</span> & <span className="font-bold">Icebox</span> are back IN the COMPETITIVE and DEATHMATCH queues.</li>
                    <li><span className="font-bold">Abyss</span> & <span className="font-bold">Bind</span> are OUT of the COMPETITIVE and DEATHMATCH queues.</li>
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                      <span className="font-din text-gray-500">Ascent & Icebox Map Images</span>
                    </div>
                    <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                      <span className="font-din text-gray-500">Abyss & Bind Map Images</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ascent Updates */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">ASCENT UPDATES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-4 font-din text-gray-700">
                  <p>With Ascent returning to the map rotation, we've made some adjustments to improve gameplay:</p>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Changed part of the B Main wall along B Lane to <span className="font-bold">non-pennable</span>. This should reduce the number of wall bang kills in that area and provide more safety when navigating B Main.</li>
                    <li>Adjusted lighting in Mid Market to improve visibility.</li>
                    <li>Fixed several pixel boosts near A Site and Mid Courtyard.</li>
                    <li>Minor optimization improvements to reduce frame drops on lower-end systems.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agent Updates */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">AGENT UPDATES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-6 font-din">
                  <div>
                    <h3 className="uppercase text-xl font-bold mb-2">JETT</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Tailwind (E): Reduced dash distance by 10% to better balance her mobility with other Duelists.</li>
                      <li>Updraft (Q): Increased maximum height by 5% to provide more verticality options.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="uppercase text-xl font-bold mb-2">CHAMBER</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Headhunter (Q): Reduced aim punch when taking damage while using this ability.</li>
                      <li>Trademark (C): Increased trap detection radius from 15m to 16m.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="uppercase text-xl font-bold mb-2">PHOENIX</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Blaze (C): Increased wall length by 15% to provide better site control options.</li>
                      <li>Hot Hands (E): Now heals Phoenix 5 points more over its duration (from 50 to 55 total healing).</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="uppercase text-xl font-bold mb-2">BRIMSTONE</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Sky Smoke (Q): Slightly increased the deploy speed to make them more reactive in fast-paced situations.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bug Fixes */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-4">BUG FIXES</h2>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="space-y-4 font-din text-gray-700">
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Fixed an issue where some Agent abilities would not display correctly when spectating.</li>
                    <li>Fixed a rare bug that caused the Spike plant sound to cut off prematurely.</li>
                    <li>Fixed a UI issue in the Collection tab where some weapon skins wouldn't display their level variants correctly.</li>
                    <li>Fixed a bug where Harbor's High Tide could clip through certain terrain on Lotus.</li>
                    <li>Fixed an issue with KAY/O's ZERO/point detection sphere sometimes not properly revealing enemies.</li>
                    <li>Fixed several localization issues in non-English client versions.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back to News */}
            <div className="mt-12">
              <Link
                href="/news"
                className="flex items-center text-valorant-red hover:underline font-din uppercase font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
