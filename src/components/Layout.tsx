import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import Hero from "./Hero";
import Chatbot from "./Chatbot";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Layout() {
  const { pathname } = useLocation();
  const [showHeroSetting, setShowHeroSetting] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.showHero !== undefined) {
            setShowHeroSetting(data.showHero);
          }
        }
      } catch (error) {
        console.error("Error fetching hero settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const showHero = ['/', '/about', '/services', '/contact', '/portfolio'].includes(pathname) && showHeroSetting;

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
