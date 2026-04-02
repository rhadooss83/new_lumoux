import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <Link
        to="/contact"
        className={cn(
          "hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110",
          scrolled 
            ? "bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
            : "bg-white border border-purple-200 text-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        )}
      >
        Request a Design
      </Link>

      {/* Mobile Menu Button - simplified for this demo */}
      <button className={cn("md:hidden p-2", scrolled ? "text-white" : "text-gray-600")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </nav>
  );
}
