import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import brandStoryImg from "@/assets/brand-story.jpg";
import TiltCard from "@/components/TiltCard";

const BrandStory = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { normalized } = useMousePosition();

  return (
    <section id="story" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <TiltCard intensity={6} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src={brandStoryImg}
                  alt="Artisan crocheting by hand"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </TiltCard>
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink/30 rounded-full blur-2xl"
              animate={{ x: normalized.x * 20, y: normalized.y * 20 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-lavender/30 rounded-full blur-2xl"
              animate={{ x: normalized.x * -15, y: normalized.y * -15 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4">Our Story</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Every stitch tells a <span className="italic text-primary">story</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Timeless Threads was born from a love of crochet and a dream to bring handmade warmth to everyday fashion. Each piece is carefully crafted by skilled artisans who pour their heart into every loop and stitch.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              We believe that clothing should be more than fabric — it should be a connection to the hands that made it, a story woven into every thread.
            </p>
            <div className="flex gap-12">
              {[
                { number: "500+", label: "Pieces Crafted" },
                { number: "200+", label: "Happy Customers" },
                { number: "100%", label: "Handmade" },
              ].map((stat) => (
                <TiltCard key={stat.label} intensity={15} className="cursor-default">
                  <p className="font-heading text-3xl font-bold text-foreground">{stat.number}</p>
                  <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
