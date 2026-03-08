import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sizes = [
  { size: "XS", chest: "32–34", length: "24", shoulder: "14" },
  { size: "S", chest: "34–36", length: "25", shoulder: "15" },
  { size: "M", chest: "36–38", length: "26", shoulder: "16" },
  { size: "L", chest: "38–40", length: "27", shoulder: "17" },
  { size: "XL", chest: "40–42", length: "28", shoulder: "18" },
  { size: "XXL", chest: "42–44", length: "29", shoulder: "19" },
];

const SizeGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-3">Fit Guide</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Size Guide</h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">All measurements are in inches. Our pieces have a relaxed, cozy fit.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="px-5 py-3 text-left font-body text-sm font-semibold text-foreground rounded-tl-xl">Size</th>
                <th className="px-5 py-3 text-left font-body text-sm font-semibold text-foreground">Chest</th>
                <th className="px-5 py-3 text-left font-body text-sm font-semibold text-foreground">Length</th>
                <th className="px-5 py-3 text-left font-body text-sm font-semibold text-foreground rounded-tr-xl">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((s, i) => (
                <tr key={s.size} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="px-5 py-3 font-body text-sm font-semibold text-foreground">{s.size}</td>
                  <td className="px-5 py-3 font-body text-sm text-muted-foreground">{s.chest}"</td>
                  <td className="px-5 py-3 font-body text-sm text-muted-foreground">{s.length}"</td>
                  <td className="px-5 py-3 font-body text-sm text-muted-foreground">{s.shoulder}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">How to Measure</h3>
          <ul className="font-body text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Chest:</strong> Measure around the fullest part of your chest.</li>
            <li><strong>Length:</strong> Measure from the highest point of the shoulder to the hem.</li>
            <li><strong>Shoulder:</strong> Measure from one shoulder seam to the other across the back.</li>
          </ul>
          <p className="font-body text-sm text-muted-foreground mt-3">Unsure? Contact us and we'll help you pick the perfect size!</p>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default SizeGuide;
