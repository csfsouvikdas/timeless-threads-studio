import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const AdminLogin = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    const success = login(email, password);
    if (success) {
      // Check admin after login — need to wait for state
      setTimeout(() => navigate("/admin"), 50);
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-6 bg-card rounded-2xl border border-border p-8"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={28} className="text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Admin Access</h1>
            <p className="font-body text-sm text-muted-foreground">Sign in with your admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive font-body text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-2 block">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="admin@timelessthreads.com"
              />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-accent-foreground font-body font-semibold text-sm rounded-full hover:shadow-hover transition-all duration-300"
            >
              Sign In as Admin
            </button>
          </form>

          <div className="mt-6 p-3 rounded-xl bg-muted/50 font-body text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Admin Credentials:</p>
            <p>Email: admin@timelessthreads.com</p>
            <p>Password: admin123</p>
            <p>Password: admin123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
