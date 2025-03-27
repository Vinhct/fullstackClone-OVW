import Link from "next/link";
import Image from "next/image";

export default function ValentinesDayPage() {
  return (
    <div className="min-h-screen bg-valorant-light">
      {/* Hero Section */}
      <section className="bg-valorant-red py-12 md:py-20 relative overflow-hidden">
        <div className="valorant-container relative z-10">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <div className="text-white font-din uppercase text-sm mb-2">COMMUNITY</div>
              <h1 className="font-tungsten text-white text-6xl md:text-7xl uppercase tracking-wide mb-2">
                LOVE IS IN THE LOBBY: COMMUNITY CREATED CONTENT FOR V-DAY
              </h1>
              <div className="text-white/70 text-sm font-din">02/28/2025</div>
              <div className="mt-6 text-white/90 space-y-4">
                <p className="font-din text-lg">
                  Our favorite duos, Valentine's Day cards, and more from the VALORANT community.
                </p>
              </div>
            </div>
            <div className="md:w-3/5 relative h-full min-h-[240px] md:min-h-[320px]">
              <Image
                src="/images/news/valentines-day.jpg"
                alt="VALORANT Valentine's Day"
                fill
                className="object-cover object-center rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 transform rotate-45 translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute top-12 left-4 w-24 h-24 bg-white opacity-5 transform -rotate-12"></div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-valorant-light">
        <div className="valorant-container">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-12">
              <p className="font-din text-lg mb-6">
                Valentine's Day might be over, but the love for VALORANT continues! We've been blown away by all the incredible creations from our talented community this year. From hilarious Agent pairings to heartfelt artwork, you've all shown your passion for the game in the most creative ways.
              </p>
              <p className="font-din text-lg">
                Here's a roundup of some of our favorite community-created content that had us feeling the love this Valentine's Day.
              </p>
            </div>

            {/* Agent Pairs Section */}
            <div className="mb-16">
              <h2 className="font-tungsten text-4xl uppercase mb-6">DYNAMIC DUOS</h2>
              <p className="font-din mb-8">
                The VALORANT community has spoken! These agent pairings continue to be fan favorites both on and off the battlefield.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="h-0 pb-[56.25%] relative">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="font-din text-gray-500">Jett & Phoenix Fan Art</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-din uppercase text-xl font-bold mb-2">JETT & PHOENIX</h3>
                  <p className="font-din text-gray-700">
                    The ever-competitive duo with fiery chemistry both in lore and gameplay. Artists love to capture their playful rivalry!
                  </p>
                </div>

                <div className="bg-white p-6 rounded-md shadow-sm">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="h-0 pb-[56.25%] relative">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="font-din text-gray-500">Sage & Reyna Fan Art</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-din uppercase text-xl font-bold mb-2">SAGE & REYNA</h3>
                  <p className="font-din text-gray-700">
                    Life and death, a classic pairing that continues to inspire beautiful artwork from our community artists.
                  </p>
                </div>
              </div>
            </div>

            {/* Valentine's Cards */}
            <div className="mb-16">
              <h2 className="font-tungsten text-4xl uppercase mb-6">AGENT VALENTINES</h2>
              <p className="font-din mb-8">
                Who needs store-bought cards when the VALORANT community makes cards like these? Perfect for sharing with your duo queue partner!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="aspect-square bg-pink-100 rounded mb-3 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="font-din text-valorant-red font-bold">"Heal my heart like you heal in game"</p>
                      <p className="text-sm mt-2">- Sage Valentine</p>
                    </div>
                  </div>
                  <p className="font-din text-sm text-gray-600">Created by @ValorantArtist01</p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="aspect-square bg-pink-100 rounded mb-3 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="font-din text-valorant-red font-bold">"You've got my attention, and I never miss"</p>
                      <p className="text-sm mt-2">- Chamber Valentine</p>
                    </div>
                  </div>
                  <p className="font-din text-sm text-gray-600">Created by @ValoFanArt22</p>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="aspect-square bg-pink-100 rounded mb-3 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="font-din text-valorant-red font-bold">"My flash may be blinding, but so is my love for you"</p>
                      <p className="text-sm mt-2">- Skye Valentine</p>
                    </div>
                  </div>
                  <p className="font-din text-sm text-gray-600">Created by @AgentCards</p>
                </div>
              </div>
            </div>

            {/* Community Screenshots */}
            <div className="mb-12">
              <h2 className="font-tungsten text-4xl uppercase mb-6">LOBBY LOVE</h2>
              <p className="font-din mb-8">
                Players went all out this year with coordinated Agent selections, clever usernames, and heartfelt messages in chat.
              </p>

              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-3">
                      <div className="h-0 pb-[56.25%] relative">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="font-din text-gray-500">Heart-shaped Ability Usage</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-din text-sm text-gray-700">
                      Players creating hearts with Viper's Poison Cloud and Brimstone's Sky Smoke abilities!
                    </p>
                  </div>

                  <div>
                    <div className="aspect-w-16 aspect-h-9 mb-3">
                      <div className="h-0 pb-[56.25%] relative">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="font-din text-gray-500">Couple Usernames</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-din text-sm text-gray-700">
                      Matching usernames like "JettMyHeart" and "PhoenixRising" made for adorable duo queue partners.
                    </p>
                  </div>
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
