import { NextResponse } from "next/server";

const products = [
  { id: 1, name: "Apple", price: 120 },
  { id: 2, name: "Banana", price: 60 },
  { id: 3, name: "Orange", price: 80 },
];

export async function GET(req, context) {
  const { id } = await context.params; // ✅ THIS IS THE FIX

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
