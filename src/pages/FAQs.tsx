import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long does it take to make a custom order?", a: "Custom orders typically take 7–14 business days depending on the complexity of the design. We'll keep you updated throughout the process." },
  { q: "What materials do you use?", a: "We use premium, sustainably-sourced acrylic and cotton yarns. All materials are soft, durable, and machine-washable." },
  { q: "Can I request a specific color or design?", a: "Absolutely! Our custom order form lets you choose colors, patterns, and even add personal text or motifs to your piece." },
  { q: "Do you ship internationally?", a: "Currently, we ship across India. International shipping is coming soon — follow us on Instagram for updates!" },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for non-custom items in original condition. Custom orders are non-refundable but we'll work with you to ensure you love your piece." },
  { q: "How do I care for my crochet clothing?", a: "We recommend hand washing in cold water or using a gentle machine cycle with a laundry bag. Lay flat to dry for best results." },
  { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a tracking link via email and can also check status on our Track Order page." },
  { q: "Do you offer gift wrapping?", a: "Yes, we offer beautiful handmade gift packaging for a small additional fee. You can select this option at checkout." },
];

const FAQs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">Help Center</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">FAQs</h1>
          <p className="font-body text-muted-foreground">Got questions? We've got answers.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
                <AccordionTrigger className="font-body text-sm font-semibold text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQs;
