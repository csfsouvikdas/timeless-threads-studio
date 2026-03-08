import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shirt, Palette, Scissors, Package } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useMousePosition } from "@/hooks/useMousePosition";

const steps = [
  { icon: Shirt, title: "Choose Your Clothing", description: "Pick from hoodies, tees, sweatshirts, and more." },
  { icon: Palette, title: "Submit Your Design", description: "Upload your crochet pattern or choose from our collection." },
  { icon: Scissors, title: "Handmade Stitching", description: "Our artisans carefully stitch your design by hand." },
  { icon: Package, title: "Delivered to You", description: "Your unique piece arrives beautifully packaged." },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { normalized } = useMousePosition();

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Cursor-reactive background orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-pink/10 rounded-full blur-3xl"
        animate={{ x: 100 + normalized.x * 40, y: 50 + normalized.y * 40 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl"
        animate={{ x: -50 + normalized.x * -30, y: -30 + normalized.y * -30 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4">The Process</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <TiltCard className="relative text-center group" intensity={12}>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}

                <div className="relative z-10 mx-auto w-20 h-20 bg-pink/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 group-hover:shadow-hover">
                  <step.icon size={28} className="text-foreground" />
                </div>

                <span className="font-heading text-5xl font-bold text-border absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground max-w-[220px] mx-auto">{step.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
