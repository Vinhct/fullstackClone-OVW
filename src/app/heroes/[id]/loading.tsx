'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-4xl font-bold text-white mb-4">
          LOADING HERO
        </div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-overwatch-blue"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
