import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Project } from "../data/projects";

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center perspective-1000"
      style={{ perspective: 1000 }}
    >
      <Link to={`/portfolio/${project.id}`} className="group w-full flex flex-col items-center block">
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] glow-gradient-border overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.02]"
        >
          <div 
            className="w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black"
            style={{ transform: "translateZ(30px)" }}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        <h3 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
      </Link>
    </motion.div>
  );
};

export default function Portfolio({ isHome = false }: { isHome?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteContent, setSiteContent] = useState<any>({
    portfolioTitle: 'A glimpse into my creative work.'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSiteContent({
            portfolioTitle: data.portfolioTitle || siteContent.portfolioTitle
          });
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        const fetchedProjects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayProjects = isHome 
    ? projects.filter(p => ["serene-spa-and-wellness", "alpine-serenity-inn", "health-center"].includes(p.id))
    : projects;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      {!isHome && (
        <Helmet>
          <title>Portfolio | LumoUX Design Studio</title>
          <meta name="description" content="View the creative portfolio of LumoUX, featuring UI/UX design, branding, and web design projects." />
        </Helmet>
      )}
      <div className="mb-12 md:mb-16 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black">
        <span className="text-zinc-900 dark:text-white text-sm font-medium">{siteContent.portfolioTitle}</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : displayProjects.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
