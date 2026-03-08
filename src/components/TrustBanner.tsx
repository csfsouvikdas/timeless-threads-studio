import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Truck, Shield, Leaf } from "lucide-react";

const trustItems = [
  { icon: Heart, label: "Handmade with Love", desc: "Every piece crafted by hand" },
  { icon: Truck, label: "Free Shipping", desc: "On orders above ₹2,000" },
  { icon: Shield, label: "Quality Promise", desc: "Premium yarns & materials" },
  { icon: Leaf, label: "Eco-Friendly", desc: "Sustainable & conscious" },
];

const TrustBanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-10 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-foreground leading-tight">{item.label}</p>
                <p className="font-body text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
