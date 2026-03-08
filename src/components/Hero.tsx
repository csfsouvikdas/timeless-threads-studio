import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-products.jpg";
import HeroScene from "@/components/HeroScene";
import { useMousePosition } from "@/hooks/useMousePosition";

const Hero = () => {
  const { normalized } = useMousePosition();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: normalized.x * -15, y: normalized.y * -15 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <img
          src={heroImg}
          alt="Handmade crochet clothing collection"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </motion.div>

      {/* 3D Scene overlay */}
      <HeroScene />

      <div className="relative container mx-auto px-6 pt-24" style={{ zIndex: 2 }}>
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
            style={{
              textShadow: `${normalized.x * 3}px ${-normalized.y * 3}px 10px hsl(var(--primary) / 0.15)`,
            }}
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
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <span className="relative z-10">Shop Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              to="/custom-order"
              className="inline-flex items-center justify-center px-8 py-4 bg-card/80 backdrop-blur-sm text-foreground font-body font-semibold text-sm rounded-full border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Custom Design
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
