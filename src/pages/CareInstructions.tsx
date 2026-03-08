import { motion } from "framer-motion";
import { Droplets, Wind, ThermometerSun, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tips = [
  { icon: Droplets, title: "Washing", desc: "Hand wash in cold water or use a gentle/delicate machine cycle inside a mesh laundry bag. Use mild detergent — avoid bleach." },
  { icon: Wind, title: "Drying", desc: "Lay flat on a clean towel to air dry. Avoid wringing or twisting. Never tumble dry — heat can shrink or damage the yarn." },
  { icon: ThermometerSun, title: "Ironing", desc: "If needed, use a low-heat setting with a pressing cloth over the garment. Avoid direct contact with the iron." },
  { icon: ShieldCheck, title: "Storage", desc: "Fold and store in a cool, dry place. Avoid hanging crochet pieces as they may stretch. Use cedar blocks to keep moths away." },
];

const CareInstructions = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">Keep it Lovely</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Care Instructions</h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">A little love goes a long way. Here's how to keep your crochet looking beautiful.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {tips.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                <t.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default CareInstructions;
