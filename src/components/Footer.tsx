import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-overwatch-blue-dark text-white">
      {/* Download App Section */}
      <div className="text-center py-4 bg-overwatch-blue">
        <Link href="https://blizzard.com/apps" className="font-bold text-sm uppercase">
          Download Blizzard Battle.net App
        </Link>
      </div>

      {/* Social Links */}
      <div className="py-6 flex flex-wrap justify-center gap-6 border-t border-overwatch-blue-light/30">
        <a href="https://twitter.com/playoverwatch" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C18.46 4.24 17.73 3.97 16.98 3.97C15.93 3.97 14.95 4.42 14.23 5.13C13.51 5.84 13.06 6.82 13.06 7.87V8.79C9.1 8.79 6.15 6.84 4 4.01C4 4.01 0 13 8.08 17C6.5 18.09 4.5 18.18 2 18C4.2 19.25 6.8 19.5 9 19.5C16 19.5 20.04 13.86 20.04 8.79V8.23C20.04 8.23 21.92 5.5 22 4.01Z" fill="currentColor"/>
          </svg>
          Twitter
        </a>
        <a href="https://www.youtube.com/@PlayOverwatch" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C12 4 6.4 4 4.4 4.4C3.4 4.6 2.4 5.6 2.2 6.6C2 8.6 2 12 2 12C2 12 2 15.4 2.2 17.4C2.4 18.4 3.4 19.4 4.4 19.6C6.4 20 12 20 12 20C12 20 17.6 20 19.6 19.6C20.6 19.4 21.6 18.4 21.8 17.4C22 15.4 22 12 22 12C22 12 22 8.6 21.8 6.6C21.6 5.6 20.6 4.6 19.6 4.4C17.6 4 12 4 12 4ZM10 8.4L16 12L10 15.6V8.4Z" fill="currentColor"/>
          </svg>
          YouTube
        </a>
        <a href="https://instagram.com/playoverwatch" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="currentColor"/>
          </svg>
          Instagram
        </a>
        <a href="https://www.tiktok.com/@playoverwatch" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6 5.82C15.9165 5.03962 15.5397 4.03743 15.54 3H12.45V15.4C12.4247 15.9509 12.1757 16.4673 11.7533 16.8465C11.3309 17.2257 10.7705 17.4396 10.19 17.44C9.00103 17.44 8.01 16.56 8.01 15.36C8.01 13.93 9.45 12.87 10.94 13.42V10.26C7.84 9.91 5.1 12.35 5.1 15.36C5.1 18.27 7.56 20.5 10.19 20.5C13 20.5 15.35 18.15 15.35 15.36V9.01C16.6276 9.90985 18.1371 10.4137 19.7 10.47V7.35C19.7 7.35 17.96 7.46 16.6 5.82Z" fill="currentColor"/>
          </svg>
          TikTok
        </a>
        <a href="https://www.facebook.com/PlayOverwatch/" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="currentColor"/>
          </svg>
          Facebook
        </a>
        <a href="https://discord.gg/playoverwatch" target="_blank" rel="noreferrer" className="flex items-center text-sm font-bold hover:text-overwatch-blue-light transition">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.89 4.19 14.67 4.49 14.53 4.72C12.93 4.5 11.36 4.5 9.8 4.72C9.66 4.48 9.43 4.19 9.32 4C7.82 4.26 6.37 4.71 5.05 5.33C2.58 9.04 1.88 12.64 2.23 16.19C4 17.47 5.7 18.26 7.38 18.79C7.73 18.32 8.05 17.82 8.32 17.29C7.78 17.08 7.26 16.81 6.78 16.51C6.92 16.41 7.06 16.3 7.19 16.2C9.94 17.5 12.98 17.5 15.69 16.2C15.83 16.3 15.97 16.41 16.1 16.51C15.61 16.82 15.09 17.08 14.55 17.29C14.82 17.82 15.14 18.32 15.49 18.79C17.18 18.26 18.88 17.47 20.65 16.19C21.06 12.06 19.97 8.5 19.27 5.33ZM8.57 14C7.7 14 6.98 13.21 6.98 12.25C6.98 11.29 7.68 10.5 8.57 10.5C9.45 10.5 10.17 11.29 10.15 12.25C10.15 13.21 9.44 14 8.57 14ZM15.3 14C14.42 14 13.7 13.21 13.7 12.25C13.7 11.29 14.4 10.5 15.3 10.5C16.18 10.5 16.9 11.29 16.88 12.25C16.88 13.21 16.17 14 15.3 14Z" fill="currentColor"/>
          </svg>
          Discord
        </a>
      </div>

      {/* Blizzard Logo */}
      <div className="flex justify-center py-4">
        <a href="http://www.blizzard.com/" target="_blank" rel="noreferrer">
          <Image src="/images/blizzard-logo.svg" alt="Blizzard Entertainment" width={80} height={30} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 pb-6">
        <p> 2016-{new Date().getFullYear()} Blizzard Entertainment, Inc. OVERWATCH and any associated logos are trademarks, service marks, and/or registered trademarks of Blizzard Entertainment, Inc.</p>
      </div>

      {/* Legal Links */}
      <div className="flex justify-center space-x-6 pb-12 text-sm font-bold">
        <a href="https://www.blizzard.com/en-us/legal/8c41e7e6-0b61-4fbb-a1a0-ef2aeec8cc21/blizzard-entertainment-privacy-policy" className="hover:text-overwatch-blue-light transition">Privacy Policy</a>
        <a href="https://www.blizzard.com/en-us/legal/fba4d00f-c7e4-4883-b8b9-1b4500a402ea/blizzard-end-user-license-agreement" className="hover:text-overwatch-blue-light transition">Terms of Service</a>
        <button className="hover:text-overwatch-blue-light transition">Cookie Settings</button>
      </div>

      {/* ESRB Rating */}
      <div className="flex justify-center pb-8">
        <div className="flex items-center bg-black p-2 rounded">
          <Image src="/images/esrb.png" alt="ESRB" width={60} height={80} className="mr-3" />
          <div className="text-xs">
            <p>Teen</p>
            <p>Blood</p>
            <p>Use of Tobacco</p>
            <p>Violence</p>
            <p>Users Interact</p>
            <p>In-Game Purchases</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
