"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div style={{ marginBottom: "10px" }}>
              <Link href={`/products/${product.id}`} style={{ marginRight: "10px" }}>
                View
              </Link>
            </div>

            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
