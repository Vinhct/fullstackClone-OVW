'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900">
      <div className="text-center max-w-md mx-auto p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-red-500 mb-4">Hero Not Found</h2>
          <p className="text-gray-300 mb-6">We couldn't find the hero you're looking for.</p>
          
          <Link href="/heroes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Heroes
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
