"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Discount and delivery stay at zero until your rules are implemented.
  const discount = 0;
  const deliveryFee = 0;
  const total = subtotal - discount + deliveryFee;

  function formatPrice(price: number) {
    return `$${price.toFixed(2)}`;
  }

  return (
    <main className="global-container py-8 sm:py-12">
      <h1 className="mb-8 font-heading text-3xl font-extrabold sm:text-4xl">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-3xl border border-black/10 px-5 py-16 text-center">
          <ShoppingBag size={56} strokeWidth={1.5} />

          <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>

          <p className="mt-2 text-gray-500">
            Looks like you havent added anything to your cart yet.
          </p>

          <Link
            href="/"
            className="mt-6 flex items-center gap-2 rounded-full bg-white px-7 py-3 text-black transition hover:bg-black/10"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </section>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="space-y-4 rounded-3xl border border-black/10 p-4 sm:p-6 lg:col-span-2">
            {cartItems.map((item) => (
              <article
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border-b border-black/10 pb-5 last:border-b-0 last:pb-0 sm:gap-6"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${item.id}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F0EEED] sm:h-36 sm:w-32"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-contain p-2"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="line-clamp-2 text-base font-bold sm:text-xl">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Product ID: {item.id}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            id: item.id,
                            size: item.size,
                          }),
                        )
                      }
                      aria-label={`Remove ${item.name} from cart`}
                      className="shrink-0 rounded-full p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <p className="text-lg font-bold sm:text-xl">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex h-10 items-center gap-4 rounded-full bg-[#F0F0F0] px-3">
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        aria-label="Decrease quantity"
                        className="disabled:opacity-30"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="min-w-4 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Order Summary */}
          <aside className="rounded-3xl border border-black/10 p-5 sm:p-6">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold text-red-500">
                  -{formatPrice(discount)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-semibold">
                  {formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-xl font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <form
              className="mt-6 flex gap-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="promo-code" className="sr-only">
                Promo code
              </label>

              <input
                id="promo-code"
                type="text"
                placeholder="Add promo code"
                className="min-w-0 flex-1 rounded-full bg-[#F0F0F0] px-4 py-3 text-sm outline-none focus:outline-none"
              />

              <button
                type="submit"
                className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Apply
              </button>
            </form>

            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => {
                alert("Checkout will be implemented next.");
              }}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 font-medium text-white transition hover:bg-black/80 disabled:opacity-50"
            >
              Go to Checkout
              <ArrowRight size={18} />
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
