import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

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
          ? "bg-card/90 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-foreground tracking-tight">
          Timeless Threads
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/my-orders" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Orders
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-pink/50 transition-colors"
                title="Logout"
              >
                <LogOut size={18} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1 p-2 rounded-full hover:bg-pink/50 transition-colors"
            >
              <User size={18} className="text-foreground" />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-pink/50 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} className="text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base text-foreground py-2"
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="font-body text-base text-foreground py-2">
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="font-body text-base text-primary py-2">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="font-body text-base text-destructive py-2 text-left">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="font-body text-base text-primary py-2">
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
