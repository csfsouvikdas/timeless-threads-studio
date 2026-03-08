import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Star } from "lucide-react";
import heroImg from "@/assets/hero-products.jpg";
import HeroScene from "@/components/HeroScene";

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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
      </div>

      {/* 3D Scene overlay */}
      <HeroScene />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-32 right-20 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 bg-pink/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart size={24} className="text-primary fill-primary/30" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-32 hidden lg:block"
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-12 h-12 bg-lavender/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Star size={18} className="text-primary fill-primary/20" />
        </div>
      </motion.div>
      <motion.div
        className="absolute top-48 right-[45%] hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-10 h-10 bg-beige/40 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Sparkles size={14} className="text-primary" />
        </div>
      </motion.div>

      <div className="relative container mx-auto px-6 pt-24" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="font-body text-xs tracking-wide uppercase text-primary font-semibold">
              Handcrafted with love ♡
            </span>
          </motion.div>

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
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBagIcon />
                Shop Collection
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              to="/custom-order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card/80 backdrop-blur-sm text-foreground font-body font-semibold text-sm rounded-full border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              Create Custom Design
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6 mt-12"
          >
            {["100% Handmade", "Free Shipping ₹2k+", "Made in India"].map((badge) => (
              <span key={badge} className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

export default Hero;
