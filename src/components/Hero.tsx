import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [content, setContent] = useState<any>({
    heroTitle: 'Websites that turn visitors into customers',
    heroSubtitle: 'I help startups and small brands build clean, modern websites that actually bring results — without the high agency cost.',
    showHeroCTA: true
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            heroTitle: data.heroTitle || content.heroTitle, 
            heroSubtitle: data.heroSubtitle || content.heroSubtitle,
            showHeroCTA: data.showHeroCTA !== undefined ? data.showHeroCTA : true
          });
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-40 pb-20 px-4 min-h-[80vh] justify-center overflow-hidden">
      {/* Background Brand Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-zinc-900/20 dark:text-white/20 blur-[2px] tracking-[0.2em] select-none pointer-events-none z-0">
        CLARITY
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6 flex flex-col items-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          LumoUX Design Studio
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-zinc-900 dark:text-white mb-6 max-w-4xl mx-auto">
          {content.heroTitle}
        </h1>
        
        <p className="text-zinc-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          {content.heroSubtitle}
        </p>
      </motion.div>

      {content.showHeroCTA && (
        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.7)] hover:scale-105 transition-all duration-300 text-center"
            >
              👉 Get your free website audit
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 shadow-sm text-center"
            >
              View Portfolio
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span>Free</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
            <span>No commitment</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
            <span>Quick feedback</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
