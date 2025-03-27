import Link from "next/link";
import Image from "next/image";

type NewsItem = {
  date: string;
  category: string;
  title: string;
  imageSrc: string;
  link: string;
};

const newsItems: NewsItem[] = [
  {
    date: "3/20/2025",
    category: "Esports",
    title: "Watch the VCT Americas 2025 Stage 1 Trailer",
    imageSrc: "/images/news-vct.jpg",
    link: "https://www.youtube.com/watch?v=hU1Y5yjgd00"
  },
  {
    date: "3/18/2025",
    category: "Esports",
    title: "Masters Toronto: Live audience and ticket sale information",
    imageSrc: "/images/news-masters.jpg",
    link: "/news/esports/masters-toronto-2025"
  },
  {
    date: "3/15/2025",
    category: "Esports",
    title: "Pros Make Player Tier Lists",
    imageSrc: "/images/news-tier-lists.jpg",
    link: "/news/esports/pro-tier-lists-2025"
  }
];

const LatestNewsSection = () => {
  return (
    <section className="py-12 bg-valorant-light">
      <div className="valorant-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-tungsten text-4xl md:text-5xl uppercase">THE LATEST</h2>
          <Link href="/news" className="text-valorant-red hover:underline font-din uppercase text-sm">
            GO TO NEWS PAGE
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="block group"
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              <div className="relative overflow-hidden">
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
                <div className="absolute top-0 left-0 bg-valorant-red text-white text-xs font-din uppercase px-3 py-1">
                  {item.category}
                </div>
                <div className="absolute top-0 right-0 bg-valorant-dark text-white text-xs font-din px-3 py-1">
                  {item.date}
                </div>
              </div>
              <h3 className="font-bold mt-2 text-lg group-hover:text-valorant-red transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
