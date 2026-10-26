
"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { addToCart } from "@/lib/cartSlice";
import type { TypeProduct } from "@/types/TypeProduct";

type SingleProductHeroProps = {
  product: TypeProduct;
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
}: SingleProductHeroProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] =
    useState<(typeof sizes)[number] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    if (!selectedSize) {
      setMessage("Please select a size first.");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity,
      })
    );

    setMessage(
      `${product.title} (${selectedSize}, ${selectedColor}) × ${quantity} added!`
    );
  }

  return (
    <section className="global-container py-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {/* Product Gallery */}
        <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
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
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    sizes="163px"
                    className="object-contain p-2"
                  />
                </button>
              )
            )}
          </div>

          {/* Main Image */}
          <div className="relative order-1 min-h-[450px] overflow-hidden rounded-2xl bg-[#F0EEED] sm:order-2">
            <Image
              src={selectedImage}
              alt={product.title}
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
            {product.title}
          </h1>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div
              className="flex text-3xl leading-none tracking-tight text-yellow-500"
              aria-label={`${product.rating.rate} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const star =
                  product.rating.rate >= index + 1
                    ? "★"
                    : product.rating.rate >= index + 0.5
                      ? "⯪"
                      : "☆";

                return <span key={index}>{star}</span>;
              })}
            </div>

            <span className="text-sm text-gray-600">
              {product.rating.rate}/5 ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Product Description */}
          <p className="border-b border-black/10 pb-5 text-lg leading-6 text-gray-600">
            {product.description}
          </p>

          {/* Product Category */}
          <p className="text-sm capitalize text-gray-500">
            Category: {product.category}
          </p>

          {/* Color Selection */}
          <div className="border-b border-black/10 pb-5">
            <p className="mb-4 text-base text-gray-600">
              Select Color
            </p>

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

          {/* Size Selection */}
          <div className="border-b border-black/10 pb-5">
            <p className="mb-4 text-base text-gray-600">
              Choose Size
            </p>

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
                  className={`rounded-full px-5 py-3 text-sm transition ${
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
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
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
                  className="text-2xl leading-none"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
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
      </div>
    </section>
  );
}
