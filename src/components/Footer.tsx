export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-12 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight text-white">LumoUX</span>
          </div>
          <a href="mailto:hello@lumouxdesign.eu" className="text-gray-400 hover:text-white transition-colors text-sm">
            hello@lumouxdesign.eu
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          <a href="#" className="hover:text-white transition-colors">Behance</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 text-center md:text-left">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} LumoUX Design Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
