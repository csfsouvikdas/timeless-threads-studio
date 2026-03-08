import { Instagram, Send, Heart } from "lucide-react";

const footerLinks = {
  Shop: ["Hoodies", "T-Shirts", "Sweatshirts", "Custom Orders", "Limited Edition"],
  Company: ["Our Story", "How It Works", "FAQs", "Contact Us"],
  Support: ["Shipping & Returns", "Size Guide", "Care Instructions", "Track Order"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Timeless Threads
            </h3>
            <p className="font-body text-sm text-card/60 leading-relaxed mb-6 max-w-sm">
              Handcrafted crochet clothing made with love. Every stitch tells a
              story, every piece is unique.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-card/10 border border-card/20 rounded-full font-body text-sm text-card placeholder:text-card/40 focus:outline-none focus:border-primary"
              />
              <button className="p-3 bg-primary rounded-full hover:shadow-hover transition-all" aria-label="Subscribe">
                <Send size={16} className="text-accent-foreground" />
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-card/60 hover:text-card transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-card/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-card/40">
            © 2026 Timeless Threads. Made with{" "}
            <Heart size={12} className="inline text-primary" /> in India.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-card/40 hover:text-card transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <span className="font-body text-xs text-card/30">
              @timeless_threads
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
