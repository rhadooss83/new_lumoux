import Portfolio from "./Portfolio";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [settings, setSettings] = useState({
    showPortfolio: true,
    showServices: true,
    showAbout: true,
    showContact: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            showPortfolio: data.showPortfolio !== undefined ? data.showPortfolio : true,
            showServices: data.showServices !== undefined ? data.showServices : true,
            showAbout: data.showAbout !== undefined ? data.showAbout : true,
            showContact: data.showContact !== undefined ? data.showContact : true
          });
        }
      } catch (error) {
        console.error("Error fetching home settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Helmet>
        <title>LumoUX Design Studio | Premium UI/UX Design Services</title>
        <meta name="description" content="LumoUX is a premium UI/UX design studio specializing in clear, functional, human-centered design for startups and founders." />
      </Helmet>
      {settings.showPortfolio && <Portfolio isHome={true} />}
      {settings.showServices && <Services />}
      {settings.showAbout && <About />}
      {settings.showContact && <Contact />}
    </div>
  );
}
