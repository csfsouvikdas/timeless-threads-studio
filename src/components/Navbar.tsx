import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, LogOut, Heart, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Order", href: "/custom-order" },
  { label: "Our Story", href: "/#story" },
  { label: "How It Works", href: "/#process" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { favCount } = useFavorites();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-lg shadow-soft py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <Sparkles size={16} className="text-primary" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold text-foreground tracking-tight block leading-tight">
                Timeless Threads
              </span>
              <span className="font-body text-[9px] tracking-[0.25em] uppercase text-primary/70 font-medium">
                Handcrafted Crochet
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative px-4 py-2 font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-pink/20"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 font-body text-sm font-medium text-primary hover:bg-primary/10 rounded-full transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {user ? (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  to="/my-orders"
                  className="px-3 py-2 rounded-full hover:bg-pink/20 transition-colors font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-full hover:bg-pink/20 transition-colors"
                  title="Logout"
                >
                  <LogOut size={17} className="text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-pink/20 transition-colors font-body text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <User size={16} />
                Sign In
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-pink/20 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={19} className="text-foreground" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden p-2.5 rounded-full hover:bg-pink/20 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/98 backdrop-blur-lg border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base text-foreground py-3 px-4 rounded-xl hover:bg-pink/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="font-body text-base text-foreground py-3 px-4 rounded-xl hover:bg-pink/20">
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="font-body text-base text-primary py-3 px-4 rounded-xl hover:bg-primary/10">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="font-body text-base text-destructive py-3 px-4 rounded-xl hover:bg-destructive/10 text-left">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="font-body text-base text-primary py-3 px-4 rounded-xl hover:bg-primary/10 font-medium">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
