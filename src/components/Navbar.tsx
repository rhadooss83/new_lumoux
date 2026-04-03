import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];

  const glassStyle = {
    background: "linear-gradient(90deg, rgba(71, 85, 105, 0.15), rgba(49, 46, 129, 0.15))",
    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(71, 85, 105, 0.15), inset 0 0 10px rgba(255,255,255,0.05)",
    border: "1px solid rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed left-1/2 -translate-x-1/2 w-[95%] max-w-6xl rounded-full px-6 py-3 flex justify-between items-center z-50 transition-all duration-500",
          scrolled ? "top-4 text-white" : "top-6 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        )}
        style={scrolled ? glassStyle : undefined}
      >
        <Link to="/" className="text-xl font-bold tracking-tight">
          LumoUX
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "transition-colors",
                location.pathname === link.path
                  ? (scrolled ? "text-purple-400 underline underline-offset-4" : "text-purple-600 underline underline-offset-4")
                  : (scrolled ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-purple-600")
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/contact"
            className="btn-glow px-5 py-2 rounded-full text-sm font-bold text-zinc-900 bg-white hover:scale-110 transition-all duration-300"
          >
            Request a Design
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className={cn("p-2", scrolled ? "text-white" : "text-gray-600 dark:text-gray-300")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, originTopRight: true }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] right-4 w-[220px] z-40"
          >
            <div 
              className={cn(
                "rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border",
                scrolled 
                  ? "bg-black/90 backdrop-blur-xl border-white/10 text-white" 
                  : "bg-white/95 backdrop-blur-xl border-gray-200 text-black"
              )}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-base font-medium py-1.5 px-2 rounded-lg transition-colors",
                    location.pathname === link.path
                      ? (scrolled ? "text-purple-400 bg-white/5" : "text-purple-600 bg-purple-50")
                      : (scrolled ? "text-gray-300 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-purple-600 hover:bg-purple-50")
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-gray-500/20 my-1" />
              <Link
                to="/contact"
                className="btn-glow text-center px-4 py-2.5 rounded-full text-sm font-bold text-zinc-900 bg-white hover:scale-105 transition-all mt-1"
              >
                Request a Design
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
