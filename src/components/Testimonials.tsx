import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  location: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya S.",
    rating: 5,
    text: "I ordered a custom crochet hoodie and it exceeded all my expectations! The quality is incredible and the design is exactly what I wanted.",
    location: "Mumbai",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop",
  },
  {
    name: "Ananya R.",
    rating: 5,
    text: "The lavender sweatshirt is my favorite piece of clothing now. So soft, so unique. I get compliments every time I wear it!",
    location: "Delhi",
  },
  {
    name: "Meera K.",
    rating: 5,
    text: "Timeless Threads made my dream hoodie! The attention to detail in the crochet work is unbelievable. Will definitely order again.",
    location: "Bangalore",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
  },
  {
    name: "Riya T.",
    rating: 5,
    text: "The custom t-shirt I ordered was perfect for my college fest. Everyone asked where I got it from!",
    location: "Pune",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const { normalized } = useMousePosition();

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-24 bg-card relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-lavender/15 rounded-full blur-3xl"
        animate={{ x: normalized.x * 30, y: normalized.y * 30 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 bg-pink/15 rounded-full blur-3xl"
        animate={{ x: normalized.x * -25, y: normalized.y * -25 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4">Love Letters</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">What Our Customers Say</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto">
          <TiltCard intensity={5} className="cursor-default">
            <div className="bg-background rounded-3xl p-10 md:p-14 shadow-card text-center relative">
              {/* Video thumbnail */}
              {t.videoUrl && (
                <div
                  className="relative mb-6 rounded-2xl overflow-hidden cursor-pointer group mx-auto max-w-sm"
                  onClick={() => setVideoOpen(true)}
                >
                  <img
                    src={t.videoThumbnail}
                    alt={`${t.name} video review`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Play size={24} className="text-accent-foreground ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-primary/90 text-accent-foreground font-body text-xs font-semibold px-3 py-1 rounded-full">
                    Video Review
                  </span>
                </div>
              )}

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-lg text-foreground leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <p className="font-heading text-xl font-semibold text-foreground">{t.name}</p>
              <p className="font-body text-sm text-muted-foreground">{t.location}</p>

              <div className="flex justify-center items-center gap-3 mt-8">
                <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-pink/20 transition-colors" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setVideoOpen(false); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary scale-125" : "bg-border"}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
                <button onClick={next} className="p-2 rounded-full border border-border hover:bg-pink/20 transition-colors" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && t.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-6"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-primary text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
              <iframe
                src={`${t.videoUrl}?autoplay=1`}
                title={`${t.name} video testimonial`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
