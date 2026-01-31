// src/app/api/cart/route.js
import { NextResponse } from "next/server";

// In-memory cart (resets on server restart or cold start)
let cart = [];

/**
 * GET /api/cart
 * Returns all items in the cart
 */
export async function GET() {
  return NextResponse.json(cart);
}

/**
 * POST /api/cart
 * Adds a product to the cart, or updates quantity if already exists
 * Body: { id, name, price, quantity }
 */
export async function POST(req) {
  try {
    const { id, name, price, quantity } = await req.json();

    if (!id || !name || !price || !quantity) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id, name, price, quantity });
    }

    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json({ message: "Failed to add to cart" }, { status: 500 });
  }
}

/**
 * DELETE /api/cart
 * Removes a product from the cart
 * Body: { id }
 */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    cart = cart.filter(item => item.id !== id);

    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json({ message: "Failed to remove item" }, { status: 500 });
  }
}

/**
 * PUT /api/cart
 * Clears the entire cart
 */
export async function PUT() {
  cart = [];
  return NextResponse.json({ message: "Cart cleared" });
}
