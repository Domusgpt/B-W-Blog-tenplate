import React, { useState } from 'react';
import { SectionType } from './types';
import { SECTIONS, MOCK_ARTICLES } from './constants';
import RevolverNav from './components/RevolverNav';
import Visualizer from './components/Visualizer';
import MorphingCard from './components/MorphingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.HOME);

  const currentArticles = MOCK_ARTICLES[activeSection] || [];
  // First article is the "Hero", rest are standard
  const heroArticle = currentArticles[0];
  const listArticles = currentArticles.slice(1);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Background Visualizer */}
      <Visualizer section={activeSection} />

      {/* Header / Brand */}
      <header className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-start pointer-events-none mix-blend-difference">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase pointer-events-auto">
            Vib3<span className="text-neutral-500">code</span>
          </h1>
          <p className="text-xs font-mono tracking-[0.5em] mt-2 uppercase opacity-70">
            {SECTIONS.find(s => s.id === activeSection)?.label || 'SYSTEM'}
          </p>
        </div>
        <div className="hidden md:block text-right">
            <div className="text-xs font-mono">LAT: 40.7128 N</div>
            <div className="text-xs font-mono">LON: 74.0060 W</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-20 px-4 md:px-12 min-h-screen flex flex-col">
        
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex-1 max-w-7xl mx-auto w-full"
          >
            {/* Section Intro */}
            <div className="mb-16 max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                {SECTIONS.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed border-l-2 border-white/20 pl-6">
                Curated selection of thoughts, experiments, and visual essays regarding the {activeSection.toLowerCase()} landscape.
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Hero Area (Left/Top) */}
              <div className="lg:col-span-7">
                {heroArticle && <MorphingCard article={heroArticle} />}
              </div>

              {/* Secondary List (Right/Bottom) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {listArticles.length > 0 ? listArticles.map(article => (
                   <div key={article.id} className="group relative p-6 border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                         <span className="text-xs font-mono text-neutral-500">{article.date}</span>
                         <ArrowDown size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{article.title}</h3>
                      <p className="text-sm text-neutral-400 line-clamp-3">{article.excerpt}</p>
                   </div>
                )) : (
                  <div className="h-full flex items-center justify-center border border-white/5 border-dashed p-10 opacity-50">
                     <span className="font-mono text-xs">NO ADDITIONAL RECORDS FOUND</span>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </main>

      {/* Navigation System */}
      <RevolverNav activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Footer Decos */}
      <div className="fixed bottom-6 left-6 z-40 text-[10px] font-mono text-neutral-600 pointer-events-none">
         STATUS: ONLINE<br />
         RENDER: D3/REACT
      </div>

    </div>
  );
};

export default App;
