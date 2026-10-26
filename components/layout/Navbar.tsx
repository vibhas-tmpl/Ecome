
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

type Category = {
  id: number;
  name: string;
  slug: string;
};

const categories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Jewelery", slug: "jewelery" },
  { id: 3, name: "Men's Clothing", slug: "mens-clothing" },
  { id: 4, name: "Women's Clothing", slug: "womens-clothing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="w-full bg-white">
      {/* Main navbar */}
      <div className="global-container flex min-h-20 items-center justify-between gap-3 py-4 lg:min-h-26 lg:gap-4">
        {/* Hamburger + Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="shrink-0 md:hidden"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

          <Link href="/" className="shrink-0">
            <Image
              src="/SHOP.CO.png"
              alt="SHOP.CO logo"
              width={170}
              height={40}
              priority
              className="w-28 sm:w-36 lg:w-[170px]"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden shrink-0 lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            <li
              className="group relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => setIsShopOpen(false)}
            >
              <button
                type="button"
                aria-expanded={isShopOpen}
                onClick={() => setIsShopOpen(!isShopOpen)}
                className="flex items-center gap-1"
              >
                Shop
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isShopOpen && (
                <div className="absolute left-0 top-full z-50 w-44 rounded-xl bg-white py-2 shadow-lg">
                  <Link
                    href="/#new-arrivals"
                    onClick={() => setIsShopOpen(false)}
                    className="block px-4 py-3 text-sm font-medium hover:bg-gray-100"
                  >
                    All Products
                  </Link>

                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop/${category.slug}`}
                      onClick={() => setIsShopOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/sale">On Sale</Link>
            </li>
            <li>
              <Link href="/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
          </ul>
        </nav>

        {/* Desktop search */}
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3 md:mx-2 md:flex lg:mx-4">
          <Search size={22} className="shrink-0 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            aria-label="Search for products"
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Cart + Account */}
        <div className="mr-[10px] flex shrink-0 items-center gap-3 sm:gap-4 md:mr-0">
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${totalItems} items`}
            className="relative"
          >
            <ShoppingCart size={23} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-medium text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/login" aria-label="User account">
            <UserRound size={23} />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="font-medium"
              >
                Shop — All Products
              </Link>

              <ul className="mt-3 ml-4 flex flex-col gap-4 border-l border-gray-200 pl-4">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/shop/${category.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link href="/sale" onClick={() => setIsMenuOpen(false)}>
                On Sale
              </Link>
            </li>

            <li>
              <Link
                href="/new-arrivals"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
            </li>

            <li>
              <Link href="/brands" onClick={() => setIsMenuOpen(false)}>
                Brands
              </Link>
            </li>
          </ul>

          {/* Mobile search */}
          <div className="mt-5 flex items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3">
            <Search size={22} className="shrink-0 text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              aria-label="Search for products"
              className="w-full min-w-0 bg-transparent text-sm outline-none"
            />
          </div>
        </nav>
      )}
    </header>
  );
}
