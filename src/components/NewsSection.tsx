import Link from "next/link";
import Image from "next/image";

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "NEW HERO SPOTLIGHT: MAUGA",
      category: "HERO UPDATE",
      date: "December 5, 2023",
      image: "/images/news-1.jpg",
      excerpt: "Meet Mauga, the newest Tank hero joining the Overwatch roster.",
    },
    {
      id: 2,
      title: "SEASON 8 BATTLE PASS REVEALED",
      category: "GAME UPDATE",
      date: "November 28, 2023",
      image: "/images/news-2.jpg",
      excerpt: "Explore all the rewards coming in the Season 8 Battle Pass.",
    },
    {
      id: 3,
      title: "WINTER WONDERLAND EVENT RETURNS",
      category: "EVENT",
      date: "December 12, 2023",
      image: "/images/news-3.jpg",
      excerpt: "Get ready for festive fun with the annual Winter Wonderland event.",
    },
  ];

  return (
    <section className="py-20 bg-overwatch-bg-light relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-overwatch-blue opacity-5 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-overwatch-blue-light opacity-5 rounded-full transform translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Hexagon patterns - Overwatch style */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-overwatch-blue rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 border-2 border-overwatch-blue rotate-12"></div>
      </div>

      <div className="valorant-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="overwatch-heading text-6xl md:text-7xl uppercase tracking-tight leading-none mb-6 text-overwatch-blue-dark">
            LATEST NEWS
          </h2>
          <p className="overwatch-subheading uppercase text-lg mb-4 text-overwatch-blue-dark font-bold">
            STAY UP TO DATE WITH OVERWATCH
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02] hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-overwatch-blue text-white px-4 py-1 text-sm font-bold">
                  {item.category}
                </div>
              </div>
              <div className="p-6 border-t-4 border-overwatch-blue">
                <span className="text-sm text-gray-500 mb-2 block">{item.date}</span>
                <h3 className="text-xl font-bold mb-3 text-overwatch-blue-dark">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.excerpt}</p>
                <Link href={`/news/${item.id}`} className="text-overwatch-blue font-bold hover:underline">
                  READ MORE →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news" className="overwatch-btn-secondary inline-block">
            VIEW ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
