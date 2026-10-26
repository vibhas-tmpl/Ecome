import { TypeProduct } from "@/types/TypeProduct";
import type { TypeCart } from "@/types/TypeCart";

export async function fetchProducts(): Promise<TypeProduct[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: TypeProduct[] = await response.json();
  return data;
}

export async function fetchProductById(id: number): Promise<TypeProduct> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: TypeProduct = await response.json();
  return data;
}

export async function fetchCarts(): Promise<TypeCart[]> {
  const response = await fetch("https://fakestoreapi.com/carts");

  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  return response.json();
}
