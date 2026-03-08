import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  favCount: number;
}

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("tt_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const persist = (items: Product[]) => {
    setFavorites(items);
    localStorage.setItem("tt_favorites", JSON.stringify(items));
  };

  const addFavorite = (product: Product) => {
    if (!favorites.find((f) => f.id === product.id)) {
      persist([...favorites, product]);
    }
  };

  const removeFavorite = (productId: string) => {
    persist(favorites.filter((f) => f.id !== productId));
  };

  const isFavorite = (productId: string) => favorites.some((f) => f.id === productId);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, favCount: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
