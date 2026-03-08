import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { CouponProvider } from "@/contexts/CouponContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import CustomOrder from "./pages/CustomOrder";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import OurStory from "./pages/OurStory";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import CareInstructions from "./pages/CareInstructions";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <CouponProvider>
              <FavoritesProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/custom-order" element={<CustomOrder />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/shipping-returns" element={<ShippingReturns />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/care-instructions" element={<CareInstructions />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              </FavoritesProvider>
              </CouponProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
