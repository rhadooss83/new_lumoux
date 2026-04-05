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
          scrolled 
            ? "top-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-lg" 
            : "top-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        )}
      >
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <img src="/logo-dot.svg" alt="LumoUX Logo" className="w-5 h-5" />
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
                  ? "text-purple-600 dark:text-purple-400 underline underline-offset-4"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
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
            className="btn-glow px-6 py-2.5 m-1 rounded-full text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-all duration-300"
          >
            Request a Design
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
            initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] right-4 w-[220px] z-40"
          >
            <div 
              className="rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white"
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-base font-medium py-2 px-3 rounded-lg transition-colors",
                    location.pathname === link.path
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-white/5"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-2" />
              <Link
                to="/contact"
                className="btn-glow block w-full py-3 my-1 rounded-xl text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center hover:scale-105 transition-all"
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
