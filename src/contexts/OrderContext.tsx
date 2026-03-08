import { createContext, useContext, useState, ReactNode } from "react";
import { Order, CustomOrder } from "@/types";

interface OrderContextType {
  orders: Order[];
  customOrders: CustomOrder[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addCustomOrder: (order: Omit<CustomOrder, "id" | "createdAt">) => CustomOrder;
  updateCustomOrderStatus: (id: string, status: CustomOrder["status"]) => void;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);

  const addOrder = (order: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const addCustomOrder = (order: Omit<CustomOrder, "id" | "createdAt">) => {
    const newOrder: CustomOrder = {
      ...order,
      id: `CUST-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCustomOrders((prev) => [newOrder, ...prev]);
  };

  const updateCustomOrderStatus = (id: string, status: CustomOrder["status"]) => {
    setCustomOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const getUserOrders = (userId: string) => orders.filter((o) => o.userId === userId);

  return (
    <OrderContext.Provider
      value={{ orders, customOrders, addOrder, updateOrderStatus, addCustomOrder, updateCustomOrderStatus, getUserOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
