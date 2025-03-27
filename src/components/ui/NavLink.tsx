"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  hoverEffect?: 'underline' | 'glow' | 'scale' | 'color' | 'none';
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = '',
  hoverEffect = 'underline',
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  
  const isActive = pathname === href;
  
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'underline':
        return 'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--primary-blue)] hover:after:w-full after:transition-all after:duration-300';
      case 'glow':
        return 'transition-all duration-300 hover:text-[var(--primary-blue)] hover:drop-shadow-[0_0_8px_rgba(33,143,254,0.8)]';
      case 'scale':
        return 'transition-transform duration-300 hover:scale-110';
      case 'color':
        return 'transition-colors duration-300 hover:text-[var(--primary-blue)]';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <Link 
      href={href}
      className={`
        ${className} 
        ${isActive ? activeClassName : ''} 
        ${getHoverEffectClass()}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Optional animated dot for active state */}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary-blue)] rounded-full" />
      )}
    </Link>
  );
};

export default NavLink;
