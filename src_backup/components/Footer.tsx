export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-12 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">LumoUX</span>
          </div>
          <a href="mailto:gabi@lumouxdesign.eu" className="text-gray-400 hover:text-white transition-colors text-sm">
            gabi@lumouxdesign.eu
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a href="https://www.instagram.com/rhadooss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://www.facebook.com/rhadooss/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          <a href="https://www.linkedin.com/in/gabi-radu-63a024263/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://dribbble.com/LumoUX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
          <a href="https://www.upwork.com/freelancers/~01e4ba91f88f2f35e5?mp_source=share" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Upwork</a>
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
