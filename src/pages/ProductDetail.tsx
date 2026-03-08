import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(id || "");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-foreground mb-4">Product not found</h2>
          <button onClick={() => navigate("/shop")} className="text-primary font-body underline">
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity, customText || undefined);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="rounded-2xl overflow-hidden bg-beige">
                <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <span className="font-body text-sm tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="font-body text-2xl font-bold text-primary mb-6">₹{product.price.toLocaleString()}</p>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              {/* Size selector */}
              <div className="mb-6">
                <label className="font-body text-sm font-semibold text-foreground mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl font-body text-sm font-medium border transition-all ${
                        selectedSize === size
                          ? "bg-primary text-accent-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color selector */}
              <div className="mb-6">
                <label className="font-body text-sm font-semibold text-foreground mb-3 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 rounded-xl font-body text-sm font-medium border transition-all ${
                        selectedColor === color
                          ? "bg-primary text-accent-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom text */}
              {product.category === "Custom" && (
                <div className="mb-6">
                  <label className="font-body text-sm font-semibold text-foreground mb-3 block">Custom Text to Stitch</label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter text to stitch on your piece..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    maxLength={50}
                  />
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="font-body text-sm font-semibold text-foreground mb-3 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="font-body text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
                <button className="p-4 rounded-full border border-border hover:bg-pink/30 transition-colors">
                  <Heart size={18} className="text-foreground" />
                </button>
              </div>

              {/* Care instructions */}
              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Care Instructions</h3>
                <p className="font-body text-sm text-muted-foreground">{product.careInstructions}</p>
              </div>

              {product.stock <= 5 && (
                <p className="mt-4 font-body text-sm text-primary font-medium">
                  ⚡ Only {product.stock} left in stock!
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
