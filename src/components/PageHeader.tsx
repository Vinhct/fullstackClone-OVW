"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="relative py-12 mb-8 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-900/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            backgroundSize: "200% 200%",
            backgroundPosition: "center"
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 