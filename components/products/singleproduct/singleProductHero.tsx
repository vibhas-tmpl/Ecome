
"use client";

import { useState } from "react";
import Image from "next/image";
import type { products } from "@/data/products";

type Product = (typeof products)[number];

type SingleProductHeroProps = {
  product: Product;
  slug: string;
};

const colors = [
  { name: "Olive", value: "#4F4631" },
  { name: "Dark Green", value: "#314F4A" },
  { name: "Navy Blue", value: "#31344F" },
];

const sizes = ["Small", "Medium", "Large", "X-Large"] as const;

export default function SingleProductHero({
  product,
  slug,
}: SingleProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] = useState<
    (typeof sizes)[number] | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    if (!selectedSize) {
      setMessage("Please select a size first.");
      return;
    }

    setMessage(
      `${product.name} (${selectedSize}, ${selectedColor}) × ${quantity} added!`
    );
  }

  return (
    <div className="global-container">
      <section className="grid grid-cols-1 gap-8  md:grid-cols-2 md:gap-10">
        {/* Product Gallery */}
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[163px_1fr]">
          {/* Thumbnails */}
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
            {[product.image, product.image, product.image].map(
              (image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-[#F0EEED] sm:w-full ${
                    selectedImage === image && index === 0
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    sizes="163px"
                    className="object-contain p-2"
                  />
                </button>
              )
            )}
          </div>

          {/* Main Image */}
          <div className="relative order-1 min-h-[450px] overflow-hidden rounded-2xl bg-[#F0EEED] sm:order-2 sm:min-h-0">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 40vw"
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold uppercase md:text-5xl">
            {product.name}
          </h1>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center text-3xl leading-none tracking-tight text-yellow-500"
              aria-label={`${product.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const fill =
                  product.rating >= index + 1
                    ? "★"
                    : product.rating >= index + 0.5
                      ? "⯪"
                      : "☆";

                return (
                  <span key={index} className="block leading-none">
                    {fill}
                  </span>
                );
              })}
            </div>

            <span className="text-sm text-gray-600">
              {product.rating}/5
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            {product.discount !== undefined && (
              <span className="text-3xl font-bold">
                ${Math.round(product.price * (1 - product.discount / 100))}
              </span>
            )}

            <span
              className={`text-3xl font-bold ${
                product.discount !== undefined
                  ? "text-gray-400 line-through"
                  : "text-black"
              }`}
            >
              ${product.price}
            </span>

            {product.discount !== undefined && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Product Description */}
          <p className="border-b border-black/10 pb-5 text-lg leading-6 text-gray-600">
            {product.description}
          </p>

          {/* Select Color */}
          <div className="border-b border-black/10 pb-5">
            <p className="mb-4 text-base text-gray-600">Select Color</p>

            <div className="flex items-center gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color.name);
                    setMessage("");
                  }}
                  aria-label={color.name}
                  aria-pressed={selectedColor === color.name}
                  title={color.name}
                  className={`flex size-10 items-center justify-center rounded-full ${
                    selectedColor === color.name
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.name && (
                    <span className="text-white">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Size */}
          <div className="border-b border-black/10 pb-5">
            <p className="mb-4 text-base text-gray-600">Choose Size</p>

            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setMessage("");
                  }}
                  aria-pressed={selectedSize === size}
                  className={`rounded-full px-5 py-3 text-sm text-gray-600 transition ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="w-full">
            <div className="flex w-full items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex h-15 w-[30%] items-center justify-between rounded-full bg-[#F0F0F0] px-4">
                <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                    className="text-2xl leading-none disabled:opacity-30"
                    >
                    −
                </button>

                <span className="text-center font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-2xl leading-none disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* Add to Cart — fills remaining width */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-15 min-w-0 flex-1 rounded-full bg-black px-4 font-medium text-white transition hover:bg-black/80"
              >
                Add to Cart
              </button>
            </div>

            {message && (
              <p
                role="status"
                className={`mt-3 text-sm ${
                  message.startsWith("Please")
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
