import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hoverEffect = false,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={hoverEffect ? { 
        y: -5, 
        boxShadow: "0px 10px 30px rgba(255, 122, 0, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.5)"
      } : {}}
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-2xl p-6 shadow-xl text-white transition-colors
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};