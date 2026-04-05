export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-12 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">LumoUX</span>
          </div>
          <a href="mailto:rhadooss83@gmail.com" className="text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
            rhadooss83@gmail.com
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500 dark:text-gray-400">
          <a href="https://www.facebook.com/rhadooss/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Facebook</a>
          <a href="https://www.instagram.com/rhadooss" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Instagram</a>
          <a href="https://www.upwork.com/freelancers/~01e4ba91f88f2f35e5" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Upwork</a>
          <a href="https://dribbble.com/LumoUX" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Dribbble</a>
          <a href="https://www.linkedin.com/in/gabi-radu-63a024263/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 text-center md:text-left">
        <p className="text-xs text-zinc-400 dark:text-gray-600">
          © {new Date().getFullYear()} LumoUX Design Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
