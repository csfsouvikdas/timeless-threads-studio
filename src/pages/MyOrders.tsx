import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { Package, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusSteps = ["Order Received", "Design In Progress", "Stitching", "Shipped", "Delivered"] as const;

const MyOrders = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login?redirect=/my-orders");
    return null;
  }

  const orders = getUserOrders(user.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Package size={48} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="font-heading text-xl text-foreground mb-2">No orders yet</h2>
              <p className="font-body text-muted-foreground mb-6">Start shopping to see your orders here.</p>
              <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
                Shop Now
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const currentStep = statusSteps.indexOf(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl border border-border p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div>
                        <p className="font-body text-xs text-muted-foreground">Order ID</p>
                        <p className="font-body text-sm font-semibold text-foreground">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="font-body text-sm font-bold text-primary">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center gap-1 mb-4">
                      {statusSteps.map((s, i) => (
                        <div key={s} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-full h-2 rounded-full ${
                              i <= currentStep ? "bg-primary" : "bg-muted"
                            }`}
                          />
                          <span className={`font-body text-[10px] mt-1 text-center ${
                            i <= currentStep ? "text-primary font-medium" : "text-muted-foreground"
                          }`}>
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-8 h-8 rounded object-cover" />
                          <span className="font-body text-xs text-foreground">{item.product.name} × {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
