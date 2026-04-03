import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black">
        <span className="text-zinc-900 dark:text-white text-sm font-medium">About LumoUX</span>
      </div>

      <p className="text-center text-zinc-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 md:mb-16">
        Clear, functional, human-centered UI/UX design.
      </p>

      <div className={`flex flex-col ${isAboutPage ? '' : 'md:flex-row'} items-center gap-8 md:gap-12 w-full max-w-4xl`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative shrink-0 ${isAboutPage ? 'w-64 h-64 md:w-96 md:h-96 mb-8' : 'w-56 h-56 md:w-80 md:h-80'}`}
        >
          <div className="absolute inset-0 rounded-full glow-gradient-border p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                alt="Gabi Radu - UI/UX Designer"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 p-1 rounded-[2rem] md:rounded-3xl glow-gradient-border w-full"
        >
          <div className={`bg-white dark:bg-black rounded-[1.9rem] md:rounded-[1.7rem] p-6 md:p-10 h-full flex flex-col justify-center ${isAboutPage ? 'items-start text-left' : 'items-center md:items-start text-center md:text-left'}`}>
            <div className="text-zinc-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6 space-y-4">
              <p>
                Hi, I'm Gabi Radu. I run LumoUX, a design-only studio where I partner with web developers to deliver production-ready Figma files and design handoffs.
              </p>
              
              {isAboutPage && (
                <>
                  <p>
                    I specialize in creating intuitive, user-centered interfaces that feel natural, guide behavior seamlessly, and create enjoyable digital experiences people genuinely love using.
                  </p>
                  <p>
                    Whether it's a SaaS product, a startup landing page, or a complete brand identity, my goal is to bring clarity to your design and help your product stand out in the noise.
                  </p>
                  <p>
                    Let's create something extraordinary together!
                  </p>
                </>
              )}
            </div>
            
            {!isAboutPage && (
              <Link to="/about" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-500 dark:hover:text-purple-300 transition-colors inline-flex items-center gap-2 mt-2">
                More about me
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}

            {isAboutPage && (
              <div className="mt-8 flex justify-start w-full">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
