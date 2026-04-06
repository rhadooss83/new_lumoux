import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProductizedServices from "../components/ProductizedServices";

const defaultServices = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that users love to navigate.",
    expandedText: "I design intuitive, user-centered interfaces that feel natural, guide behavior seamlessly, and create enjoyable digital experiences people genuinely love using.",
    icon: "LayoutTemplate",
  },
  {
    title: "Brand Identity",
    description: "Crafting memorable brands that stand out in the noise.",
    expandedText: "I build distinctive, meaningful brands that cut through noise, connect emotionally with audiences, and leave lasting impressions across every touchpoint.",
    icon: "Palette",
  },
  {
    title: "Logo Design",
    description: "Turning ideas into high-quality logos.",
    expandedText: "I transform ideas into high-quality, timeless logos that communicate identity clearly, balance aesthetics with strategy, and elevate brand recognition instantly.",
    icon: "PenTool",
  },
  {
    title: "Web Design Packages",
    description: "Launch your online presence fast with a modern, responsive site.",
    expandedText: "Perfect for clients starting from scratch or needing a redesign. I build clean, mobile-responsive websites with basic branding to get your business online quickly and professionally.",
    icon: "Globe",
  }
];

const ServiceCard: React.FC<{ service: any, index: number, isServicesPage: boolean }> = ({ service, index, isServicesPage }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // @ts-ignore
  const IconComponent = LucideIcons[service.icon] || LucideIcons.LayoutTemplate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-[2rem] glow-gradient-border card-hover transition-all duration-300 ${isServicesPage ? '' : 'hover:scale-105'}`}
    >
      <div className="bg-white dark:bg-black rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center">
        <div className="mb-6 relative w-12 h-12 flex items-center justify-center">
          {/* Top Left */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)' }}
            animate={{ 
              x: isHovered ? 0 : -4, 
              y: isHovered ? 0 : -4,
              rotate: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 20 }}
          >
            <IconComponent className="w-8 h-8 text-zinc-900 dark:text-white" />
          </motion.div>
          {/* Top Right */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }}
            animate={{ 
              x: isHovered ? 0 : 4, 
              y: isHovered ? 0 : -4,
              rotate: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 20 }}
          >
            <IconComponent className="w-8 h-8 text-zinc-900 dark:text-white" />
          </motion.div>
          {/* Bottom Left */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' }}
            animate={{ 
              x: isHovered ? 0 : -4, 
              y: isHovered ? 0 : 4,
              rotate: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 20 }}
          >
            <IconComponent className="w-8 h-8 text-zinc-900 dark:text-white" />
          </motion.div>
          {/* Bottom Right */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}
            animate={{ 
              x: isHovered ? 0 : 4, 
              y: isHovered ? 0 : 4,
              rotate: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 20 }}
          >
            <IconComponent className="w-8 h-8 text-zinc-900 dark:text-white" />
          </motion.div>
        </div>
        <h4 className="text-xl font-semibold mb-3 md:mb-4 text-zinc-900 dark:text-white h-[3.5rem] flex items-center justify-center">{service.title}</h4>
        <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed h-[8.5rem] flex items-start justify-center">{service.description}</p>
        
        {isServicesPage && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-zinc-500 dark:text-gray-300 leading-relaxed border-t border-zinc-200 dark:border-white/10 pt-4">
                  {service.expandedText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const location = useLocation();
  const isServicesPage = location.pathname === "/services";

  const [content, setContent] = useState<any>({
    servicesTitle: 'Creative Expertise & Services',
    servicesSubtitle: 'Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.',
    servicesBottomText1: 'UI/UX Design Studio, Product Design, Web Design for Startups, SaaS Design, Branding Identity.',
    servicesBottomText2: 'User Research, Wireframing & Prototyping, High-fidelity UI, Human-centric design. Digital design solutions for tech founders, Conversion-focused landing pages, Minimalist brand identity systems.',
    servicesList: defaultServices
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            servicesTitle: data.servicesTitle || content.servicesTitle,
            servicesSubtitle: data.servicesSubtitle || content.servicesSubtitle,
            servicesBottomText1: data.servicesBottomText1 || content.servicesBottomText1,
            servicesBottomText2: data.servicesBottomText2 || content.servicesBottomText2,
            servicesList: defaultServices
          });
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      {isServicesPage && (
        <Helmet>
          <title>Services | LumoUX Design Studio</title>
          <meta name="description" content="Explore the UI/UX design, brand identity, and logo design services offered by LumoUX." />
        </Helmet>
      )}
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black">
        <span className="text-zinc-900 dark:text-white text-sm font-medium">{content.servicesTitle}</span>
      </div>

      <p className="text-center text-zinc-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 md:mb-16">
        {content.servicesSubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-sm md:max-w-none mx-auto items-start">
        {content.servicesList.map((service: any, index: number) => (
          <ServiceCard key={index} service={service} index={index} isServicesPage={isServicesPage} />
        ))}
      </div>

      {isServicesPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 w-full max-w-3xl rounded-[2rem] glow-gradient-border"
        >
          <div className="bg-white dark:bg-black rounded-[2rem] p-6 md:p-10 text-center">
            <p className="text-zinc-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              {content.servicesBottomText1}
            </p>
            <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              {content.servicesBottomText2}
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 md:mt-16 w-full max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 md:p-10"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
          This is for you if:
        </h3>
        <ul className="space-y-4 text-zinc-700 dark:text-gray-300 max-w-md mx-auto">
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold mt-0.5">•</span>
            <span>You don’t have a website yet but want to start strong</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold mt-0.5">•</span>
            <span>Your current website looks outdated or unprofessional</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold mt-0.5">•</span>
            <span>You’re not getting customers from your site</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold mt-0.5">•</span>
            <span>You want something simple, clean, and effective</span>
          </li>
        </ul>
      </motion.div>

      <div className="w-full mt-12 md:mt-16">
        <ProductizedServices isHome={!isServicesPage} />
      </div>

      <div className="mt-8 md:mt-10 flex flex-col items-center gap-4 pb-12">
        <Link
          to="/contact"
          className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.7)] hover:scale-105 transition-all duration-300 text-center"
        >
          👉 Get your free website audit
        </Link>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <span>Free</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span>No commitment</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span>Quick feedback</span>
        </div>
      </div>
    </div>
  );
}
