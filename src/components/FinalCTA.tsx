import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { normalized } = useMousePosition();

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-pink/20 rounded-full blur-3xl"
        animate={{ x: normalized.x * 50, y: normalized.y * 50 }}
        transition={{ type: "spring", stiffness: 20, damping: 15 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-lavender/20 rounded-full blur-3xl"
        animate={{ x: normalized.x * -40, y: normalized.y * -40 }}
        transition={{ type: "spring", stiffness: 20, damping: 15 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-beige/15 rounded-full blur-3xl"
        animate={{ scale: 1 + normalized.x * 0.1 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6"
            style={{
              textShadow: `${normalized.x * 4}px ${-normalized.y * 4}px 15px hsl(var(--primary) / 0.1)`,
            }}
          >
            Design Your Own Crochet{" "}
            <span className="italic text-primary">Hoodie</span>
          </motion.h2>
          <p className="font-body text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Turn your imagination into wearable art. Our artisans are ready to bring your vision to life.
          </p>
          <Link
            to="/custom-order"
            className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-accent-foreground font-body font-bold text-base rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={20} />
              Create Now
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
