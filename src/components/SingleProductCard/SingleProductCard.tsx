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

        {product.attributes?.length ? (
          <div className={styles.specs}>
            {product.attributes.map((attr) => {
              const valueText = (attr.values ?? []).map((v) => v.value).join(", ");
              return (
                <div key={attr.id} className={styles.specRow}>
                  <span className={styles.specName}>{attr.name}</span>
                  <span className={styles.specDots} aria-hidden="true" />
                  <span className={styles.specValue}>{valueText || "—"}</span>
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
