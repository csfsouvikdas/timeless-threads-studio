import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours 💕" });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">Get in Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">We'd love to hear from you. Drop us a message!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="space-y-5">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" required className="w-full px-5 py-3 rounded-xl border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" required className="w-full px-5 py-3 rounded-xl border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={5} required className="w-full px-5 py-3 rounded-xl border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-accent-foreground rounded-xl font-body font-semibold text-sm hover:shadow-hover transition-all">
                <Send size={16} /> Send Message
              </button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="p-6 bg-card rounded-2xl border border-border space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-primary" /></div>
                  <div><p className="font-body text-sm font-semibold text-foreground">Email</p><p className="font-body text-sm text-muted-foreground">hello@timelessthreads.in</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-primary" /></div>
                  <div><p className="font-body text-sm font-semibold text-foreground">Phone</p><p className="font-body text-sm text-muted-foreground">+91 98765 43210</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-primary" /></div>
                  <div><p className="font-body text-sm font-semibold text-foreground">Location</p><p className="font-body text-sm text-muted-foreground">Mumbai, India</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><Instagram size={18} className="text-primary" /></div>
                  <div><p className="font-body text-sm font-semibold text-foreground">Instagram</p><p className="font-body text-sm text-muted-foreground">@timeless_threads</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
