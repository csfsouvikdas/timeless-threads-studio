import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package, ShoppingCart, DollarSign, Users, TrendingUp,
  Plus, Pencil, Trash2, Eye, EyeOff, ChevronDown, ArrowLeft, FileText
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/contexts/ProductContext";
import { useOrders } from "@/contexts/OrderContext";
import { Product, Order } from "@/types";
import Navbar from "@/components/Navbar";

type Tab = "overview" | "products" | "orders" | "custom-orders";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, customOrders, updateOrderStatus, updateCustomOrderStatus } = useOrders();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!user || !isAdmin) {
    navigate("/login?redirect=/admin");
    return null;
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status !== "Delivered").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="font-body text-sm text-muted-foreground">Manage your store, orders, and products.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(["overview", "products", "orders", "custom-orders"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all capitalize ${
                  tab === t ? "bg-primary text-accent-foreground" : "bg-card text-muted-foreground border border-border hover:border-primary"
                }`}
              >
                {t.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Overview */}
          {tab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-primary" },
                  { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
                  { label: "Pending", value: pendingOrders, icon: TrendingUp, color: "text-primary" },
                  { label: "Products", value: products.length, icon: Package, color: "text-primary" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-sm text-muted-foreground">{stat.label}</span>
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
                {orders.length === 0 ? (
                  <p className="font-body text-sm text-muted-foreground">No orders yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 font-body text-xs text-muted-foreground font-medium">Order ID</th>
                          <th className="text-left py-3 font-body text-xs text-muted-foreground font-medium">Items</th>
                          <th className="text-left py-3 font-body text-xs text-muted-foreground font-medium">Total</th>
                          <th className="text-left py-3 font-body text-xs text-muted-foreground font-medium">Status</th>
                          <th className="text-left py-3 font-body text-xs text-muted-foreground font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 10).map((order) => (
                          <tr key={order.id} className="border-b border-border/50">
                            <td className="py-3 font-body text-sm text-foreground font-medium">{order.id}</td>
                            <td className="py-3 font-body text-sm text-muted-foreground">{order.items.length} items</td>
                            <td className="py-3 font-body text-sm text-foreground">₹{order.total.toLocaleString()}</td>
                            <td className="py-3">
                              <span className="px-2 py-1 rounded-full bg-primary/10 font-body text-xs text-primary font-medium">
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 font-body text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Products */}
          {tab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">All Products</h3>
                <button
                  onClick={() => { setShowAddForm(true); setEditingProduct(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-accent-foreground font-body text-sm font-semibold rounded-full"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {(showAddForm || editingProduct) && (
                <ProductForm
                  product={editingProduct}
                  onSave={(data) => {
                    if (editingProduct) {
                      updateProduct(editingProduct.id, data);
                    } else {
                      addProduct(data as Omit<Product, "id">);
                    }
                    setShowAddForm(false);
                    setEditingProduct(null);
                  }}
                  onCancel={() => { setShowAddForm(false); setEditingProduct(null); }}
                />
              )}

              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 bg-card rounded-xl border border-border p-4">
                    <img src={product.images[0]} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body text-sm font-semibold text-foreground truncate">{product.name}</h4>
                      <p className="font-body text-xs text-muted-foreground">{product.category} • Stock: {product.stock}</p>
                    </div>
                    <span className="font-body text-sm font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateProduct(product.id, { visible: !product.visible })} className="p-2 rounded-lg hover:bg-muted transition-colors" title={product.visible ? "Hide" : "Show"}>
                        {product.visible ? <Eye size={16} className="text-muted-foreground" /> : <EyeOff size={16} className="text-muted-foreground" />}
                      </button>
                      <button onClick={() => setEditingProduct(product)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Pencil size={16} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Order Management</h3>
              {orders.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Custom Orders */}
          {tab === "custom-orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Custom Order Requests</h3>
              {customOrders.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground">No custom orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {customOrders.map((co) => (
                    <div key={co.id} className="bg-card rounded-2xl border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-body text-xs text-muted-foreground">{co.id}</p>
                          <p className="font-body text-sm font-semibold text-foreground">
                            {co.clothingType} • {co.color} • {co.size}
                          </p>
                        </div>
                        <select
                          value={co.status}
                          onChange={(e) => updateCustomOrderStatus(co.id, e.target.value as any)}
                          className="px-3 py-1 rounded-lg border border-border bg-background font-body text-xs focus:outline-none"
                        >
                          {["Pending", "Approved", "In Progress", "Completed", "Rejected"].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      {co.customText && <p className="font-body text-sm text-muted-foreground mb-2">Text: "{co.customText}"</p>}
                      {co.notes && <p className="font-body text-sm text-muted-foreground mb-2">Notes: {co.notes}</p>}
                      {co.referenceImageUrl && (
                        <img src={co.referenceImageUrl} alt="Reference" className="w-32 h-32 rounded-lg object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: Order["status"]) => void }) => {
  const statuses: Order["status"][] = ["Order Received", "Design In Progress", "Stitching", "Shipped", "Delivered"];

  const generateInvoice = () => {
    const invoiceContent = `
TIMELESS THREADS — INVOICE
============================
Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}

Ship To:
${order.shippingAddress.fullName}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
Phone: ${order.shippingAddress.phone}

Items:
${order.items.map((i) => `  ${i.product.name} (${i.size}, ${i.color}) × ${i.quantity} — ₹${(i.product.price * i.quantity).toLocaleString()}`).join("\n")}

----------------------------
Total: ₹${order.total.toLocaleString()}
Payment: ${order.paymentMethod}
============================
Thank you for shopping with Timeless Threads!
    `.trim();

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="font-body text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="font-body text-sm font-semibold text-foreground">{order.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value as Order["status"])}
            className="px-3 py-2 rounded-lg border border-border bg-background font-body text-xs focus:outline-none"
          >
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={generateInvoice} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary font-body text-xs font-medium hover:bg-primary/20 transition-colors">
            <FileText size={14} /> Invoice
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="font-body text-xs text-muted-foreground">
          Ship to: {order.shippingAddress.fullName}, {order.shippingAddress.city}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {order.items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
            <img src={item.product.images[0]} alt={item.product.name} className="w-8 h-8 rounded object-cover" />
            <span className="font-body text-xs text-foreground">{item.product.name} × {item.quantity}</span>
          </div>
        ))}
      </div>

      <p className="font-body text-sm font-bold text-primary">Total: ₹{order.total.toLocaleString()}</p>
    </div>
  );
};

const ProductForm = ({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState(product?.category || "T-Shirts");
  const [stock, setStock] = useState(product?.stock?.toString() || "10");
  const [sizes, setSizes] = useState(product?.sizes?.join(", ") || "S, M, L, XL");
  const [colors, setColors] = useState(product?.colors?.join(", ") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      price: Number(price),
      category: category as Product["category"],
      stock: Number(stock),
      sizes: sizes.split(",").map((s) => s.trim()),
      colors: colors.split(",").map((c) => c.trim()),
      images: product?.images || ["/placeholder.svg"],
      visible: product?.visible ?? true,
      careInstructions: product?.careInstructions || "Hand wash cold. Lay flat to dry.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 mb-6 space-y-4">
      <h4 className="font-heading text-lg font-semibold text-foreground">{product ? "Edit Product" : "Add Product"}</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none">
            {["Hoodies", "T-Shirts", "Sweatshirts", "Custom", "Limited Edition"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Sizes (comma separated)</label>
          <input value={sizes} onChange={(e) => setSizes(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-foreground mb-1 block">Colors (comma separated)</label>
          <input value={colors} onChange={(e) => setColors(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <div>
        <label className="font-body text-xs font-medium text-foreground mb-1 block">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="px-5 py-2 bg-card text-foreground font-body text-sm font-medium rounded-full border border-border">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2 bg-primary text-accent-foreground font-body text-sm font-semibold rounded-full">
          {product ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
};

export default Admin;
