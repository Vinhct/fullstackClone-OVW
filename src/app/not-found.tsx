import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-valorant-dark text-white p-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-tungsten uppercase tracking-tight text-valorant-red">404</h1>
        <h2 className="text-2xl md:text-4xl font-tungsten uppercase mt-4 mb-8">Page Not Found</h2>
        <p className="mb-8 text-white/70 font-din">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link href="/" className="btn-valorant px-8 py-3 font-din uppercase font-bold tracking-wide">
          Return Home
        </Link>
      </div>
    </div>
  );
}
