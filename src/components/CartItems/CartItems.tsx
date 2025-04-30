"use client";
import type { CartItem } from "@/types/types";
import { useCart } from "@/context/CartContext";
import HighlightText from "@/components/HighLightText/HighLightText";
import styles from "./CartItems.module.scss";
import Image from "next/image";

const CartItems = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, addToCart } =
    useCart();

  const handleIncreaseQuantity = (item: CartItem) => {
    addToCart(item.product, item.size || "");
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity && item.quantity > 1) {
      updateCartItemQuantity(
        item.product.id,
        item.quantity - 1,
        item.size || ""
      );
    }
  };

  const getItemPrice = (item: CartItem) => {
    if (!item.size || !item.product.sizes) return 0;

    if (Array.isArray(item.product.sizes)) {
      const sizeObj = item.product.sizes.find((s) => s.size === item.size);
      return sizeObj?.price || 0;
    }

    return (item.product.sizes as Record<string, number>)[item.size] || 0;
  };

  return (
    <section className={styles.cartItems}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li
              key={`${item.product.id}-${item.size}`}
              className={styles.cartItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  alt={item.product.name}
                  height={148}
                  src={item.product.photo}
                  width={148}
                />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>
                    {item.product.name}{" "}
                    <button
                      className={styles.removeItem}
                      onClick={() =>
                        removeFromCart(item.product.id, item.size || "")
                      }
                    >
                      X
                    </button>
                  </p>
                </HighlightText>
                <p className={styles.description}>{item.product.description}</p>

                <div className={styles.controlContainer}>
                  {item.size && (
                    <>
                      <p>{item.size}</p>
                      <p className={styles.price}>
                        {(getItemPrice(item) * item.quantity).toLocaleString(
                          "uk-UA",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2
                          }
                        )}{" "}
                        грн
                      </p>
                    </>
                  )}
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      -
                    </button>
                    <p>{item.quantity || 1}</p>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CartItems;
