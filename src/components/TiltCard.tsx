import { useRef, ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

const TiltCard = ({ children, className = "", intensity = 10, glare = true }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleLeave = () => setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, hsl(var(--primary) / 0.12) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
