import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 80, height = 80, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 500 500"
      width={width}
      height={height}
      className={className}
    >
      {/* Definitions */}
      <defs>
        {/* Black hole event horizon gradient */}
        <radialGradient id="eventHorizonGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
          <stop offset="85%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#151515", stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Accretion disk inner glow */}
        <radialGradient id="accretionInnerGlow" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: "#3E1358", stopOpacity: 0 }} />
          <stop offset="80%" style={{ stopColor: "#6919A8", stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: "#A31FFF", stopOpacity: 0.6 }} />
        </radialGradient>
        
        {/* Accretion disk outer gradient */}
        <radialGradient id="accretionDiskGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="60%" style={{ stopColor: "#000000", stopOpacity: 0 }} />
          <stop offset="75%" style={{ stopColor: "#270F45", stopOpacity: 0.7 }} />
          <stop offset="85%" style={{ stopColor: "#3E1665", stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 0 }} />
        </radialGradient>
        
        {/* Light bending effect */}
        <linearGradient id="lightBendingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: "#FFFFFF", stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
        </linearGradient>
        
        {/* Outer space gradient */}
        <radialGradient id="spaceGradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: "#0C0118", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
        </radialGradient>
        
        {/* Gravitational wave gradients */}
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#D7E1EE", stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: "#D7E1EE", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "#D7E1EE", stopOpacity: 0 }} />
        </linearGradient>
        
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#ADA1FF", stopOpacity: 0 }} />
          <stop offset="50%" style={{ stopColor: "#ADA1FF", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "#ADA1FF", stopOpacity: 0 }} />
        </linearGradient>
        
        {/* Filters */}
        <filter id="blackHoleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="distortionEffect" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" seed="1" />
          <feDisplacementMap in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" scale="5" />
        </filter>
        
        {/* Star particle effect for the background */}
        <pattern id="stars" width="400" height="400" patternUnits="userSpaceOnUse">
          <rect width="400" height="400" fill="none" />
          <circle cx="20" cy="20" r="0.8" fill="#FFFFFF" opacity="0.6" />
          <circle cx="80" cy="50" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="160" cy="30" r="0.6" fill="#FFFFFF" opacity="0.5" />
          <circle cx="220" cy="70" r="0.4" fill="#FFFFFF" opacity="0.3" />
          <circle cx="280" cy="20" r="0.7" fill="#FFFFFF" opacity="0.5" />
          <circle cx="340" cy="90" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="40" cy="130" r="0.6" fill="#FFFFFF" opacity="0.4" />
          <circle cx="100" cy="170" r="0.5" fill="#FFFFFF" opacity="0.5" />
          <circle cx="180" cy="150" r="0.4" fill="#FFFFFF" opacity="0.3" />
          <circle cx="240" cy="120" r="0.7" fill="#FFFFFF" opacity="0.6" />
          <circle cx="300" cy="160" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="360" cy="140" r="0.6" fill="#FFFFFF" opacity="0.5" />
          <circle cx="60" cy="220" r="0.4" fill="#FFFFFF" opacity="0.3" />
          <circle cx="120" cy="280" r="0.7" fill="#FFFFFF" opacity="0.5" />
          <circle cx="200" cy="240" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="260" cy="200" r="0.6" fill="#FFFFFF" opacity="0.5" />
          <circle cx="320" cy="260" r="0.5" fill="#FFFFFF" opacity="0.3" />
          <circle cx="380" cy="220" r="0.4" fill="#FFFFFF" opacity="0.4" />
          <circle cx="30" cy="320" r="0.6" fill="#FFFFFF" opacity="0.5" />
          <circle cx="90" cy="340" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="150" cy="380" r="0.4" fill="#FFFFFF" opacity="0.3" />
          <circle cx="210" cy="360" r="0.7" fill="#FFFFFF" opacity="0.6" />
          <circle cx="270" cy="330" r="0.6" fill="#FFFFFF" opacity="0.5" />
          <circle cx="330" cy="370" r="0.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="390" cy="310" r="0.4" fill="#FFFFFF" opacity="0.3" />
        </pattern>
      </defs>
      
      {/* Background star field */}
      <circle cx="250" cy="250" r="250" fill="url(#spaceGradient)" />
      <circle cx="250" cy="250" r="250" fill="url(#stars)" opacity="0.7" />
      
      {/* Gravitational waves / spacetime ripples */}
      <g opacity="0.6">
        <ellipse cx="250" cy="250" rx="220" ry="220" fill="none" stroke="url(#waveGradient1)" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="200" ry="200" fill="none" stroke="url(#waveGradient1)" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="180" ry="180" fill="none" stroke="url(#waveGradient1)" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="160" ry="160" fill="none" stroke="url(#waveGradient1)" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="140" ry="140" fill="none" stroke="url(#waveGradient2)" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="120" ry="120" fill="none" stroke="url(#waveGradient2)" strokeWidth="1" />
      </g>
      
      {/* Accretion disk - angled perspective */}
      <g transform="translate(250, 250) rotate(20)">
        <ellipse cx="0" cy="0" rx="110" ry="40" fill="url(#accretionDiskGradient)" filter="url(#blackHoleGlow)" />
      </g>
      
      {/* Inner accretion glow */}
      <circle cx="250" cy="250" r="95" fill="url(#accretionInnerGlow)" />
      
      {/* Black hole event horizon */}
      <circle cx="250" cy="250" r="70" fill="url(#eventHorizonGradient)" />
      
      {/* Light bending effect rays */}
      <g opacity="0.6" filter="url(#distortionEffect)">
        <path d="M250,150 C270,170 280,200 250,250" stroke="url(#lightBendingGradient)" strokeWidth="2" fill="none" />
        <path d="M350,250 C330,270 300,280 250,250" stroke="url(#lightBendingGradient)" strokeWidth="2" fill="none" />
        <path d="M250,350 C230,330 220,300 250,250" stroke="url(#lightBendingGradient)" strokeWidth="2" fill="none" />
        <path d="M150,250 C170,230 200,220 250,250" stroke="url(#lightBendingGradient)" strokeWidth="2" fill="none" />
        
        <path d="M190,170 C220,190 240,220 250,250" stroke="url(#lightBendingGradient)" strokeWidth="1.5" fill="none" />
        <path d="M330,190 C310,220 290,240 250,250" stroke="url(#lightBendingGradient)" strokeWidth="1.5" fill="none" />
        <path d="M310,330 C280,310 260,280 250,250" stroke="url(#lightBendingGradient)" strokeWidth="1.5" fill="none" />
        <path d="M170,310 C190,280 210,260 250,250" stroke="url(#lightBendingGradient)" strokeWidth="1.5" fill="none" />
      </g>
      
      {/* Highlights on accretion disk */}
      <g transform="translate(250, 250) rotate(20)">
        <ellipse cx="0" cy="0" rx="90" ry="30" fill="none" stroke="#B771FF" strokeWidth="1" opacity="0.8" />
        <ellipse cx="0" cy="0" rx="100" ry="35" fill="none" stroke="#8144B3" strokeWidth="0.5" opacity="0.5" />
      </g>
      
      {/* Bright flare - representing emerging truth */}
      <circle cx="280" cy="235" r="3" fill="#FFFFFF" filter="url(#blackHoleGlow)" />
      
      {/* Additional star points */}
      <circle cx="190" cy="130" r="1" fill="#FFFFFF" opacity="0.8" />
      <circle cx="310" cy="370" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="380" cy="210" r="1" fill="#FFFFFF" opacity="0.9" />
      <circle cx="120" cy="290" r="1" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
};

export default Logo; 