import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingBag, Heart, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Hoodies", "T-Shirts", "Sweatshirts", "Custom", "Limited Edition"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

const MOBILE_PAGE_SIZE = 4;

const Shop = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam && categories.includes(categoryParam) ? categoryParam : "All");
  const [sortBy, setSortBy] = useState("Newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [mobilePage, setMobilePage] = useState(1);
  const isMobile = useIsMobile();

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.visible);
    if (selectedCategory !== "All") result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedCategory, sortBy, priceRange]);

  // Reset page when filters change
  const totalMobilePages = Math.ceil(filtered.length / MOBILE_PAGE_SIZE);
  const displayProducts = isMobile ? filtered.slice((mobilePage - 1) * MOBILE_PAGE_SIZE, mobilePage * MOBILE_PAGE_SIZE) : filtered;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setMobilePage(1);
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">Our Collection</h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
              Every piece is handcrafted with love. Find your perfect crochet companion.
            </p>
          </motion.div>

          {/* Filters bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-body text-xs md:text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-accent-foreground"
                      : "bg-card text-muted-foreground border border-border hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-card border border-border font-body text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-xl bg-card border border-border md:hidden"
              >
                {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
              </button>
            </div>
          </div>

          {/* Price filter */}
          <div className={`mb-8 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="flex items-center gap-4 font-body text-sm">
              <span className="text-muted-foreground">Price:</span>
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-48 accent-primary"
              />
              <span className="text-foreground font-medium">Up to ₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4 bg-beige">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 px-2 md:px-3 py-0.5 md:py-1 bg-card/90 backdrop-blur-sm rounded-full font-body text-[10px] md:text-xs font-medium text-foreground">
                      {product.category}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                      className={`absolute top-1.5 right-1.5 md:top-4 md:right-4 p-1 md:p-2 rounded-full backdrop-blur-sm transition-colors ${
                        isFavorite(product.id) ? "bg-primary/90 text-accent-foreground" : "bg-card/90 text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Heart size={12} className={`md:w-4 md:h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                    </button>
                    {product.stock <= 3 && (
                      <span className="absolute bottom-2 right-2 md:bottom-4 md:right-4 px-2 md:px-3 py-0.5 md:py-1 bg-primary/90 backdrop-blur-sm rounded-full font-body text-[10px] md:text-xs font-medium text-accent-foreground">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>
                </Link>
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-heading text-xs md:text-lg font-semibold text-foreground mb-0.5 hover:text-primary transition-colors truncate">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-body text-[11px] md:text-sm font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                    className="p-1 md:p-2 rounded-lg md:rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex-shrink-0"
                    title="Quick add to cart"
                  >
                    <ShoppingBag size={12} className="text-primary md:w-4 md:h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile pagination */}
          {isMobile && totalMobilePages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setMobilePage((p) => Math.max(1, p - 1))}
                disabled={mobilePage === 1}
                className="p-2 rounded-full bg-card border border-border disabled:opacity-30 transition-opacity"
              >
                <ChevronLeft size={18} className="text-foreground" />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalMobilePages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobilePage(i + 1)}
                    className={`w-8 h-8 rounded-full font-body text-xs font-medium transition-all ${
                      mobilePage === i + 1
                        ? "bg-primary text-accent-foreground"
                        : "bg-card border border-border text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMobilePage((p) => Math.min(totalMobilePages, p + 1))}
                disabled={mobilePage === totalMobilePages}
                className="p-2 rounded-full bg-card border border-border disabled:opacity-30 transition-opacity"
              >
                <ChevronRight size={18} className="text-foreground" />
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground text-lg">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
