import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-32">
      <Helmet>
        <title>Cookie Policy | LumoUX Design Studio</title>
      </Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-800 dark:text-zinc-200 space-y-6">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Cookie Policy</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Last updated: February 07, 2026</p>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">What Are Cookies</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
          <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
          <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-8 mb-4">Managing Cookies</h2>
        <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
      </motion.div>
    </div>
  );
}
