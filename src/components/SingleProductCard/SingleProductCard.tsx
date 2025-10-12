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

        {product.brand && (
          <p className={styles.infoItem}>
            <strong>Бренд:</strong> {product.brand.name}
          </p>
        )}

        {product.category && (
          <p className={styles.infoItem}>
            <strong>Категорія:</strong> {product.category.name}
          </p>
        )}

        {/* Pretty attributes grid with chips */}
        {Array.isArray(product.attributes) && product.attributes.length > 0 ? (
          <div className={styles.attributes}>
            {product.attributes.map((attr) => {
              const values = (attr.values ?? []).map((v) => v.value).filter(Boolean);
              return (
                <div key={attr.id} className={styles.attribute}>
                  <p><strong>{attr.name}</strong></p>
                  <ul className={styles.attributeValues}>
                    {values.length > 0 ? (
                      values.map((val) => <li key={`${attr.id}-${val}`}>{val}</li>)
                    ) : (
                      <li>—</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <p>
            <strong>Атрибути:</strong> Не вказано
          </p>
        )}

        <p className={styles.infoItem}>
          <strong>Артикул (SKU):</strong> {product.sku}
        </p>

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
