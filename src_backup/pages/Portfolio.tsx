import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { projects } from "../data/projects";

export default function Portfolio() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const displayProjects = isHome ? projects.slice(0, 3) : projects;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-12 md:mb-16 inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <span className="text-white text-sm font-medium">A glimpse into my creative work.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <Link to={`/portfolio/${project.id}`} className="group w-full flex flex-col items-center">
              <div className="w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 transition-all duration-300 group-hover:scale-[1.02] border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <div className="w-full h-full rounded-[1.3rem] md:rounded-[1.8rem] overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to placeholder if image not uploaded yet
                      e.currentTarget.src = `https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop`;
                    }}
                  />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight transition-colors duration-300 group-hover:text-purple-400">
                {project.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
