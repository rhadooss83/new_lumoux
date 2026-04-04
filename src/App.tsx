import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><Home /></PageWrapper></Suspense>} />
          <Route path="about" element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><About /></PageWrapper></Suspense>} />
          <Route path="services" element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><Services /></PageWrapper></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><Contact /></PageWrapper></Suspense>} />
          <Route path="portfolio" element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><Portfolio /></PageWrapper></Suspense>} />
          <Route path="portfolio/:id" element={<Suspense fallback={<div className="min-h-screen" />}><PageWrapper><ProjectDetail /></PageWrapper></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
