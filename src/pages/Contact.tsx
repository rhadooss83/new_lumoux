import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DOMPurify from "dompurify";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function ContactFormContent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get("service") || "";
  const isContactPage = location.pathname === "/contact";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
    service: initialService,
    message: "",
    gdpr: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const validateField = (name: string, value: string | boolean) => {
    let errorMsg = "";
    if (name === "name" && !value) {
      errorMsg = "Could you please tell me your name?";
    }
    if (name === "email") {
      if (!value) {
        errorMsg = "I'll need your email to get back to you!";
      } else if (typeof value === "string" && !value.includes("@")) {
        errorMsg = "Oops, looks like you missed the '@' in your email address.";
      } else if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "This email format looks a bit off. Could you double-check it?";
      }
    }
    if (name === "phone" && !value) {
      errorMsg = "A phone number helps me reach you faster.";
    }
    if (name === "place" && !value) {
      errorMsg = "Could you let me know where you're located?";
    }
    if (name === "service" && !value) {
      errorMsg = "Please specify the service you're interested in.";
    }
    if (name === "message") {
      if (!value) {
        errorMsg = "Please add a short message so I know how to help!";
      } else if (typeof value === "string" && value.length < 10) {
        errorMsg = "Could you provide a bit more detail? (At least 10 characters)";
      }
    }
    if (name === "gdpr" && !value) {
      errorMsg = "Please agree to the privacy policy to continue.";
    }
    return errorMsg;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, val);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (touched[name]) {
      const errorMsg = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors: Record<string, string> = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const errorMsg = validateField(key, formData[key as keyof typeof formData]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
        isValid = false;
      }
      setTouched(prev => ({ ...prev, [key]: true }));
    });
    
    setErrors(newErrors);
    
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let recaptchaToken = "mock_token";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("contact_form");
      }

      // Backend validation & sanitization simulation
      // Stripping out malicious code (XSS) before saving to Firestore
      const sanitizedData = {
        name: DOMPurify.sanitize(formData.name),
        phone: DOMPurify.sanitize(formData.phone),
        email: DOMPurify.sanitize(formData.email),
        place: DOMPurify.sanitize(formData.place),
        service: DOMPurify.sanitize(formData.service),
        message: DOMPurify.sanitize(formData.message),
        recaptchaToken,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "messages"), sanitizedData);
      setIsSubmitted(true);
      setFormData({
        name: "", phone: "", email: "", place: "", service: initialService, message: "", gdpr: false
      });
      setTouched({});
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

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="place" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Place</label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.place ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors`}
                  placeholder="City, Country"
                />
                {errors.place && <span className="text-xs text-red-500">{errors.place}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Service Required</label>
              <input
                type="text"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.service ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors`}
                placeholder="e.g. UI/UX Design, Starter Website"
              />
              {errors.service && <span className="text-xs text-red-500">{errors.service}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-zinc-100 dark:bg-zinc-900/50 border ${errors.message ? 'border-red-500' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors resize-y`}
                placeholder="Tell me about your project..."
              />
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdpr"
                  checked={formData.gdpr}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 w-4 h-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="gdpr" className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed">
                  I agree to the processing of my personal data according to the Privacy Policy.
                </label>
              </div>
              {errors.gdpr && <span className="text-xs text-red-500 ml-7">{errors.gdpr}</span>}
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

export default function Contact() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LceAQYpAAAAABxO2jL3X2w8n-9E8n-9E8n-9E8n"}>
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}
