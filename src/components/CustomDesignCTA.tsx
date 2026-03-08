import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Sparkles } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useMousePosition } from "@/hooks/useMousePosition";

const CustomDesignCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { normalized } = useMousePosition();

  return (
    <section id="custom" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-lavender/15 rounded-full blur-3xl"
        animate={{ x: normalized.x * 25, y: normalized.y * 25 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink via-lavender to-beige p-1">
          <div className="bg-card rounded-[calc(1.5rem-4px)] p-12 md:p-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4">Custom Orders</p>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                  Your design, <span className="italic text-primary">our craft</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Have a unique crochet design in mind? Upload your reference image or describe your vision, and our artisans will bring it to life on the clothing of your choice.
                </p>
                <Link
                  to="/custom-order"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles size={18} />
                  Start Custom Order
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TiltCard intensity={10} className="cursor-pointer">
                  <div className="bg-background rounded-2xl border-2 border-dashed border-border p-12 text-center hover:border-primary/50 transition-colors duration-300 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Upload size={28} className="text-foreground" />
                    </div>
                    <p className="font-heading text-lg font-semibold text-foreground mb-2">Upload your design</p>
                    <p className="font-body text-sm text-muted-foreground">Drag & drop your reference image or click to browse</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {["Hoodie", "T-Shirt", "Sweatshirt"].map((type) => (
                        <span key={type} className="px-3 py-1 bg-pink/20 rounded-full font-body text-xs font-medium text-foreground">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignCTA;
