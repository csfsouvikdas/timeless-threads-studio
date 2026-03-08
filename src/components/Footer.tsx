import { Instagram, Send, Heart } from "lucide-react";

const footerLinks = {
  Shop: ["Hoodies", "T-Shirts", "Sweatshirts", "Custom Orders", "Limited Edition"],
  Company: ["Our Story", "How It Works", "FAQs", "Contact Us"],
  Support: ["Shipping & Returns", "Size Guide", "Care Instructions", "Track Order"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-8 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-12 mb-6 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-4">
              Timeless Threads
            </h3>
            <p className="font-body text-xs md:text-sm text-card/60 leading-relaxed mb-4 md:mb-6 max-w-sm">
              Handcrafted crochet clothing made with love. Every stitch tells a
              story, every piece is unique.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-card/10 border border-card/20 rounded-full font-body text-xs md:text-sm text-card placeholder:text-card/40 focus:outline-none focus:border-primary"
              />
              <button className="p-2 md:p-3 bg-primary rounded-full hover:shadow-hover transition-all" aria-label="Subscribe">
                <Send size={14} className="text-accent-foreground md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-4">
                {title}
              </h4>
              <ul className="space-y-1.5 md:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-xs md:text-sm text-card/60 hover:text-card transition-colors"
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
        <div className="border-t border-card/10 pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
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
