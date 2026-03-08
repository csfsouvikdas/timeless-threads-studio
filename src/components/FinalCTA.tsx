import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-lavender/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Design Your Own Crochet{" "}
            <span className="italic text-primary">Hoodie</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Turn your imagination into wearable art. Our artisans are ready to
            bring your vision to life.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-accent-foreground font-body font-bold text-base rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
          >
            <Sparkles size={20} />
            Create Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
