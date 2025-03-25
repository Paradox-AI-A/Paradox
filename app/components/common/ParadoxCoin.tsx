import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../../utils/formatters';

// Size classes mapping
type SizeOption = 'small' | 'medium' | 'large';
type SizeClasses = Record<SizeOption, { container: string; icon: string; amount: string }>;

export interface ParadoxCoinProps {
  amount: number;
  showIcon?: boolean;
  showAnimation?: boolean;
  size?: SizeOption;
  className?: string;
}

const ParadoxCoin: React.FC<ParadoxCoinProps> = ({
  amount,
  showIcon = true,
  showAnimation = false,
  size = 'medium',
  className = ''
}: ParadoxCoinProps) => {
  // Size classes for the component
  const sizeClasses: SizeClasses = {
    small: {
      container: 'text-sm',
      icon: 'text-base mr-1',
      amount: 'text-sm'
    },
    medium: {
      container: 'text-base',
      icon: 'text-xl mr-1.5',
      amount: 'text-base'
    },
    large: {
      container: 'text-lg',
      icon: 'text-2xl mr-2',
      amount: 'text-lg font-bold'
    }
  };

  const classes = sizeClasses[size];
  const formattedAmount = formatNumber(amount);
  
  const renderContent = () => (
    <div className={`flex items-center ${classes.container} ${className}`}>
      {showIcon && <span className={`${classes.icon} text-yellow-400`}>💰</span>}
      <span className={classes.amount}>{formattedAmount}</span>
    </div>
  );

  // Return with or without animation
  return showAnimation ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
    </motion.div>
  ) : (
    renderContent()
  );
};

export default ParadoxCoin; 