import Link from "next/link";
import Image from "next/image";

const MapsSection = () => {
  return (
    <section className="py-20 bg-overwatch-bg-dark text-white relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-overwatch-blue opacity-10 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-overwatch-blue-light opacity-10 rounded-full"></div>
      
      {/* Hexagon patterns - Overwatch style */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-20 right-1/4 w-40 h-40 border-2 border-overwatch-blue rotate-30"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 border-2 border-overwatch-blue rotate-45"></div>
      </div>

      <div className="valorant-container relative z-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 order-2 lg:order-2 mb-10 lg:mb-0 lg:pl-16">
            <h2 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-8">
              LOCATIONS
            </h2>
            <p className="overwatch-subheading uppercase text-lg mb-4 font-bold">
              BATTLE ACROSS THE GLOBE
            </p>
            <p className="mb-8 text-white/90 leading-relaxed">
              From the technological marvel of Busan to the sun-drenched streets of Havana, the heroes of Overwatch fight across diverse and vibrant locations around the world. Each map offers unique strategic opportunities and breathtaking vistas that bring the optimistic future of Overwatch to life.
            </p>
            <Link href="/maps" className="overwatch-btn-primary">
              EXPLORE LOCATIONS
            </Link>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <Image
                src="/images/maps-collection.jpg"
                alt="Overwatch Locations"
                width={600}
                height={500}
                className="object-cover rounded-md shadow-lg"
              />

              {/* Blue glow effects */}
              <div className="absolute -top-2 -left-2 w-full h-full border-t-2 border-l-2 border-overwatch-blue opacity-50 rounded-tl-md"></div>
              <div className="absolute -bottom-2 -right-2 w-full h-full border-b-2 border-r-2 border-overwatch-blue-light opacity-50 rounded-br-md"></div>

              {/* Map overlay element */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-overwatch-blue-dark/90 to-transparent p-6">
                <div className="text-white">
                  <div className="uppercase text-sm font-bold">Featured Location</div>
                  <div className="uppercase text-3xl font-bold">NUMBANI</div>
                </div>
              </div>

              {/* Map location markers */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-overwatch-blue rounded-full animate-ping"></div>
              <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-overwatch-orange rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapsSection;
