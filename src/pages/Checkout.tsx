import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { ShippingAddress } from "@/types";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";

const steps = ["Shipping", "Payment", "Confirmation"];

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState("");

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shippingCost = total > 2000 ? 0 : 99;
  const grandTotal = total + shippingCost;

  const handlePlaceOrder = () => {
    if (!user) return;
    const order = addOrder({
      userId: user.id,
      items: [...items],
      total: grandTotal,
      status: "Order Received",
      shippingAddress: address,
      paymentMethod: "Razorpay (COD Mock)",
    });
    setOrderId(order.id);
    clearCart();
    setStep(2);
  };

  if (items.length === 0 && step < 2) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold ${
                    i <= step ? "bg-primary text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className={`font-body text-sm ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="w-12 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Step 0: Shipping */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Shipping Address</h2>
              <div className="space-y-4">
                {(["fullName", "phone", "address", "city", "state", "pincode"] as const).map((field) => (
                  <div key={field}>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block capitalize">
                      {field === "fullName" ? "Full Name" : field === "pincode" ? "PIN Code" : field}
                    </label>
                    <input
                      type={field === "phone" ? "tel" : field === "pincode" ? "text" : "text"}
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
                    if (allFilled) setStep(1);
                  }}
                  className="w-full py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all mt-4"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Payment</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
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
                  onClick={() => setStep(0)}
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
            </motion.div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Order Confirmed!</h2>
              <p className="font-body text-muted-foreground mb-2">Thank you for your order.</p>
              <p className="font-body text-sm font-semibold text-primary mb-8">Order ID: {orderId}</p>

              <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left">
                <h3 className="font-body text-sm font-semibold text-foreground mb-2">Shipping to:</h3>
                <p className="font-body text-sm text-muted-foreground">
                  {address.fullName}, {address.address}, {address.city}, {address.state} - {address.pincode}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={() => navigate("/my-orders")} className="px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all">
                  View Orders
                </button>
                <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border hover:bg-muted transition-all">
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
