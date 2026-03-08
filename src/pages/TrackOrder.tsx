import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TrackOrder = () => {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    toast({ title: "Order not found", description: "Please check your order ID and try again." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Track Order</h1>
            <p className="font-body text-muted-foreground">Enter your order ID to see the latest status.</p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleTrack} className="space-y-4">
            <div className="relative">
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. TT-20260308-XXXX"
                className="w-full px-5 py-4 pr-12 rounded-xl border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-accent-foreground rounded-xl font-body font-semibold text-sm hover:shadow-hover transition-all">
              Track My Order
            </button>
          </motion.form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-6 font-body text-xs text-muted-foreground">
            You can find your order ID in the confirmation email we sent you. Already have an account? Check <a href="/my-orders" className="text-primary underline">My Orders</a> instead.
          </motion.p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
