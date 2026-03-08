import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Check, IndianRupee, Tag, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { useCoupons } from "@/contexts/CouponContext";
import { ShippingAddress } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const clothingTypes = [
  { name: "Hoodie", basePrice: 3499 },
  { name: "T-Shirt", basePrice: 1799 },
  { name: "Sweatshirt", basePrice: 2999 },
  { name: "Cardigan", basePrice: 3299 },
];
const colorOptions = ["Blush Pink", "Cream", "Lavender", "Sage", "Mocha", "White", "Black"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const stepLabels = ["Clothing", "Color", "Size", "Design", "Notes", "Review", "Shipping", "Payment", "Confirmation"];

const sizeUpcharge: Record<string, number> = { XS: 0, S: 0, M: 0, L: 200, XL: 400, XXL: 600 };
const CUSTOM_TEXT_PRICE = 299;
const DESIGN_UPLOAD_PRICE = 499;

const CustomOrderPage = () => {
  const { user } = useAuth();
  const { addCustomOrder } = useOrders();
  const { applyCoupon, incrementUsage } = useCoupons();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [clothingType, setClothingType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [customText, setCustomText] = useState("");
  const [notes, setNotes] = useState("");
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  // Shipping
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");

  // Confirmation
  const [orderId, setOrderId] = useState("");

  if (!user) {
    navigate("/login?redirect=/custom-order");
    return null;
  }

  const selectedClothing = clothingTypes.find((c) => c.name === clothingType);
  const basePrice = selectedClothing?.basePrice || 0;
  const sizeExtra = sizeUpcharge[size] || 0;
  const textExtra = customText.trim() ? CUSTOM_TEXT_PRICE : 0;
  const designExtra = referenceFile ? DESIGN_UPLOAD_PRICE : 0;
  const subtotal = basePrice + sizeExtra + textExtra + designExtra;
  const shippingCost = subtotal > 2000 ? 0 : 99;
  const grandTotal = subtotal + shippingCost - couponDiscount;

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode, subtotal);
    setCouponMessage(result.message);
    if (result.valid) {
      setCouponDiscount(result.discount);
      setCouponApplied(true);
      setAppliedCode(couponCode.toUpperCase());
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setCouponApplied(false);
    setCouponMessage("");
    setCouponCode("");
    setAppliedCode("");
  };

  const handlePlaceOrder = () => {
    if (couponApplied) incrementUsage(appliedCode);
    const order = addCustomOrder({
      userId: user.id,
      clothingType,
      color,
      size,
      customText,
      notes,
      referenceImageUrl: referenceFile ? URL.createObjectURL(referenceFile) : undefined,
      status: "Pending",
      estimatedPrice: grandTotal,
    });
    setOrderId(order?.id || `CO-${Date.now()}`);
    setStep(8);
  };

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
          <div className="flex gap-1 mb-6 overflow-x-auto">
            {stepLabels.map((s, i) => (
              <div key={s} className="flex-1 min-w-0">
                <div className={`h-2 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                <span className={`font-body text-[10px] block truncate ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
              </div>
            ))}
          </div>

          {/* Cost Estimator - visible after clothing selection, before confirmation */}
          {clothingType && step < 8 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <IndianRupee size={16} className="text-primary" />
                <span className="font-heading text-sm font-semibold text-foreground">Estimated Cost</span>
              </div>
              <div className="space-y-1.5 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{clothingType} (Base)</span>
                  <span className="text-foreground">₹{basePrice.toLocaleString()}</span>
                </div>
                {sizeExtra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size {size} upcharge</span>
                    <span className="text-foreground">+₹{sizeExtra}</span>
                  </div>
                )}
                {textExtra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom text stitching</span>
                    <span className="text-foreground">+₹{textExtra}</span>
                  </div>
                )}
                {designExtra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom design upload</span>
                    <span className="text-foreground">+₹{designExtra}</span>
                  </div>
                )}
                {step >= 7 && shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">+₹{shippingCost}</span>
                  </div>
                )}
                {step >= 7 && shippingCost === 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-primary">Coupon Discount</span>
                    <span className="text-primary">-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-primary/20 pt-2 mt-2 flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary text-lg">₹{(step >= 7 ? grandTotal : subtotal).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl border border-border p-8">
            {/* Step 0: Clothing */}
            {step === 0 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Choose Clothing Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {clothingTypes.map((type) => (
                    <button
                      key={type.name}
                      onClick={() => { setClothingType(type.name); setStep(1); }}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        clothingType === type.name ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary text-muted-foreground"
                      }`}
                    >
                      <span className="font-body font-medium block">{type.name}</span>
                      <span className="font-body text-xs text-primary font-semibold">from ₹{type.basePrice.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Color */}
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

            {/* Step 2: Size */}
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
                      <span className="block">{s}</span>
                      {sizeUpcharge[s] > 0 && (
                        <span className="text-[10px] text-primary">+₹{sizeUpcharge[s]}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Design */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Upload Design & Custom Text</h3>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">Reference Image (+₹{DESIGN_UPLOAD_PRICE})</label>
                  <label className="flex items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                    <span className="font-body text-sm text-muted-foreground">
                      {referenceFile ? referenceFile.name : "Click to upload"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setReferenceFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-2 block">Custom Text to Stitch (+₹{CUSTOM_TEXT_PRICE})</label>
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

            {/* Step 4: Notes */}
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

            {/* Step 5: Review */}
            {step === 5 && (
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">Review Your Custom Order</h3>
                <div className="space-y-3 mb-6">
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
                  <button onClick={() => setStep(6)} className="flex-1 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
                    Continue to Shipping
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Shipping */}
            {step === 6 && (
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Shipping Address</h3>
                <div className="space-y-4">
                  {(["fullName", "phone", "address", "city", "state", "pincode"] as const).map((field) => (
                    <div key={field}>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block capitalize">
                        {field === "fullName" ? "Full Name" : field === "pincode" ? "PIN Code" : field}
                      </label>
                      <input
                        type={field === "phone" ? "tel" : "text"}
                        value={address[field]}
                        onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        maxLength={field === "pincode" ? 6 : field === "phone" ? 10 : 100}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const allFilled = Object.values(address).every((v) => v.trim());
                      if (allFilled) setStep(7);
                    }}
                    className="w-full py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all mt-4"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Payment */}
            {step === 7 && (
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Payment</h3>

                {/* Coupon Section */}
                <div className="mb-6 p-4 rounded-xl border border-border bg-muted/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-primary" />
                    <span className="font-body text-sm font-semibold text-foreground">Have a coupon?</span>
                  </div>
                  {couponApplied ? (
                    <div className="flex items-center justify-between bg-primary/10 rounded-lg px-4 py-3">
                      <div>
                        <span className="font-body text-sm font-bold text-primary">{appliedCode}</span>
                        <span className="font-body text-xs text-muted-foreground ml-2">— ₹{couponDiscount} off</span>
                      </div>
                      <button onClick={handleRemoveCoupon} className="p-1 rounded-full hover:bg-destructive/10 transition-colors">
                        <X size={16} className="text-destructive" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponMessage(""); }}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm uppercase focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-5 py-2.5 bg-primary text-accent-foreground font-body text-sm font-semibold rounded-lg disabled:opacity-50 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponMessage && !couponApplied && (
                    <p className="font-body text-xs text-destructive mt-2">{couponMessage}</p>
                  )}
                  {couponMessage && couponApplied && (
                    <p className="font-body text-xs text-primary mt-2">{couponMessage}</p>
                  )}
                </div>

                {/* Billing Summary */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-primary">Coupon Discount</span>
                      <span className="text-primary">-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-body font-semibold text-foreground">Total</span>
                    <span className="font-body font-bold text-primary text-xl">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 mb-6">
                  <p className="font-body text-sm text-muted-foreground">
                    💳 Payment via Razorpay will be integrated with your live keys. For now, this is a mock checkout.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(6)}
                    className="flex-1 py-4 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border hover:bg-muted transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Confirmation */}
            {step === 8 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-primary" />
                </div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Custom Order Confirmed!</h2>
                <p className="font-body text-muted-foreground mb-2">Thank you for your custom order.</p>
                <p className="font-body text-sm font-semibold text-primary mb-2">Order ID: {orderId}</p>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Total: <span className="font-bold text-primary">₹{grandTotal.toLocaleString()}</span>
                </p>

                <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left">
                  <h3 className="font-body text-sm font-semibold text-foreground mb-2">Shipping to:</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {address.fullName}, {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left">
                  <h3 className="font-body text-sm font-semibold text-foreground mb-2">Order Details:</h3>
                  <div className="space-y-1 font-body text-sm text-muted-foreground">
                    <p>{clothingType} — {color} — {size}</p>
                    {customText && <p>Custom Text: {customText}</p>}
                    {referenceFile && <p>Reference Design: {referenceFile.name}</p>}
                  </div>
                </div>

                <p className="font-body text-sm text-muted-foreground mb-8">We'll review your design and get back to you soon.</p>

                <div className="flex gap-3 justify-center">
                  <button onClick={() => navigate("/my-orders")} className="px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all">
                    View Orders
                  </button>
                  <button onClick={() => navigate("/")} className="px-8 py-3 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border hover:bg-muted transition-all">
                    Back to Home
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
