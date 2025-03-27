import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { checkSupabaseConnection } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "VALORANT: A 5v5 Character-Based Tactical FPS - Riot Games",
  description: "Riot Games presents VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities. Learn about VALORANT and its stylish cast",
};

// Kiểm tra kết nối Supabase khi ứng dụng khởi động trong môi trường phát triển
if (process.env.NODE_ENV === 'development') {
  console.log('Checking Supabase connection...');
  // Việc này không chặn render vì không phải là async/await trong môi trường client
  checkSupabaseConnection().then(connected => {
    if (connected) {
      console.log('✅ Supabase connection OK');
    } else {
      console.error('❌ Supabase connection failed - realtime updates may not work');
    }
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`} suppressHydrationWarning>
        <div className="relative">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
