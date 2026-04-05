import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Image as ImageIcon, Save, Plus, Trash2 } from 'lucide-react';

export default function SiteContentCMS() {
  const [content, setContent] = useState<any>({
    profilePicture: '',
    aboutText: '',
    heroTitle: 'Clear, functional, human-centered UI/UX design.',
    heroSubtitle: 'I design digital experiences that are intuitive, engaging, and built to convert.',
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
        icon: "MonitorSmartphone",
      }
    ],
    contactTitle: 'Contact LumoUX',
    contactSubtitle1: 'Contact LumoUX UI/UX design studio. Get in touch with me, Gabi Radu, for web design collaborations, branding projects, or freelance UI/UX work.',
    contactSubtitle2: 'Clear, functional, human-centered UI/UX design for startups, SaaS products, and digital founders world wide.',
    contactHomeText1: 'Currently taking on new projects for Summer 2026.',
    contactHomeText2: 'Design-only studio — I partner with web developers to deliver production-ready Figma files and design handoffs. Let\'s create something extraordinary together!'
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
