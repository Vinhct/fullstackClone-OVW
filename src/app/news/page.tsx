"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import Link from "next/link";

// Cập nhật type NewsItem để khớp với cấu trúc từ database
type NewsItem = {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  image_url?: string;
  published: boolean;
  publish_date?: string;
  created_at: string;
  description?: string; // Giữ lại để tương thích với UI hiện tại
  imageSrc?: string; // Giữ lại để tương thích với UI hiện tại
  date?: string; // Giữ lại để tương thích với UI hiện tại
  link?: string; // Giữ lại để tương thích với UI hiện tại
};

// Dữ liệu mẫu dùng làm fallback nếu không kết nối được database
const fallbackNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "OVERWATCH Patch Notes 10.05",
    summary: "Ranked Rollbacks are now live along with some minor bug fixes.",
    category: "Game Updates",
    image_url: "/images/news/patch-10-05.jpg",
    published: true,
    publish_date: "2025-03-18T10:00:00Z",
    created_at: "2025-03-15T15:30:00Z",
    description: "Ranked Rollbacks are now live along with some minor bug fixes."
  },
  {
    id: "2",
    title: "Masters Toronto: Live audience and ticket sale information",
    summary: "We're thrilled to announce that tickets for OVERWATCH Masters Toronto will be available starting March 25!",
    category: "Esports",
    image_url: "/images/news/masters-toronto.jpg",
    published: true,
    publish_date: "2025-03-18T12:00:00Z",
    created_at: "2025-03-14T09:45:00Z",
    description: "We're thrilled to announce that tickets for OVERWATCH Masters Toronto will be available starting March 25 at 7 AM PT / 10 AM ET!"
  }
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lấy dữ liệu tin tức từ Supabase
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('published', true)
          .order('publish_date', { ascending: false });
          
        if (error) {
          console.error('Lỗi khi tải tin tức:', error);
          setError('Không thể tải tin tức. Sử dụng dữ liệu mẫu thay thế.');
          setNewsItems(fallbackNewsItems);
        } else if (data && data.length > 0) {
          // Chuyển đổi dữ liệu từ Supabase sang định dạng cần thiết
          const formattedData = data.map(item => ({
            ...item, 
            date: item.publish_date ? format(new Date(item.publish_date), 'M/d/yyyy') : 'N/A',
            imageSrc: item.image_url || '/images/news/default.jpg',
            link: `/news/${item.id}`,
            description: item.summary
          }));
          setNewsItems(formattedData);
          console.log('Đã tải tin tức từ Supabase:', formattedData.length);
        } else {
          console.log('Không tìm thấy tin tức từ Supabase, sử dụng dữ liệu mẫu.');
          setNewsItems(fallbackNewsItems);
        }
      } catch (err) {
        console.error('Lỗi ngoại lệ khi tải tin tức:', err);
        setError('Đã xảy ra lỗi. Sử dụng dữ liệu mẫu thay thế.');
        setNewsItems(fallbackNewsItems);
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    }

    fetchNews();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredNews = activeFilter === "ALL"
    ? newsItems
    : newsItems.filter(item => item.category === activeFilter);

  // Lấy danh sách các danh mục duy nhất từ tin tức
  const categories = Array.from(new Set(newsItems.map(item => item.category))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Background with news collage effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Main banner image */}
          <Image 
            src="/images/news/news-banner-main.jpg" 
            alt="Overwatch News Banner" 
            fill 
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/95 z-10"></div>
          
          {/* News grid background effect */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 opacity-40 z-0">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image 
                  src={`/images/news/news-${(index % 5) + 1}.jpg`} 
                  alt="" 
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Animated lines */}
          <div className="absolute inset-0 z-20">
            <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue to-transparent animate-pulse"></div>
            <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          {/* Digital particles effect */}
          <div className="absolute inset-0 z-20">
            {[...Array(20)].map((_, index) => (
              <div 
                key={index}
                className="absolute bg-primary-blue/30 rounded-full animate-ping"
                style={{
                  width: `${Math.random() * 10 + 2}px`,
                  height: `${Math.random() * 10 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative py-32 z-30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1 border border-primary-blue/50 bg-primary-blue/10 rounded-full">
                <span className="text-primary-blue text-sm font-medium tracking-wider uppercase">Latest Updates</span>
              </div>
              
              <h1 className="overwatch-heading text-5xl md:text-7xl lg:text-8xl mb-6 text-white">
                OVERWATCH <span className="text-primary-blue">NEWS FEED</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay informed with the latest game updates, esports events, and community highlights from around the Overwatch universe
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto mt-8">
                <input 
                  type="text" 
                  placeholder="Search news articles..." 
                  className="w-full bg-gray-800/80 border border-gray-700 text-white px-5 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Featured categories */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {categories.slice(0, 3).map(category => (
                  <a 
                    key={category} 
                    href={`#${category?.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white hover:bg-primary-blue/20 hover:border-primary-blue/50 transition-all"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="relative py-16 bg-black bg-opacity-80 z-20">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <FilterTabs 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            categories={categories}
          />

          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
            </div>
          ) : error ? (
            // Error state
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6 my-8 max-w-3xl mx-auto">
              <h3 className="text-xl text-red-400 mb-2">Không thể tải tin tức</h3>
              <p className="text-white mb-4">{error}</p>
              <p className="text-gray-300 text-sm">Đang hiển thị dữ liệu mẫu thay thế.</p>
            </div>
          ) : filteredNews.length === 0 ? (
            // Empty state
            <div className="text-center py-16">
              <h3 className="text-2xl text-white mb-4">Không có tin tức</h3>
              <p className="text-gray-400">Không tìm thấy tin tức trong danh mục này.</p>
              <button 
                onClick={() => setActiveFilter("ALL")}
                className="mt-6 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors"
              >
                Xem tất cả tin tức
              </button>
            </div>
          ) : (
            // News Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {filteredNews.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} isLoaded={isLoaded} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

type FilterTabsProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  categories: (string | undefined)[];
};

const FilterTabs = ({ activeFilter, setActiveFilter, categories }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center mb-8 gap-2">
      <button
        onClick={() => setActiveFilter("ALL")}
        className={`px-5 py-2 rounded-full font-medium transition-all ${
          activeFilter === "ALL"
            ? "bg-primary-blue text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        }`}
      >
        All News
      </button>

      {/* Hiển thị các danh mục từ dữ liệu */}
      {categories.map((category) => (
        category && (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              activeFilter === category
                ? "bg-primary-blue text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        )
      ))}
    </div>
  );
};

const NewsCard = ({ item, index, isLoaded }: { item: NewsItem, index: number, isLoaded: boolean }) => {
  // Format date if available
  const formattedDate = item.publish_date 
    ? format(new Date(item.publish_date), 'MM/dd/yyyy')
    : (item.date || 'N/A');
    
  // Use image_url or fallback to imageSrc from old format
  const imageUrl = item.image_url || item.imageSrc || '/images/news/default.jpg';
  
  // Get link
  const newsLink = item.link || `/news/${item.id}`;
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={variants}
      className="group"
    >
      <Link href={newsLink} passHref className="block h-full">
        <div className="bg-gray-800 rounded-xl overflow-hidden h-full transition-all duration-300 transform group-hover:translate-y-[-5px] group-hover:shadow-lg group-hover:shadow-primary-blue/20">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-primary-blue/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {item.category || "News"}
            </div>
            
            {/* Date */}
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary-blue transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {item.summary || item.description || ""}
            </p>
            <div className="text-primary-blue font-medium text-sm flex items-center">
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
