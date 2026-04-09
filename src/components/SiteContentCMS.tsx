import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Image as ImageIcon, Save, Plus, Trash2 } from 'lucide-react';

export default function SiteContentCMS() {
  const [content, setContent] = useState<any>({
    profilePicture: '',
    aboutText: '',
    heroTitle: 'Websites that turn visitors into customers',
    heroSubtitle: 'I help startups and small brands build clean, modern websites that actually bring results — without the high agency cost.',
    portfolioTitle: 'A glimpse into my creative work.',
    servicesTitle: 'Creative Expertise & Services',
    servicesSubtitle: 'Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.',
    servicesBottomText1: 'UI/UX Design Studio, Product Design, Web Design for Startups, SaaS Design, Branding Identity.',
    servicesBottomText2: 'User Research, Wireframing & Prototyping, High-fidelity UI, Human-centric design. Digital design solutions for tech founders, Conversion-focused landing pages, Minimalist brand identity systems.',
    servicesList: [
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
        title: "Starter Websites",
        description: "Launch your online presence fast with a modern, responsive site.",
        expandedText: "Perfect for clients starting from scratch. I build clean, mobile-responsive websites (1-3 pages) with basic branding to get your business online quickly and professionally.",
        icon: "Globe",
      },
      {
        title: "Website Redesign",
        description: "Turn your outdated website into a powerful conversion tool.",
        expandedText: "I conduct a thorough UX audit and completely redesign your existing site, improving its structure, flow, and aesthetics to maximize user engagement and conversions.",
        icon: "RefreshCw",
      },
      {
        title: "Landing Pages",
        description: "High-converting pages designed specifically for your ads and products.",
        expandedText: "Focused entirely on conversion. I design fast-loading, mobile-optimized landing pages with clear call-to-actions that turn your visitors into paying customers.",
        icon: "MousePointerClick",
      }
    ],
    pricingCategories: [
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
    ],
    contactTitle: 'Contact LumoUX',tle: 'Contact LumoUX',
    contactSubtitle1: 'Contact LumoUX UI/UX design studio. Get in touch with me, Gabi Radu, for web design collaborations, branding projects, or freelance UI/UX work.',
    contactSubtitle2: 'Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.',
    contactHomeText1: 'Currently taking on new projects for Summer 2026.',
    contactHomeText2: 'Design-only studio — I partner with web developers to deliver production-ready Figma files and design handoffs. Let\'s create something extraordinary together!',
    showHero: true,
    showHeroCTA: true,
    showPortfolio: true,
    showServices: true,
    showAbout: true,
    showContact: true,
    showBottomCTA: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent({ ...content, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `site/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setContent({ ...content, profilePicture: url });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message || "Unknown error"}`);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'content'), content, { merge: true });
      alert("Site content saved successfully!");
    } catch (error) {
      console.error("Error saving site content:", error);
      alert("Error saving site content.");
    }
    setSaving(false);
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...content.servicesList];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent({ ...content, servicesList: newServices });
  };

  const addService = () => {
    setContent({
      ...content,
      servicesList: [
        ...content.servicesList,
        { title: "New Service", description: "", expandedText: "", icon: "LayoutTemplate" }
      ]
    });
  };

  const removeService = (index: number) => {
    const newServices = [...content.servicesList];
    newServices.splice(index, 1);
    setContent({ ...content, servicesList: newServices });
  };

  const handlePricingCategoryChange = (catIndex: number, field: string, value: any) => {
    const newCats = [...(content.pricingCategories || [])];
    newCats[catIndex] = { ...newCats[catIndex], [field]: value };
    setContent({ ...content, pricingCategories: newCats });
  };

  const handlePricingOfferChange = (catIndex: number, offerIndex: number, field: string, value: any) => {
    const newCats = [...(content.pricingCategories || [])];
    const newOffers = [...newCats[catIndex].offers];
    newOffers[offerIndex] = { ...newOffers[offerIndex], [field]: value };
    newCats[catIndex] = { ...newCats[catIndex], offers: newOffers };
    setContent({ ...content, pricingCategories: newCats });
  };

  const handlePricingFeatureChange = (catIndex: number, offerIndex: number, featureIndex: number, value: string) => {
    const newCats = [...(content.pricingCategories || [])];
    const newOffers = [...newCats[catIndex].offers];
    const newFeatures = [...newOffers[offerIndex].features];
    newFeatures[featureIndex] = value;
    newOffers[offerIndex] = { ...newOffers[offerIndex], features: newFeatures };
    newCats[catIndex] = { ...newCats[catIndex], offers: newOffers };
    setContent({ ...content, pricingCategories: newCats });
  };

  const addPricingFeature = (catIndex: number, offerIndex: number) => {
    const newCats = [...(content.pricingCategories || [])];
    const newOffers = [...newCats[catIndex].offers];
    newOffers[offerIndex] = { 
      ...newOffers[offerIndex], 
      features: [...newOffers[offerIndex].features, "New Feature"] 
    };
    newCats[catIndex] = { ...newCats[catIndex], offers: newOffers };
    setContent({ ...content, pricingCategories: newCats });
  };

  const removePricingFeature = (catIndex: number, offerIndex: number, featureIndex: number) => {
    const newCats = [...(content.pricingCategories || [])];
    const newOffers = [...newCats[catIndex].offers];
    const newFeatures = [...newOffers[offerIndex].features];
    newFeatures.splice(featureIndex, 1);
    newOffers[offerIndex] = { ...newOffers[offerIndex], features: newFeatures };
    newCats[catIndex] = { ...newCats[catIndex], offers: newOffers };
    setContent({ ...content, pricingCategories: newCats });
  };

  if (loading) return <div>Loading site content...</div>;

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Site Content</h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-glow px-6 py-3 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-12">
        
        {/* Visibility Settings */}
        <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">Section Visibility</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Toggle which sections are visible on the live website.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showHero !== false} onChange={e => setContent({...content, showHero: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hero Section</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showHeroCTA !== false} onChange={e => setContent({...content, showHeroCTA: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hero CTA Buttons</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showPortfolio !== false} onChange={e => setContent({...content, showPortfolio: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Portfolio Section</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showServices !== false} onChange={e => setContent({...content, showServices: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Services Section</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showAbout !== false} onChange={e => setContent({...content, showAbout: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">About Section</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showContact !== false} onChange={e => setContent({...content, showContact: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Contact Form Section</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-500 transition-colors">
              <input type="checkbox" checked={content.showBottomCTA !== false} onChange={e => setContent({...content, showBottomCTA: e.target.checked})} className="w-5 h-5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bottom CTA (Clarity)</span>
            </label>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">Home / Hero Section</h3>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Hero Title</label>
            <input 
              type="text"
              value={content.heroTitle} 
              onChange={e => setContent({...content, heroTitle: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Hero Subtitle</label>
            <textarea 
              value={content.heroSubtitle} 
              onChange={e => setContent({...content, heroSubtitle: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">Portfolio Section</h3>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Portfolio Badge Text</label>
            <input 
              type="text"
              value={content.portfolioTitle} 
              onChange={e => setContent({...content, portfolioTitle: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">Services Section</h3>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Services Badge Text</label>
            <input 
              type="text"
              value={content.servicesTitle} 
              onChange={e => setContent({...content, servicesTitle: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Services Subtitle</label>
            <textarea 
              value={content.servicesSubtitle} 
              onChange={e => setContent({...content, servicesSubtitle: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Service Cards</label>
              <button onClick={addService} className="text-sm text-purple-600 hover:text-purple-500 flex items-center gap-1">
                <Plus size={16} /> Add Service
              </button>
            </div>
            <div className="space-y-4">
              {content.servicesList.map((service: any, index: number) => (
                <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 relative">
                  <button 
                    onClick={() => removeService(index)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Title</label>
                      <input 
                        type="text" value={service.title} onChange={e => handleServiceChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Icon Name (lucide-react)</label>
                      <input 
                        type="text" value={service.icon} onChange={e => handleServiceChange(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs text-zinc-500 mb-1">Short Description</label>
                    <input 
                      type="text" value={service.description} onChange={e => handleServiceChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Expanded Text (on hover)</label>
                    <textarea 
                      value={service.expandedText} onChange={e => handleServiceChange(index, 'expandedText', e.target.value)} rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none resize-y"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Services Bottom Text (Paragraph 1)</label>
            <textarea 
              value={content.servicesBottomText1} 
              onChange={e => setContent({...content, servicesBottomText1: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Services Bottom Text (Paragraph 2)</label>
            <textarea 
              value={content.servicesBottomText2} 
              onChange={e => setContent({...content, servicesBottomText2: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
        </div>

        {/* Pricing Categories Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Pricing Categories & Packages</h3>
          </div>
          
          <div className="space-y-6">
            {content.pricingCategories?.map((category: any, catIndex: number) => (
              <details key={catIndex} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 group">
                <summary className="font-bold text-lg cursor-pointer outline-none flex justify-between items-center">
                  {category.title}
                  <span className="text-sm font-normal text-purple-600 group-open:hidden">Click to edit offers</span>
                </summary>
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Category Title</label>
                      <input 
                        type="text" value={category.title} onChange={e => handlePricingCategoryChange(catIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Category Description</label>
                      <input 
                        type="text" value={category.description} onChange={e => handlePricingCategoryChange(catIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-8">
                    <h4 className="font-semibold text-md border-b border-zinc-200 dark:border-zinc-800 pb-2">Offers</h4>
                    {category.offers.map((offer: any, offerIndex: number) => (
                      <div key={offerIndex} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Package Title</label>
                            <input 
                              type="text" value={offer.title} onChange={e => handlePricingOfferChange(catIndex, offerIndex, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Price</label>
                            <input 
                              type="text" value={offer.price} onChange={e => handlePricingOfferChange(catIndex, offerIndex, 'price', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Target Audience</label>
                            <input 
                              type="text" value={offer.target} onChange={e => handlePricingOfferChange(catIndex, offerIndex, 'target', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1">Outcome</label>
                            <input 
                              type="text" value={offer.outcome} onChange={e => handlePricingOfferChange(catIndex, offerIndex, 'outcome', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            <input 
                              type="checkbox" 
                              checked={offer.popular} 
                              onChange={e => handlePricingOfferChange(catIndex, offerIndex, 'popular', e.target.checked)}
                              className="rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                            />
                            Highlight as "Most Popular"
                          </label>
                        </div>

                        <div className="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Features List</label>
                            <button onClick={() => addPricingFeature(catIndex, offerIndex)} className="text-xs text-purple-600 hover:text-purple-500 flex items-center gap-1">
                              <Plus size={14} /> Add Feature
                            </button>
                          </div>
                          <div className="space-y-2">
                            {offer.features.map((feature: string, fIndex: number) => (
                              <div key={fIndex} className="flex items-center gap-2">
                                <input 
                                  type="text" value={feature} onChange={e => handlePricingFeatureChange(catIndex, offerIndex, fIndex, e.target.value)}
                                  className="flex-grow px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm outline-none"
                                />
                                <button onClick={() => removePricingFeature(catIndex, offerIndex, fIndex)} className="text-zinc-400 hover:text-red-500 p-2">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">About Section</h3>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">Profile Picture</label>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shrink-0">
                {content.profilePicture ? (
                  <img src={content.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <div>
                <label className="cursor-pointer btn-glow px-4 py-2 rounded-xl text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 inline-flex items-center gap-2">
                  <ImageIcon size={16} />
                  {uploading ? 'Uploading...' : 'Upload New Picture'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <p className="text-xs text-zinc-500 mt-2">Recommended: Square image, at least 400x400px.</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">About Me Text</label>
            <p className="text-xs text-zinc-500 mb-2">Use double line breaks to separate paragraphs.</p>
            <textarea 
              value={content.aboutText} 
              onChange={e => setContent({...content, aboutText: e.target.value})}
              rows={10}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
              placeholder="Since 2009, I work for the family company..."
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-2">Contact Section</h3>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Contact Badge Text</label>
            <input 
              type="text"
              value={content.contactTitle} 
              onChange={e => setContent({...content, contactTitle: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Contact Subtitle 1</label>
            <textarea 
              value={content.contactSubtitle1} 
              onChange={e => setContent({...content, contactSubtitle1: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Contact Subtitle 2</label>
            <textarea 
              value={content.contactSubtitle2} 
              onChange={e => setContent({...content, contactSubtitle2: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Home Page Contact Text 1</label>
            <textarea 
              value={content.contactHomeText1} 
              onChange={e => setContent({...content, contactHomeText1: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Home Page Contact Text 2</label>
            <textarea 
              value={content.contactHomeText2} 
              onChange={e => setContent({...content, contactHomeText2: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-y"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
