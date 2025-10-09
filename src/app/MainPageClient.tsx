"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import dynamic from "next/dynamic";
import type { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import styles from "./page.module.scss";
import AboutSection from "@/components/AboutSection/AboutSection";
import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";

const ProductCard = dynamic(
  () => import("@/components/ProductCard3/ProductCard"),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading products...</div>
  }
);

export const MainPageClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div className={classNames("container", styles.product_container)}>
        <h1>TRENDING NOW</h1>
        {" "}
        {!loading && products.length > 0 && (
          <ProductCard products={products} showButton={true} />
        )}
      </div>

      <AboutSection />

      <FeedbackSection />
    </>
  );
};
