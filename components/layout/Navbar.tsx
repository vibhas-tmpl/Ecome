
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
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Category = {
  id: number;
  name: string;
  slug: string;
};

const categories: Category[] = [
  { id: 1, name: "Smartphones", slug: "smartphones" },
  { id: 2, name: "Laptops", slug: "laptops" },
  { id: 3, name: "Men's Shirts", slug: "mens-shirts" },
  { id: 4, name: "Men's Shoes", slug: "mens-shoes" },
  { id: 5, name: "Women's Dresses", slug: "womens-dresses" },
  { id: 6, name: "Women's Shoes", slug: "womens-shoes" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const totalItems = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    let isMounted = true;

    async function getInitialUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (error) {
        setUser(null);
        return;
      }

      setUser(data.user);
    }

    getInitialUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    setIsLoggingOut(false);

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  function closeMobileMenu() {
    setIsMenuOpen(false);
  }

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

          {user ? (
            <div className="group relative">
              <button
                type="button"
                aria-label="Account options"
                className="flex items-center gap-1"
              >
                <UserRound size={23} />
                <ChevronDown size={14} className="hidden sm:block" />
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-52 rounded-xl bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <p className="truncate px-4 py-3 text-xs text-gray-500">
                  {user.email}
                </p>

                {/* My Account link */}
                <Link
                  href="/account"
                  className="block px-4 py-3 text-sm hover:bg-gray-100"
                >
                  My Account
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-gray-100 disabled:opacity-60"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" aria-label="Log in to your account">
              <UserRound size={23} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="border-t border-gray-200 bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <Link
                href="/shop"
                onClick={closeMobileMenu}
                className="font-medium"
              >
                Shop — All Products
              </Link>

              <ul className="mt-3 ml-4 flex flex-col gap-4 border-l border-gray-200 pl-4">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/shop/${category.slug}`}
                      onClick={closeMobileMenu}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link href="/sale" onClick={closeMobileMenu}>
                On Sale
              </Link>
            </li>

            <li>
              <Link href="/new-arrivals" onClick={closeMobileMenu}>
                New Arrivals
              </Link>
            </li>

            <li>
              <Link href="/brands" onClick={closeMobileMenu}>
                Brands
              </Link>
            </li>

            <li className="border-t border-gray-200 pt-4">
              {user ? (
                <div className="space-y-4">
                  <p className="break-all text-sm text-gray-500">
                    Signed in as {user.email}
                  </p>

                  {/* My Account link */}
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="block font-medium"
                  >
                    My Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 font-medium disabled:opacity-60"
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              ) : (
                <div className="flex gap-5">
                  <Link href="/login" onClick={closeMobileMenu}>
                    Log In
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </div>
              )}
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
