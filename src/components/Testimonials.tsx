import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useMousePosition } from "@/hooks/useMousePosition";

const testimonials = [
  { name: "Priya S.", rating: 5, text: "I ordered a custom crochet hoodie and it exceeded all my expectations! The quality is incredible and the design is exactly what I wanted.", location: "Mumbai" },
  { name: "Ananya R.", rating: 5, text: "The lavender sweatshirt is my favorite piece of clothing now. So soft, so unique. I get compliments every time I wear it!", location: "Delhi" },
  { name: "Meera K.", rating: 5, text: "Timeless Threads made my dream hoodie! The attention to detail in the crochet work is unbelievable. Will definitely order again.", location: "Bangalore" },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const { normalized } = useMousePosition();

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

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
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-lg text-foreground leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <p className="font-heading text-xl font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="font-body text-sm text-muted-foreground">{testimonials[current].location}</p>

              <div className="flex justify-center gap-3 mt-8">
                <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-pink/20 transition-colors" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`} aria-label={`Testimonial ${i + 1}`} />
                ))}
                <button onClick={next} className="p-2 rounded-full border border-border hover:bg-pink/20 transition-colors" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
