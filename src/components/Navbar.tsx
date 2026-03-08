import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl shadow-soft border-b border-border/50 py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors border border-primary/10"
            >
              <Sparkles size={17} className="text-primary" />
            </motion.div>
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
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative px-4 py-2 font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-primary/5 group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-4 transition-all duration-300" />
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 font-body text-sm font-medium text-primary hover:bg-primary/10 rounded-full transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5">
            {user ? (
              <div className="hidden md:flex items-center gap-0.5">
                <Link
                  to="/my-orders"
                  className="px-3 py-2 rounded-full hover:bg-primary/5 transition-colors font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-full hover:bg-primary/5 transition-colors"
                  title="Logout"
                >
                  <LogOut size={17} className="text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-primary/5 transition-colors font-body text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <User size={16} />
                Sign In
              </Link>
            )}

            <Link
              to="/favorites"
              className="relative p-2.5 rounded-full hover:bg-primary/5 transition-colors"
              aria-label="Favorites"
            >
              <Heart size={19} className="text-foreground" />
              {favCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {favCount}
                </motion.span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-primary/5 transition-colors"
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
              className="md:hidden p-2.5 rounded-full hover:bg-primary/5 transition-colors"
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
            className="md:hidden bg-card/98 backdrop-blur-xl border-t border-border/50"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base text-foreground py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/favorites" onClick={() => setMobileOpen(false)} className="font-body text-base text-foreground py-3 px-4 rounded-xl hover:bg-primary/5 flex items-center gap-2">
                <Heart size={16} className="text-primary" />
                Favorites {favCount > 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{favCount}</span>}
              </Link>
              {user ? (
                <>
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="font-body text-base text-foreground py-3 px-4 rounded-xl hover:bg-primary/5">
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
