// src/app/products/page.jsx
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

async function getProducts() {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

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
            {/* Product Image */}
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

            {/* Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
