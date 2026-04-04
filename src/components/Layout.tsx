import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import Hero from "./Hero";
import Chatbot from "./Chatbot";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const showHero = ['/', '/about', '/services', '/contact', '/portfolio'].includes(pathname);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-purple-500/30">
      <Background />
      <Navbar />
      
      <main className="flex-grow flex flex-col relative z-10">
        {showHero && <Hero />}
        <Outlet />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
