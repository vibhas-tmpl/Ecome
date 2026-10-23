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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      {/* Main navbar */}
      <div className="global-container flex min-h-20 items-center justify-between gap-3 py-4 lg:min-h-26 lg:gap-4">

        {/* Left side: Hamburger + Logo */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Toggle navigation menu"
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
            <li>
              <Link href="/shop" className="flex items-center gap-1">
                Shop
                <ChevronDown size={16} />
              </Link>
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

        {/* Desktop search bar */}
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3 md:mx-2 md:flex lg:mx-4">
          <Search size={22} className="shrink-0 text-gray-500" />

          <input
            type="text"
            placeholder="Search for products..."
            className="w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Right side: Cart + Account */}
        <div className="mr-[10px] flex shrink-0 items-center gap-3 sm:gap-4 md:mr-0">
          <Link href="/cart" aria-label="Shopping cart">
            <ShoppingCart size={23} />
          </Link>

          <Link href="/login" aria-label="User account">
            <UserRound size={23} />
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <nav className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
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

          {/* Mobile search bar */}
          <div className="mt-5 flex items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3">
            <Search size={22} className="shrink-0 text-gray-500" />

            <input
              type="text"
              placeholder="Search for products..."
              className="w-full min-w-0 bg-transparent text-sm outline-none"
            />
          </div>
        </nav>
      )}
    </header>
  );
}
