// src/app/api/products/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Apple", price: 120, image: "/images/apple.webp" },
    { id: 2, name: "Banana", price: 60, image: "/images/banana.webp" },
    { id: 3, name: "Orange", price: 80, image: "/images/orange.webp" },
  ];

  return NextResponse.json(products);
}
