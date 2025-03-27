import Link from "next/link";
import Image from "next/image";

const SeasonSection = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-valorant-light">
      <div className="valorant-container relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col justify-center mb-10 md:mb-0">
            <h2 className="font-tungsten text-6xl md:text-8xl uppercase tracking-tight leading-none mb-2">
              SEASON <br />2025 // ACT II
            </h2>
            <p className="font-din uppercase tracking-wide text-xl mb-8">
              WAYLAY'S TIME TO SHINE
            </p>
            <Link
              href="https://www.youtube.com/watch?v=njK6KgRNr2k"
              className="bg-valorant-red hover:bg-opacity-90 text-white px-8 py-3 inline-block font-bold tracking-wide uppercase w-max transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              WATCH NOW
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <div className="h-0 pb-[56.25%] relative">
                <Image
                  src="/images/season-waylay.jpg"
                  alt="Season 2025 Act II - Waylay"
                  className="absolute inset-0 w-full h-full object-cover"
                  width={600}
                  height={340}
                />
              </div>
            </div>

            {/* Purple geometric shapes for background effect */}
            <div className="absolute -top-10 -right-20 w-32 h-32 bg-purple-500 opacity-60 transform rotate-45 blur-sm"></div>
            <div className="absolute -bottom-10 right-20 w-24 h-24 bg-purple-600 opacity-40 transform rotate-12 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent"></div>
      <div className="absolute top-1/4 left-10 w-16 h-16 bg-valorant-red opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-1/4 right-1/4 w-8 h-20 bg-valorant-red opacity-10 transform -rotate-12"></div>
    </section>
  );
};

export default SeasonSection;
