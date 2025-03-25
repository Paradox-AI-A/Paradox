import React from 'react';
import { motion } from 'framer-motion';
import { RARITY_COLORS, RARITY_ICONS } from '../../utils/constants';

export interface TruthFragmentProps {
  id: string;
  name: string;
  description: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
  obtained?: boolean;
  onClick?: () => void;
  className?: string;
  animationDelay?: number;
}

const TruthFragment: React.FC<TruthFragmentProps> = ({
  id,
  name,
  description,
  rarity = 'common',
  obtained = true,
  onClick,
  className = '',
  animationDelay = 0
}: TruthFragmentProps) => {
  // Get colors and icon based on rarity from constants
  const colors = RARITY_COLORS[rarity];
  const icon = RARITY_ICONS[rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`relative ${colors.bg} ${colors.border} rounded-lg p-4 border ${
        obtained ? '' : 'opacity-50'
      } ${onClick ? 'cursor-pointer hover:shadow-md transition' : ''} ${className}`}
      onClick={obtained && onClick ? onClick : undefined}
    >
      <div className="flex items-start">
        <div className="text-3xl mr-3">{icon}</div>
        <div>
          <h3 className={`font-bold ${colors.text}`}>{name}</h3>
          <p className="text-gray-300 text-sm mt-1">{description}</p>
          {!obtained && (
            <div className="text-xs text-gray-400 mt-2 flex items-center">
              <span className="mr-1">🔒</span> Not yet discovered
            </div>
          )}
        </div>
      </div>
      
      {/* Rarity badge */}
      <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-black/30 text-white capitalize">
        {rarity}
      </div>
    </motion.div>
  );
};

export default TruthFragment; 