"use client";
import React from "react";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import CatalogCard from "@/components/CatalogCard/CatalogCard";
import styles from "./FavoritesPage.module.scss";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

export default function FavoritesClient() {
  const { favorites, clearFavorites } = useFavorites();
  const router = useRouter();

  return (
    <section className="container">
      <div className={styles.favoritesContainer}>
        {favorites.length === 0 ? (
          <p>
            Nothing here yet. <Link href="/catalog">Go to catalog</Link>
          </p>
        ) : (
          <>
            <div className={styles.grid}>
              {favorites.map((product) => (
                <CatalogCard key={product.id} product={product} perRow={2} />
              ))}
            </div>
          </>
        )}
        <div className={styles.buttonsContainer}>
          <Button onClick={clearFavorites}>CLEAR ALL</Button>
          <Button onClick={() => router.push("/catalog")}>TO CATALOG</Button>
        </div>
      </div>
    </section>
  );
}
