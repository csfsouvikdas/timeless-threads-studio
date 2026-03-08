import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const clothingTypes = ["Hoodie", "T-Shirt", "Sweatshirt", "Cardigan"];
const colorOptions = ["Blush Pink", "Cream", "Lavender", "Sage", "Mocha", "White", "Black"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const stepLabels = ["Clothing", "Color", "Size", "Design", "Notes", "Review"];

const CustomOrderPage = () => {
  const { user } = useAuth();
  const { addCustomOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [clothingType, setClothingType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [customText, setCustomText] = useState("");
  const [notes, setNotes] = useState("");
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  if (!user) {
    navigate("/login?redirect=/custom-order");
    return null;
  }

  const handleSubmit = () => {
    addCustomOrder({
      userId: user.id,
      clothingType,
      color,
      size,
      customText,
      notes,
      referenceImageUrl: referenceFile ? URL.createObjectURL(referenceFile) : undefined,
      status: "Pending",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border p-8 text-center max-w-md mx-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">Custom Order Submitted!</h2>
            <p className="font-body text-muted-foreground mb-6">We'll review your design and get back to you soon.</p>
            <button onClick={() => navigate("/")} className="px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">Create Custom Design</h1>
          <p className="font-body text-muted-foreground text-center mb-10">Tell us what you want and we'll stitch it for you.</p>

          {/* Progress */}
          <div className="flex gap-1 mb-10">
            {stepLabels.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <span className={`font-body text-[10px] ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl border border-border p-8">
            {step === 0 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Choose Clothing Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {clothingTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setClothingType(type); setStep(1); }}
                      className={`p-4 rounded-xl border text-center font-body font-medium transition-all ${
                        clothingType === type ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary text-muted-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Choose Color</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setColor(c); setStep(2); }}
                      className={`p-3 rounded-xl border text-center font-body text-sm font-medium transition-all ${
                        color === c ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Choose Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSize(s); setStep(3); }}
                      className={`px-6 py-3 rounded-xl border font-body font-medium transition-all ${
                        size === s ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Upload Design & Custom Text</h3>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">Reference Image (optional)</label>
                  <label className="flex items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                    <span className="font-body text-sm text-muted-foreground">
                      {referenceFile ? referenceFile.name : "Click to upload"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setReferenceFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">Custom Text to Stitch</label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter text you want stitched..."
                    maxLength={50}
                  />
                </div>
                <button onClick={() => setStep(4)} className="w-full py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
                  Next
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Special Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Any special instructions for the designer..."
                  maxLength={500}
                />
                <button onClick={() => setStep(5)} className="w-full py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full mt-4">
                  Review Order
                </button>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">Review Your Custom Order</h3>
                <div className="space-y-3 mb-8">
                  {[
                    ["Clothing", clothingType],
                    ["Color", color],
                    ["Size", size],
                    ["Custom Text", customText || "None"],
                    ["Reference Image", referenceFile ? referenceFile.name : "None"],
                    ["Notes", notes || "None"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border">
                    Edit
                  </button>
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
                    Submit Order
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {step > 0 && step < 5 && (
            <button onClick={() => setStep(step - 1)} className="mt-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Previous step
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomOrderPage;
