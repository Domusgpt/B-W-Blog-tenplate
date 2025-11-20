import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '../types';
import { X, Loader2 } from 'lucide-react';
import { generateBlogContent } from '../services/geminiService';

interface MorphingCardProps {
  article: Article;
}

const MorphingCard: React.FC<MorphingCardProps> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !aiContent) {
      setLoading(true);
      generateBlogContent(article.title).then(text => {
        setAiContent(text);
        setLoading(false);
      });
    }
  }, [isOpen, article.title, aiContent]);

  return (
    <>
      <motion.div
        layoutId={`card-container-${article.id}`}
        onClick={() => setIsOpen(true)}
        className="relative w-full h-[400px] cursor-pointer group overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm transition-colors hover:border-white/30"
      >
        {/* Background Image */}
        <motion.img
          layoutId={`card-image-${article.id}`}
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
        />
        
        {/* Content Overlay (Closed) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
          <motion.span layoutId={`card-date-${article.id}`} className="text-xs text-neutral-400 mb-2 font-mono tracking-widest">
            {article.date}
          </motion.span>
          <motion.h2 layoutId={`card-title-${article.id}`} className="text-3xl font-bold uppercase leading-tight mb-2">
            {article.title}
          </motion.h2>
          <motion.p layoutId={`card-excerpt-${article.id}`} className="text-sm text-neutral-300 line-clamp-2 max-w-[90%]">
            {article.excerpt}
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-container-${article.id}`}
              className="relative w-full max-w-4xl h-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-none"
            >
              {/* Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white hover:text-black transition-colors border border-white/20"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image & Header */}
              <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
                <motion.img
                  layoutId={`card-image-${article.id}`}
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />
                
                <div className="absolute bottom-6 left-6 right-6">
                    <motion.span layoutId={`card-date-${article.id}`} className="text-xs text-neutral-400 font-mono tracking-widest block mb-2">
                        {article.date} // EXPANDED VIEW
                    </motion.span>
                    <motion.h2 layoutId={`card-title-${article.id}`} className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter text-white">
                        {article.title}
                    </motion.h2>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 h-full overflow-y-auto no-scrollbar p-8 md:p-12 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                   <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">
                     Analysis & Insight
                   </h3>

                   <p className="text-lg text-neutral-200 leading-relaxed mb-8 font-light">
                     {article.content}
                   </p>

                   <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-4">
                        AI GENERATED INSIGHT {loading && <Loader2 className="animate-spin" size={14} />}
                      </h4>
                      <div className="text-sm text-neutral-400 font-mono leading-relaxed">
                        {loading ? (
                          <span className="animate-pulse">Analyzing content stream... Syncing with Gemini...</span>
                        ) : (
                          aiContent
                        )}
                      </div>
                   </div>

                   {/* Footer Tags */}
                   <div className="mt-12 flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MorphingCard;
