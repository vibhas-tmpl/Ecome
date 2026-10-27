
import { TypeProduct } from "@/types/TypeProduct";
import type { TypeCart } from "@/types/TypeCart";

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("API response error:", {
        url,
        status: response.status,
        statusText: response.statusText,
      });

      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API fetch error:", url, error);
    throw error;
  }
}

export function fetchProducts(): Promise<TypeProduct[]> {
  return fetchData<TypeProduct[]>(
    "https://fakestoreapi.com/products"
  );
}

export function fetchProductById(
  id: number
): Promise<TypeProduct> {
  return fetchData<TypeProduct>(
    `https://fakestoreapi.com/products/${id}`
  );
}

export function fetchCarts(): Promise<TypeCart[]> {
  return fetchData<TypeCart[]>(
    "https://fakestoreapi.com/carts"
  );
}
