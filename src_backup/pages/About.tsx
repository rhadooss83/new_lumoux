import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-6 inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <span className="text-white text-sm font-medium">About LumoUX</span>
      </div>

      <p className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 md:mb-16">
        Clear. Functional. Human.
      </p>

      <div className={`flex flex-col ${isAboutPage ? '' : 'md:flex-row'} items-center gap-8 md:gap-12 w-full max-w-4xl`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative shrink-0 ${isAboutPage ? 'w-64 h-64 md:w-96 md:h-96 mb-8' : 'w-56 h-56 md:w-80 md:h-80'}`}
        >
          <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.3)] p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src="/profile.webp"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 p-6 md:p-10 rounded-[2rem] md:rounded-3xl border border-white/10 bg-black shadow-[0_0_15px_rgba(255,255,255,0.05)] w-full"
        >
          <div className={`h-full flex flex-col justify-center ${isAboutPage ? 'items-start text-left' : 'items-center md:items-start text-center md:text-left'}`}>
            <div className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 space-y-4">
              <p>
                Since 2009, I work for the family company, where I manage the design team for our products. I started by designing myself, and due to the increasing volume of work, I started a small team. Now, I coordinate the team, and advice them, thanks to my experience, about the designs they do for our customers. The passion for web design came naturally, and never left me since.
              </p>
              
              {isAboutPage && (
                <>
                  <p>
                    So, creating LumoUX was the right thing to do. By following other great designers I've learned the bases, and I am still learning, and now I can craft, all by myself, designs that impress. Clear, functional and human designs. Not templates, just pure imagination.
                  </p>
                  <p>
                    There are only 2 things you need to know about me, both important and necessary IMO.
                  </p>
                  <p>
                    First one, I like what I do, both at my job, also with LumoUX, because I am a creative person, and I love being creative.
                  </p>
                  <p>
                    The second one, is that I don't quit. No matter how hard it gets, I challenge myself until I get the desired outcome. I'm not ashamed to ask for help, when things seem to overpower me, but I don't quit!
                  </p>
                  <p>
                    That being said, I invite you to discover your new website appearence. Right here at LumoUX.
                  </p>
                </>
              )}
            </div>
            
            {!isAboutPage && (
              <Link to="/about" className="text-white font-medium hover:text-gray-300 transition-colors inline-flex items-center gap-2 mt-2">
                Read more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}

            {isAboutPage && (
              <div className="mt-8 flex justify-start w-full">
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-full text-sm font-semibold text-black bg-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Request a Design
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
