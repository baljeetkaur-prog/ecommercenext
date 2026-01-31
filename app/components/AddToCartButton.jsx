"use client";

import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);

  async function addToCart() {
    setLoading(true);
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
      alert(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={addToCart} disabled={loading} style={{ marginTop: "10px" }}>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
