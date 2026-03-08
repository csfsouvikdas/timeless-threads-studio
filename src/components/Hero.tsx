import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-products.jpg";

const Hero = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 150]);
  const textY = useTransform(scrollY, [0, 600], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={heroImg}
          alt="Handmade crochet clothing collection"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />
      </motion.div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] right-[12%] hidden lg:block"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-pink/40 rounded-3xl flex items-center justify-center backdrop-blur-md border border-pink/30 shadow-soft">
            <Heart size={28} className="text-primary fill-primary/40" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] right-[20%] hidden lg:block"
          animate={{ y: [0, 15, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-14 h-14 bg-lavender/40 rounded-2xl flex items-center justify-center backdrop-blur-md border border-lavender/30 shadow-soft">
            <Star size={20} className="text-primary fill-primary/30" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-[35%] right-[35%] hidden lg:block"
          animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-10 h-10 bg-beige/50 rounded-xl flex items-center justify-center backdrop-blur-md border border-beige/40">
            <Sparkles size={14} className="text-primary" />
          </div>
        </motion.div>

        {/* Small decorative dots */}
        {[
          { top: "20%", left: "60%", delay: 0, size: 6 },
          { top: "60%", left: "75%", delay: 1.5, size: 4 },
          { top: "40%", left: "85%", delay: 3, size: 5 },
          { top: "75%", left: "55%", delay: 2, size: 3 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:block rounded-full bg-primary/30"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative container mx-auto px-6 pt-28 md:pt-24"
        style={{ y: textY, opacity, zIndex: 2 }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-card/80 backdrop-blur-md border border-primary/20 rounded-full mb-8 shadow-soft"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
              <Sparkles size={11} className="text-primary" />
            </span>
            <span className="font-body text-xs tracking-[0.15em] uppercase text-primary font-semibold">
              Handcrafted with love ♡
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 50 }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-4">
              Hand-stitched
              <br />
              stories you
              <br />
              can <span className="italic text-primary relative">
                wear
                <motion.svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                >
                  <motion.path
                    d="M2 8 C50 2, 150 2, 198 8"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
              <span className="text-primary">.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-body text-base md:text-lg text-muted-foreground mb-10 max-w-md leading-relaxed"
          >
            Custom crochet clothing, made just for you. Every piece is unique,
            every stitch tells a story.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/custom-order"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-card/80 backdrop-blur-md text-foreground font-body font-semibold text-sm rounded-full border border-border hover:border-primary/40 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles size={15} className="text-primary" />
              Create Custom Design
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-14"
          >
            {[
              { icon: "✦", label: "100% Handmade" },
              { icon: "♡", label: "Free Shipping ₹2k+" },
              { icon: "★", label: "Made in India" },
            ].map((badge) => (
              <span key={badge.label} className="font-body text-xs text-muted-foreground flex items-center gap-2">
                <span className="text-primary text-sm">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
