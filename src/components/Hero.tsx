import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-products.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Handmade crochet clothing collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-20 w-16 h-16 rounded-full bg-pink/40 blur-xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-lavender/40 blur-xl hidden lg:block"
      />

      <div className="relative container mx-auto px-6 pt-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4"
          >
            Handcrafted with love
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6"
          >
            Hand-stitched stories you can{" "}
            <span className="italic text-primary">wear.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-lg text-muted-foreground mb-10 max-w-lg"
          >
            Custom crochet clothing, made just for you. Every piece is unique,
            every stitch tells a story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Collection
            </a>
            <a
              href="#custom"
              className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Custom Design
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
