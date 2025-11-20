import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SECTIONS } from '../constants';
import { SectionType } from '../types';

interface RevolverNavProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const RevolverNav: React.FC<RevolverNavProps> = ({ activeSection, onSectionChange }) => {
  const [rotation, setRotation] = useState(0);
  
  // Calculate indices to determine rotation target
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  
  useEffect(() => {
    // Target rotation: we want the active item to be at roughly 0 degrees (or a specific anchor point)
    // Let's say anchor is at 270deg (top) or 0deg (right).
    // If we distribute items around a circle, separation is 360 / count.
    const anglePerItem = 360 / SECTIONS.length;
    const targetRotation = -activeIndex * anglePerItem;
    setRotation(targetRotation);
  }, [activeIndex]);

  return (
    <div className="fixed bottom-[-150px] right-[-150px] w-[400px] h-[400px] z-50 flex items-center justify-center pointer-events-none">
      {/* Interactive Area */}
      <motion.div 
        className="relative w-full h-full pointer-events-auto"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        style={{ borderRadius: '50%' }}
      >
        {/* Central Hub / Decoration */}
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-black shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
        </div>
        
        {/* Ring */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full border border-white/20 border-dashed animate-spin-slow" style={{ animationDuration: '60s' }} />

        {/* Items */}
        {SECTIONS.map((section, index) => {
          const angle = (360 / SECTIONS.length) * index;
          const isActive = section.id === activeSection;
          
          return (
            <div
              key={section.id}
              className="absolute top-1/2 left-1/2 w-[300px] h-[40px] origin-left flex items-center"
              style={{
                transform: `translateY(-50%) rotate(${angle}deg) translateX(60px)`, // Push out from center
              }}
            >
              <button
                onClick={() => onSectionChange(section.id)}
                className={`
                  group relative flex items-center gap-4 px-4 py-2 transition-all duration-300
                  ${isActive ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80 scale-100'}
                `}
              >
                 {/* Line connecting to center */}
                 <div className={`h-[1px] bg-white transition-all duration-300 ${isActive ? 'w-12' : 'w-4 group-hover:w-8'}`} />
                 
                 {/* Label */}
                 <span className="text-xl font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 whitespace-nowrap">
                   {section.label}
                 </span>
              </button>
            </div>
          );
        })}
      </motion.div>
      
      {/* Static Indicator (The "Needle") */}
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[2px] bg-gradient-to-r from-transparent to-red-500 pointer-events-none transform -translate-y-1/2" style={{ zIndex: -1 }} />
    </div>
  );
};

export default RevolverNav;
