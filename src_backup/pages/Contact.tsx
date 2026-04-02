import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  if (!isContactPage) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8">
            <span className="text-zinc-400/80 blur-[2px] transition-all duration-700 hover:blur-none hover:text-white cursor-default">Ready to bring</span>
            <span className="relative z-10 px-6 py-2 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Clarity
            </span>
            <span className="text-zinc-400/80 blur-[2px] transition-all duration-700 hover:blur-none hover:text-white cursor-default">to your design?</span>
          </h2>

          <div className="p-1 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] mt-8">
            <div className="bg-black rounded-full px-8 py-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              <span className="text-gray-300 text-sm md:text-base font-medium">
                Currently taking on new projects for Summer 2026...
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <span className="text-white text-sm font-medium">Contact LumoUX</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl p-6 md:p-10 rounded-[2rem] md:rounded-3xl border border-white/10 bg-black shadow-[0_0_15px_rgba(255,255,255,0.05)] mt-8"
      >
        <div className="h-full flex flex-col">
          <div className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 space-y-4 text-center md:text-left">
            <p>
              Contact LumoUX UI/UX design studio. Get in touch with me, Gabi Radu, for web design collaborations, branding projects, or freelance UI/UX work.
            </p>
            <p>
              Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="place" className="text-sm font-medium text-gray-400">Place</label>
                <input
                  type="text"
                  id="place"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-gray-400">Service Required</label>
              <select
                id="service"
                required
                defaultValue=""
                className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
              >
                <option value="" disabled>Select a service...</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="brand">Brand Identity</option>
                <option value="logo">Logo Design</option>
              </select>
            </div>

            <div className="mt-4 flex justify-center md:justify-start">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110 ${
                  isSubmitted 
                    ? "bg-green-500 text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                    : "text-black bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                }`}
              >
                {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
