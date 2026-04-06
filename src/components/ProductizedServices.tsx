import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultPricingCategories = [
  {
    title: "Web Design Packages",
    description: "Transparent pricing for high-quality web design. Choose the package that fits your current needs.",
    offers: [
      { title: "Starter Website", price: "€80 – €200", target: "For clients with nothing yet", features: ["1–3 pages", "Modern UI", "Mobile responsive", "Basic branding"], outcome: "Launch your online presence fast", popular: false },
      { title: "Website Redesign", price: "€150 – €250", target: "For clients with bad sites", features: ["UX audit", "Full redesign", "Improved structure", "Conversion optimization"], outcome: "Turn your current website into a conversion tool", popular: true },
      { title: "Landing Page", price: "€40 – €100", target: "For ads / products", features: ["Conversion-focused design", "Clear call-to-actions", "Fast loading", "Mobile optimized"], outcome: "Designed to convert visitors into customers", popular: false }
    ]
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions to improve your digital product.",
    offers: [
      { title: "UI Page Design", price: "€40 – €90", target: "Clean, modern design for a single page", features: ["1 page (home or landing)", "Desktop + mobile version", "Clean layout & hierarchy"], outcome: "A beautiful, functional single page", popular: false },
      { title: "Multi-Page UI Design", price: "€100 – €220", target: "Consistent design across multiple pages", features: ["3–5 pages", "Consistent style system", "Basic UX structure"], outcome: "A cohesive multi-page experience", popular: true },
      { title: "UX + UI Improvement", price: "€120 – €250", target: "Improve usability of an existing site", features: ["Quick UX audit", "Redesigned key pages", "Better structure + flow"], outcome: "Enhanced usability and clarity", popular: false }
    ]
  },
  {
    title: "Brand Identity",
    description: "Distinctive visual identities that connect with your audience.",
    offers: [
      { title: "Basic Brand Starter", price: "€50 – €120", target: "Simple brand foundation to get started", features: ["Logo design", "Color palette", "Font pairing"], outcome: "A solid starting point for your brand", popular: false },
      { title: "Brand Identity Kit", price: "€120 – €280", target: "A consistent visual identity", features: ["Logo + variations", "Colors + typography", "Simple brand guidelines"], outcome: "A professional, cohesive brand image", popular: true },
      { title: "Full Brand Identity", price: "€200 – €400", target: "A complete visual system", features: ["Logo system", "Colors & typography", "Brand usage guidelines", "Mockups (social/media)"], outcome: "A strong, recognizable brand presence", popular: false }
    ]
  },
  {
    title: "Logo Design",
    description: "Timeless logos that communicate your identity clearly.",
    offers: [
      { title: "Simple Logo", price: "€20 – €50", target: "Clean and minimal logo", features: ["1 concept", "1 revision", "High-res files"], outcome: "A simple, effective logo", popular: false },
      { title: "Logo + Variations", price: "€50 – €120", target: "Flexible logo for different uses", features: ["2–3 concepts", "Variations (icon, horizontal)", "2 revisions"], outcome: "A versatile logo system", popular: true },
      { title: "Logo Pack", price: "€100 – €180", target: "Complete logo system for your brand", features: ["Multiple concepts", "Full set of variations", "Basic brand styling"], outcome: "Everything you need for your logo", popular: false }
    ]
  }
];

export default function ProductizedServices({ isHome = false }: { isHome?: boolean }) {
  const [categories, setCategories] = useState(defaultPricingCategories);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data.pricingCategories || defaultPricingCategories);
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };
    fetchContent();
  }, []);

  const displayCategories = isHome ? categories.slice(0, 1) : categories;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-24">
      {displayCategories.map((category, catIndex) => (
        <section key={catIndex} className="w-full">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black mb-6">
              <span className="text-zinc-900 dark:text-white text-sm font-medium">{category.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-6">
              {category.title}
            </h2>
            <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {category.offers.map((offer: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[2rem] p-8 flex flex-col h-full ${
                  offer.popular 
                    ? 'bg-zinc-900 dark:bg-zinc-900 border border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.15)]' 
                    : 'bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${offer.popular ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                    {offer.title}
                  </h3>
                  <div className={`text-sm font-medium mb-4 ${offer.popular ? 'text-purple-300' : 'text-purple-600 dark:text-purple-400'}`}>
                    {offer.target}
                  </div>
                  <div className={`text-3xl font-display font-bold ${offer.popular ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                    {offer.price}
                  </div>
                </div>

                <div className={`flex-grow mb-8 ${offer.popular ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
                  <ul className="space-y-4">
                    {offer.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${offer.popular ? 'text-purple-400' : 'text-purple-500'}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-5 rounded-2xl mb-8 ${offer.popular ? 'bg-white/5 border border-white/10' : 'bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800'}`}>
                  <div className="text-xs uppercase tracking-wider font-bold mb-2 opacity-70">Outcome</div>
                  <div className={`text-sm font-medium italic ${offer.popular ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                    "{offer.outcome}"
                  </div>
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(offer.title)}`}
                  className={`w-full py-4 rounded-full text-sm font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                    offer.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
