import { createContext, useContext, useState, ReactNode } from "react";

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrderAmount: number;
  validTill: string;
  active: boolean;
  usageLimit: number;
  usedCount: number;
}

interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (data: Omit<Coupon, "id" | "usedCount">) => Coupon;
  updateCoupon: (id: string, data: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  applyCoupon: (code: string, orderTotal: number) => { valid: boolean; discount: number; message: string };
  incrementUsage: (code: string) => void;
}

const CouponContext = createContext<CouponContextType>({} as CouponContextType);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "coupon-1",
      code: "WELCOME10",
      discountPercent: 10,
      maxDiscount: 500,
      minOrderAmount: 500,
      validTill: "2026-12-31",
      active: true,
      usageLimit: 100,
      usedCount: 0,
    },
  ]);

  const addCoupon = (data: Omit<Coupon, "id" | "usedCount">) => {
    const coupon: Coupon = { ...data, id: `coupon-${Date.now()}`, usedCount: 0 };
    setCoupons((prev) => [...prev, coupon]);
    return coupon;
  };

  const updateCoupon = (id: string, data: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const applyCoupon = (code: string, orderTotal: number) => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) return { valid: false, discount: 0, message: "Invalid coupon code." };
    if (!coupon.active) return { valid: false, discount: 0, message: "This coupon is no longer active." };
    if (new Date(coupon.validTill) < new Date()) return { valid: false, discount: 0, message: "This coupon has expired." };
    if (coupon.usedCount >= coupon.usageLimit) return { valid: false, discount: 0, message: "Coupon usage limit reached." };
    if (orderTotal < coupon.minOrderAmount) return { valid: false, discount: 0, message: `Minimum order of ₹${coupon.minOrderAmount} required.` };

    let discount = Math.round((orderTotal * coupon.discountPercent) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
    return { valid: true, discount, message: `${coupon.discountPercent}% off applied! You save ₹${discount}.` };
  };

  const incrementUsage = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code.toUpperCase() === code.toUpperCase() ? { ...c, usedCount: c.usedCount + 1 } : c))
    );
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon, updateCoupon, deleteCoupon, applyCoupon, incrementUsage }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => useContext(CouponContext);
