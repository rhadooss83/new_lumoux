import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center pt-40 pb-20 px-4 min-h-[80vh] justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          LumoUX Design Studio
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter flex flex-col items-center gap-2">
          <span className="text-zinc-100">Crafting Digital</span>
          <span className="relative z-10 px-8 py-2 glow-gradient-border rounded-full text-gradient mt-2">
            Experiences
          </span>
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed mb-10 mt-6"
      >
        Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/portfolio"
          className="px-8 py-4 rounded-full text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
        >
          View Portfolio
        </Link>
        <Link
          to="/services"
          className="px-8 py-4 rounded-full text-sm font-bold text-zinc-300 bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all duration-300"
        >
          Our Services
        </Link>
      </motion.div>
    </div>
  );
}
