"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items
  async function fetchCart() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  }

  // Remove single item
  async function removeItem(id) {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  }

  // Clear entire cart
  async function clearCart() {
    try {
      await fetch("/api/cart", { method: "PUT" });
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Failed to clear cart");
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={{ background: "red", color: "#fff", padding: "5px 10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <button
            onClick={clearCart}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
