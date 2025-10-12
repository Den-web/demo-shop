"use client";

import React, { useState } from "react";
import type { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./SingleProductCard.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import useDeviceDetection from "@/context/useDeviceDetection";

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const [addedImpact, setAddedImpact] = useState(false);
  const { addToCart } = useCartContext();
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => (isMobile ? "s" : isTablet ? "m" : "xxl");

  const handleAddToCart = () => {
    addToCart(product);
    setAddedImpact(true);
    setTimeout(() => setAddedImpact(false), 1000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.mainImage && (
          <div className={styles.imageWrapper}>
            {product.mainImage && (
              <Image
                alt={product.name}
                className={styles.productImage}
                height={500}
                width={500}
                quality={80}
                src={product.mainImage}
              />
            )}
          </div>
        )}

        {product.status === "new" && (
          <span className={styles.badgeNew}>NEW</span>
        )}
        {!product.stock && (
          <span className={styles.badgeOutOfStock}>Немає в наявності</span>
        )}
      </div>

      <div className={styles.infoContainer}>
        <h1 className={styles.productName}>{product.name}</h1>

        {/* Основні параметри показуємо в таблиці нижче, без дублювання тут */}

        {/* Specs table like a product sheet */}
        <div className={styles.specTable}>
          <h3 className={styles.specTitle}>Основна інформація</h3>
          <div className={styles.specRow}>
            <span className={styles.specName}>Бренд</span>
            <span className={styles.specValue}>{product.brand?.name ?? "—"}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Категорія</span>
            <span className={styles.specValue}>{product.category?.name ?? "—"}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Артикул (SKU)</span>
            <span className={styles.specValue}>{product.sku ?? "—"}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Наявність</span>
            <span className={styles.specValue}>
              <span
                className={`${styles.valuePill} ${product.stock ? styles.inStock : styles.outOfStock}`}
              >
                {product.stock ? "В наявності" : "Немає"}
              </span>
            </span>
          </div>

          {Array.isArray(product.attributes) && product.attributes.length > 0 && (
            <>
              <h3 className={styles.specTitle} style={{ marginTop: 16 }}>Додаткова інформація</h3>
              {product.attributes.map((attr) => {
                const label = attr.name;
                const values = (attr.values ?? []).map((v) => v.value).filter(Boolean);
                const isColor = label.toLowerCase().includes("колір") || label.toLowerCase().includes("color");
                return (
                  <div className={styles.specRow} key={attr.id}>
                    <span className={styles.specName}>{label}</span>
                    <span className={styles.specValue}>
                      {isColor ? (
                        <ul className={styles.attributeValues}>
                          {values.length > 0 ? (
                            values.map((val) => (
                              <li key={`${attr.id}-${val}`}>{val}</li>
                            ))
                          ) : (
                            <li>—</li>
                          )}
                        </ul>
                      ) : (
                        <>{values.join(", ") || "—"}</>
                      )}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* SKU теж входить до таблиці нижче */}

        {product.description && (
          <p className={styles.infoItem}>
            <strong>Опис:</strong> {product.description}
          </p>
        )}

        {/* Good-to-know bullets to reinforce brand vibe */}
        <ul className={styles.goodToKnow}>
          <li>Hand‑poured in small batches</li>
          <li>Balanced fragrance — cozy, elegant, long‑lasting</li>
          <li>Natural wax blend • clean burn</li>
        </ul>

        <div className={styles.priceWrapper}>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className={styles.comparePrice}>${product.comparePrice}</span>
          )}
          <span className={styles.price}>${product.price}</span>
        </div>

        <Button
          size={getButtonSize()}
          onClick={handleAddToCart}
          className={addedImpact ? styles.added : ""}
          disabled={!product.stock || addedImpact}
        >
          {!product.stock ? "Out of stock" : addedImpact ? "Added!" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
};

export default SingleProductCard;
