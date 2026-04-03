import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import React from "react";

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
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop`;
              }}
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
  const displayProjects = isHome 
    ? projects.filter(p => ["serene-spa-and-wellness", "alpine-serenity-inn", "health-center"].includes(p.id))
    : projects;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col items-center">
      <div className="mb-12 md:mb-16 inline-flex items-center justify-center px-6 py-2 rounded-full glow-gradient-border bg-white dark:bg-black">
        <span className="text-zinc-900 dark:text-white text-sm font-medium">A glimpse into my creative work.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
