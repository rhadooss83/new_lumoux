import { motion, useMotionValue, useSpring, MotionValue, useTransform, animate } from "framer-motion";
import React, { useEffect, useState } from "react";

const BUBBLE_COLORS = [
  "59, 130, 246",   // Blue 500
  "37, 99, 235",    // Blue 600
  "147, 197, 253",  // Blue 300
  "168, 85, 247",   // Purple 500
  "147, 51, 234",   // Purple 600
  "6, 182, 212",    // Cyan 500
  "8, 145, 178",    // Cyan 600
];

interface BubbleConfig {
  id: number;
  size: number;
  offsetX: number;
  offsetY: number;
  stiffness: number;
  damping: number;
  mass: number;
  floatDuration: number;
  color: string;
}

const Bubble: React.FC<{
  bubble: BubbleConfig;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  spread: MotionValue<number>;
}> = ({
  bubble,
  mouseX,
  mouseY,
  spread,
}) => {
  const springX = useSpring(mouseX, {
    stiffness: bubble.stiffness,
    damping: bubble.damping,
    mass: bubble.mass,
  });
  const springY = useSpring(mouseY, {
    stiffness: bubble.stiffness,
    damping: bubble.damping,
    mass: bubble.mass,
  });

  const marginLeft = useTransform(spread, (s: number) => bubble.offsetX * s - bubble.size / 2);
  const marginTop = useTransform(spread, (s: number) => bubble.offsetY * s - bubble.size / 2);

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center"
      style={{
        width: bubble.size,
        height: bubble.size,
        x: springX,
        y: springY,
        marginLeft,
        marginTop,
        // Glassmorphism bubble effect (shadowy)
        background: `radial-gradient(circle at 30% 30%, rgba(${bubble.color}, 0.20), rgba(${bubble.color}, 0.07) 60%, transparent 100%)`,
        boxShadow: `inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(${bubble.color}, 0.20), inset 0 0 10px rgba(255,255,255,0.10)`,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: bubble.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full"
      />
    </motion.div>
  );
}

export default function Background() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const spread = useMotionValue(1);

  const [bubbles, setBubbles] = useState<BubbleConfig[]>([]);

  useEffect(() => {
    // Generate bubbles with random properties for organic movement
    const newBubbles: BubbleConfig[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20px to 80px (downsized)
      offsetX: (Math.random() - 0.5) * 400, // Spread around cursor
      offsetY: (Math.random() - 0.5) * 400,
      stiffness: Math.random() * 20 + 10, // 10 to 30 (lower is smoother/slower)
      damping: Math.random() * 15 + 10, // 10 to 25
      mass: Math.random() * 3 + 1, // 1 to 4
      floatDuration: Math.random() * 4 + 3, // 3s to 7s
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
    }));
    setBubbles(newBubbles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore clicks on interactive elements
      if (target.closest('a, button, input, textarea, select, details, [role="button"]')) {
        return;
      }

      const current = spread.get();
      spread.stop();
      
      const nextTarget = Math.min(current + 1.5, 8); // Reduced spread distance and max limit

      animate(spread, nextTarget, {
        type: "spring",
        stiffness: 300,
        damping: 20,
        onComplete: () => {
          animate(spread, 1, {
            type: "spring",
            stiffness: 40,
            damping: 15,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mouseX, mouseY, spread]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/60 via-zinc-950 to-zinc-950" />
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} mouseX={mouseX} mouseY={mouseY} spread={spread} />
      ))}
    </div>
  );
}
