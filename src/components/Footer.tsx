import { Instagram, Send, Heart, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Shop: [
    { label: "Hoodies", to: "/shop?category=Hoodies" },
    { label: "T-Shirts", to: "/shop?category=T-Shirts" },
    { label: "Sweatshirts", to: "/shop?category=Sweatshirts" },
    { label: "Custom Orders", to: "/custom-order" },
    { label: "Limited Edition", to: "/shop?category=Limited+Edition" },
  ],
  Company: [
    { label: "Our Story", to: "/our-story" },
    { label: "How It Works", to: "/#how-it-works" },
    { label: "FAQs", to: "/faqs" },
    { label: "Contact Us", to: "/contact" },
  ],
  Support: [
    { label: "Shipping & Returns", to: "/shipping-returns" },
    { label: "Size Guide", to: "/size-guide" },
    { label: "Care Instructions", to: "/care-instructions" },
    { label: "Track Order", to: "/track-order" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-card overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary/60 via-pink to-lavender" />

      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-14">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-card/20 shadow-lg">
                <img src={logo} alt="TimelessThreads" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold leading-tight">
                  TimelessThreads
                </h3>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/80 font-medium">
                  By Vipassana
                </span>
              </div>
            </div>

            <p className="font-body text-sm text-card/50 leading-relaxed mb-6 max-w-xs">
              Handcrafted crochet clothing made with love. Every stitch tells a
              story, every piece is one-of-a-kind.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-card/70 mb-3">
                Join our cozy community
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-card/10 border border-card/15 rounded-full font-body text-sm text-card placeholder:text-card/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="px-5 py-3 bg-primary rounded-full hover:shadow-hover transition-all font-body text-xs font-semibold text-accent-foreground flex items-center gap-2">
                  <Send size={13} />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/timeless_threads07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-card/10 rounded-full hover:bg-card/15 transition-colors group"
              >
                <Instagram size={16} className="text-card/60 group-hover:text-primary transition-colors" />
                <span className="font-body text-xs text-card/60 group-hover:text-card/80 transition-colors">
                  @timeless_threads07
                </span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-card/80 mb-4 pb-2 border-b border-card/10">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-card/45 hover:text-card hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-card/80 mb-4 pb-2 border-b border-card/10">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a href="mailto:hello@timelessthreads.in" className="flex items-center gap-2.5 font-body text-sm text-card/45 hover:text-card transition-colors">
                <Mail size={14} className="text-primary/70 flex-shrink-0" />
                hello@timelessthreads.in
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 font-body text-sm text-card/45 hover:text-card transition-colors">
                <Phone size={14} className="text-primary/70 flex-shrink-0" />
                +91 98765 43210
              </a>
              <div className="flex items-start gap-2.5 font-body text-sm text-card/45">
                <MapPin size={14} className="text-primary/70 flex-shrink-0 mt-0.5" />
                <span>Handmade in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-card/35">
            © 2026 TimelessThreads by Vipassana. Made with{" "}
            <Heart size={10} className="inline text-primary fill-primary" /> in India.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/shipping-returns" className="font-body text-[11px] text-card/35 hover:text-card/60 transition-colors">
              Shipping Policy
            </Link>
            <Link to="/faqs" className="font-body text-[11px] text-card/35 hover:text-card/60 transition-colors">
              FAQs
            </Link>
            <Link to="/contact" className="font-body text-[11px] text-card/35 hover:text-card/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-lavender/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
