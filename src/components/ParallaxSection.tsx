import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const ParallaxSection = ({ children, className = "", intensity = 20 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { normalized } = useMousePosition();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      <motion.div
        animate={{
          x: normalized.x * 5,
          y: normalized.y * 5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxSection;
