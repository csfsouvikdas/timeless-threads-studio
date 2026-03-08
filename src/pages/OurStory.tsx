import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import brandStory from "@/assets/brand-story.jpg";

const OurStory = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">About Us</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Our Story</h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">How a passion for yarn became a movement of love.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <img src={brandStory} alt="Our brand story" className="w-full h-64 md:h-96 object-cover rounded-2xl mb-10" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 font-body text-muted-foreground leading-relaxed">
          <p>
            Timeless Threads was born from a simple belief — that clothing should carry warmth, not just in fabric, but in feeling. What started as a hobby of crocheting gifts for loved ones quickly grew into a passion project that we couldn't keep to ourselves.
          </p>
          <div className="flex items-center gap-3 py-4">
            <Heart className="text-primary flex-shrink-0" size={24} />
            <p className="font-heading text-xl font-semibold text-foreground italic">"Every stitch is a tiny act of love."</p>
          </div>
          <p>
            Based in India, our small team of artisans crafts each piece by hand. We use premium, sustainably-sourced yarns and dedicate hours to perfecting every detail. No two pieces are exactly alike — and that's the beauty of handmade.
          </p>
          <p>
            We believe fashion can be slow, intentional, and deeply personal. Whether it's a cozy hoodie for yourself or a custom crewneck for someone special, every Timeless Threads creation is made to be cherished.
          </p>
          <div className="flex items-center gap-3 py-4">
            <Sparkles className="text-primary flex-shrink-0" size={24} />
            <p className="font-heading text-xl font-semibold text-foreground italic">"Slow fashion, fast love."</p>
          </div>
          <p>
            Thank you for being part of our journey. Every order supports independent artisans and keeps the beautiful craft of crochet alive.
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default OurStory;
