import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const policies = [
  { icon: Truck, title: "Free Shipping", desc: "Free delivery on all orders above ₹2,000. Standard shipping (5–7 business days) is available pan-India." },
  { icon: Clock, title: "Processing Time", desc: "Ready-made items ship within 2–3 business days. Custom orders take 7–14 business days before shipping." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Non-custom items can be returned within 7 days of delivery in original, unworn condition. We'll arrange a free pickup." },
  { icon: CheckCircle, title: "Exchanges", desc: "We offer free size exchanges within 7 days. Contact us and we'll send a replacement once we receive the original." },
];

const ShippingReturns = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">Policies</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Shipping & Returns</h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">We want you to love every piece. Here's how we make that easy.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {policies.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                <p.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Important Notes</h3>
          <ul className="font-body text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Custom-made items are non-refundable but we'll work with you to ensure satisfaction.</li>
            <li>Items must be unworn, unwashed, and in original packaging for returns.</li>
            <li>Refunds are processed within 5–7 business days after we receive the returned item.</li>
            <li>For any issues, reach out to us at hello@timelessthreads.in</li>
          </ul>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ShippingReturns;
