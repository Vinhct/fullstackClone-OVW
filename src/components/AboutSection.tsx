import Link from "next/link";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 bg-overwatch-bg-light">
      <div className="valorant-container">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-16">
            <h2 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-8 text-overwatch-blue-dark">
              ABOUT<br />OVERWATCH
            </h2>
            <h3 className="overwatch-subheading uppercase text-lg mb-4 text-overwatch-blue-dark font-bold">
              A FUTURE WORTH FIGHTING FOR
            </h3>
            <p className="mb-6 text-gray-800 leading-relaxed">
              Team up with friends in this team-based shooter set in an optimistic future. 
              Choose your hero from a diverse cast of soldiers, scientists, adventurers, and oddities. 
              Work together to complete objectives, and battle in 5v5 matches across the globe in 
              various game modes. Every match is an intense multiplayer showdown pitting a diverse cast 
              of heroes against one another.
            </p>
            <Link href="/news/announcements/beginners-guide" className="overwatch-btn-primary">
              LEARN THE GAME
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square relative lg:aspect-auto lg:h-full">
              <Image
                src="/images/about-valorant.jpg"
                alt="Overwatch Gameplay"
                className="object-cover h-full w-full rounded-md shadow-lg"
                width={600}
                height={500}
              />

              {/* Blue accent elements - Overwatch style */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-4 border-overwatch-blue rounded-full opacity-70"></div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 border-3 border-overwatch-blue-light rounded-full opacity-50"></div>

              {/* Stats counter-like elements */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-overwatch-blue-dark/80 to-transparent p-6">
                <div className="flex space-x-8">
                  <div>
                    <div className="text-white font-bold text-4xl">5v5</div>
                    <div className="text-white/80 text-sm uppercase font-bold">Team Play</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-4xl">30+</div>
                    <div className="text-white/80 text-sm uppercase font-bold">Heroes</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-4xl">∞</div>
                    <div className="text-white/80 text-sm uppercase font-bold">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
