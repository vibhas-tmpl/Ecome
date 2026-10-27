
import { TypeProduct } from "@/types/TypeProduct";
import type { TypeCart } from "@/types/TypeCart";

const API_URL = "https://dummyjson.com";

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

export async function fetchProducts(): Promise<TypeProduct[]> {
  const data = await fetchData<{ products: TypeProduct[] }>(
    `${API_URL}/products?limit=0`
  );

  return data.products;
}

export function fetchProductById(
  id: number
): Promise<TypeProduct> {
  return fetchData<TypeProduct>(`${API_URL}/products/${id}`);
}

export function fetchCarts(): Promise<TypeCart[]> {
  return fetchData<TypeCart[]>(`${API_URL}/carts`);
}
