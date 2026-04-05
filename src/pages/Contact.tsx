import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [content, setContent] = useState<any>({
    contactTitle: 'Contact LumoUX',
    contactSubtitle1: 'Contact LumoUX UI/UX design studio. Get in touch with me, Gabi Radu, for web design collaborations, branding projects, or freelance UI/UX work.',
    contactSubtitle2: 'Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.',
    contactHomeText1: 'Currently taking on new projects for Summer 2026.',
    contactHomeText2: 'Design-only studio — I partner with web developers to deliver production-ready Figma files and design handoffs. Let\'s create something extraordinary together!'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            contactTitle: data.contactTitle || content.contactTitle,
            contactSubtitle1: data.contactSubtitle1 || content.contactSubtitle1,
            contactSubtitle2: data.contactSubtitle2 || content.contactSubtitle2,
            contactHomeText1: data.contactHomeText1 || content.contactHomeText1,
            contactHomeText2: data.contactHomeText2 || content.contactHomeText2
          });
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      place: formData.get("place") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "messages"), data);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please try again or contact via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="text-zinc-500 dark:text-zinc-400/80 blur-[2px] transition-all duration-700 hover:blur-none hover:text-zinc-900 dark:hover:text-white cursor-default">Ready to bring</span>
            <span className="relative z-10 px-6 py-2 md:px-8 md:py-4 bg-zinc-200/40 dark:bg-white/5 backdrop-blur-md border border-zinc-300/50 dark:border-white/10 rounded-full text-zinc-900 dark:text-white glass-glow">
              Clarity
            </span>
            <span className="text-zinc-500 dark:text-zinc-400/80 blur-[2px] transition-all duration-700 hover:blur-none hover:text-zinc-900 dark:hover:text-white cursor-default">to your design?</span>
          </h2>

          <div className="rounded-[2rem] glow-gradient-border mt-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-black rounded-[2rem] px-6 py-5 md:px-8 md:py-6 flex items-start gap-4 text-left">
              <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] shrink-0"></span>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-800 dark:text-gray-200 text-sm md:text-base font-medium">
                  {content.contactHomeText1}
                </span>
                <span className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  {content.contactHomeText2}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      {isContactPage && (
        <Helmet>
          <title>Contact | LumoUX Design Studio</title>
          <meta name="description" content="Get in touch with LumoUX for web design collaborations, branding projects, or freelance UI/UX work." />
        </Helmet>
      )}
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black">
        <span className="text-zinc-900 dark:text-white text-sm font-medium">{content.contactTitle}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl rounded-[2rem] md:rounded-3xl glow-gradient-border mt-8"
      >
        <div className="bg-white dark:bg-black rounded-[2rem] md:rounded-3xl p-6 md:p-10 h-full flex flex-col">
          <div className="text-zinc-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-10 space-y-4 text-center md:text-left">
            <p>
              {content.contactSubtitle1}
            </p>
            <p>
              {content.contactSubtitle2}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="place" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Place</label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  required
                  className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Service Required</label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
              >
                <option value="" disabled>Select a service...</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="brand">Brand Identity</option>
                <option value="logo">Logo Design</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors resize-y"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="mt-4 flex flex-col items-center md:items-start gap-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`btn-glow px-8 py-3 rounded-full text-sm font-bold border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${
                  isSubmitted 
                    ? "bg-green-500 text-white" 
                    : "text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 hover:scale-105"
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
