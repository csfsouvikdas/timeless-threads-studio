import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productSweatshirt from "@/assets/product-sweatshirt.jpg";
import productCustom from "@/assets/product-custom.jpg";

const products = [
  {
    id: 1,
    name: "Rosé Crochet Hoodie",
    price: "₹3,499",
    category: "Hoodies",
    image: productHoodie,
  },
  {
    id: 2,
    name: "Vanilla Knit Top",
    price: "₹1,999",
    category: "T-Shirts",
    image: productTshirt,
  },
  {
    id: 3,
    name: "Lavender Dream Sweater",
    price: "₹2,999",
    category: "Sweatshirts",
    image: productSweatshirt,
  },
  {
    id: 4,
    name: "Custom Floral Crewneck",
    price: "₹4,499",
    category: "Custom",
    image: productCustom,
  },
];

const FeaturedProducts = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Our Collection
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Featured Products
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-beige">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                {/* Quick actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-card/95 backdrop-blur-sm rounded-xl font-body text-sm font-semibold text-foreground hover:bg-card transition-colors">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                  <button className="p-3 bg-card/95 backdrop-blur-sm rounded-xl hover:bg-card transition-colors">
                    <Heart size={16} className="text-foreground" />
                  </button>
                </div>

                {/* Category badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full font-body text-xs font-medium text-foreground">
                  {product.category}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                {product.name}
              </h3>
              <p className="font-body text-sm font-semibold text-primary">
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-body font-semibold text-sm rounded-full border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
