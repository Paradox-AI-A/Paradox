import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 200, height = 200, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Paradox Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </div>
  );
};

export default Logo; 