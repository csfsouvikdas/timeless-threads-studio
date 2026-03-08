import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">My Favorites</h1>

          {favorites.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
              <h2 className="font-heading text-xl text-foreground mb-2">No favorites yet</h2>
              <p className="font-body text-muted-foreground mb-6">Tap the heart icon on products you love to save them here.</p>
              <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full">
                Browse Products
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {favorites.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative rounded-2xl overflow-hidden mb-3 bg-beige">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                      <span className="absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-0.5 md:py-1 bg-card/90 backdrop-blur-sm rounded-full font-body text-[10px] md:text-xs font-medium text-foreground">
                        {product.category}
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-heading text-sm md:text-lg font-semibold text-foreground mb-0.5 hover:text-primary transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="font-body text-xs md:text-sm font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                        className="p-1.5 md:p-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex-shrink-0"
                        title="Add to cart"
                      >
                        <ShoppingBag size={14} className="text-primary md:w-4 md:h-4" />
                      </button>
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="p-1.5 md:p-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 transition-colors flex-shrink-0"
                        title="Remove from favorites"
                      >
                        <Trash2 size={14} className="text-destructive md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
