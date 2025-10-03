"use client";
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { Product } from "@/types/types";

type FavoritesContextValue = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string | number) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("favorites");
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch (error) {
        // Fallback if parsing fails
        console.warn("Failed to parse favorites from localStorage:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isHydrated) return; // avoid overwriting saved data on first mount
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, isHydrated]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const isFavorite = useCallback((productId: string | number) => favorites.some((p) => p.id === productId), [favorites]);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo(() => ({ favorites, toggleFavorite, isFavorite, clearFavorites }), [favorites, toggleFavorite, isFavorite, clearFavorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};


