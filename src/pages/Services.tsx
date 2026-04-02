import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, Palette, MonitorSmartphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const services = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that users love to navigate.",
    expandedText: "I design intuitive, user-centered interfaces that feel natural, guide behavior seamlessly, and create enjoyable digital experiences people genuinely love using.",
    icon: LayoutTemplate,
  },
  {
    title: "Brand Identity",
    description: "Crafting memorable brands that stand out in the noise.",
    expandedText: "I build distinctive, meaningful brands that cut through noise, connect emotionally with audiences, and leave lasting impressions across every touchpoint.",
    icon: Palette,
  },
  {
    title: "Logo Design",
    description: "Turning ideas into high-quality logos.",
    expandedText: "I transform ideas into high-quality, timeless logos that communicate identity clearly, balance aesthetics with strategy, and elevate brand recognition instantly.",
    icon: MonitorSmartphone,
  },
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number, isServicesPage: boolean }> = ({ service, index, isServicesPage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-1 rounded-[2rem] glow-gradient-border card-hover transition-all duration-300 ${isServicesPage ? '' : 'hover:scale-105'}`}
    >
      <div className="bg-black rounded-[1.9rem] p-6 md:p-8 h-full flex flex-col items-center text-center">
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
            <service.icon className="w-8 h-8 text-white" />
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
            <service.icon className="w-8 h-8 text-white" />
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
            <service.icon className="w-8 h-8 text-white" />
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
            <service.icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <h4 className="text-xl font-semibold mb-3 md:mb-4 text-white">{service.title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed min-h-[2.5rem] md:min-h-[3rem]">{service.description}</p>
        
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
                <p className="text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">
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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-black">
        <span className="text-white text-sm font-medium">Creative Expertise & Services</span>
      </div>

      <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 md:mb-16">
        Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-sm md:max-w-none mx-auto items-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} isServicesPage={isServicesPage} />
        ))}
      </div>

      {isServicesPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 w-full max-w-3xl p-1 rounded-[2rem] glow-gradient-border"
        >
          <div className="bg-black rounded-[1.9rem] p-6 md:p-10 text-center">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              UI/UX Design Studio, Product Design, Web Design for Startups, SaaS Design, Branding Identity.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              User Research, Wireframing & Prototyping, High-fidelity UI, Human-centric design. Digital design solutions for tech founders, Conversion-focused landing pages, Minimalist brand identity systems.
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-12 md:mt-16 flex justify-center">
        <Link
          to="/contact"
          className="px-8 py-3 rounded-full text-sm font-semibold text-zinc-900 hover-glow-gradient-border hover:scale-105 transition-all duration-300"
        >
          Request a Design
        </Link>
      </div>
    </div>
  );
}
