import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Continue Shopping
          </button>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Your Cart {itemCount > 0 && <span className="text-primary">({itemCount})</span>}
          </h1>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="font-heading text-xl text-foreground mb-2">Your cart is empty</h2>
              <p className="font-body text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all"
              >
                Browse Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-heading text-base font-semibold text-foreground hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Size: {item.size} • Color: {item.color}
                        {item.customText && ` • Text: "${item.customText}"`}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="p-1 rounded-lg border border-border hover:bg-muted transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-body text-sm font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="p-1 rounded-lg border border-border hover:bg-muted transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-body text-sm font-bold text-foreground">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-medium">{total > 2000 ? "Free" : "₹99"}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-body">
                      <span className="text-foreground font-semibold">Total</span>
                      <span className="text-primary font-bold text-lg">
                        ₹{(total > 2000 ? total : total + 99).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300"
                  >
                    Proceed to Checkout
                  </button>
                  {total <= 2000 && (
                    <p className="font-body text-xs text-muted-foreground text-center mt-3">
                      Add ₹{(2001 - total).toLocaleString()} more for free shipping
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
