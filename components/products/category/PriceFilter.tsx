"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Jewelery", slug: "jewelery" },
  { name: "Men's Clothing", slug: "mens-clothing" },
  { name: "Women's Clothing", slug: "womens-clothing" },
];

const colors = [
  "#00C12B",
  "#F50606",
  "#F5DD06",
  "#F57906",
  "#06CAF5",
  "#063AF5",
  "#7D06F5",
  "#F506A4",
  "#FFFFFF",
  "#000000",
];

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

function FilterSection({
  title,
  children,
  showBorder = true,
}: {
  title: string;
  children: ReactNode;
  showBorder?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`mb-6 pb-6 ${showBorder ? "border-b border-black/10" : ""}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-5 flex w-full items-center justify-between"
      >
        <span className="text-lg font-bold">{title}</span>

        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && children}
    </div>
  );
}

export default function PriceFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setPrice] = useState([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const router = useRouter();

  function toggleColor(color: string) {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color],
    );
  }

  function toggleSize(size: string) {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  }

  return (
    <aside className="rounded-2xl border border-black/10 p-5">
      {/* Filters heading */}
      <div className="mb-5 border-b border-black/10 pb-5">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex w-full items-center justify-between"
          aria-expanded={isFilterOpen}
        >
          <h2 className="text-xl font-bold">Filters</h2>

          <SlidersHorizontal
            size={24}
            className={`transition-transform duration-300 ease-in-out ${
              isFilterOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {isFilterOpen && (
        <>
          {/* Categories */}
          <div className="mb-6 border-b border-black/10 pb-6">
            <ul className="flex flex-col gap-4">
              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    type="button"
                    onClick={() => router.push(`/shop/${category.slug}`)}
                    className="flex w-full items-center justify-between text-left text-black/60 transition hover:text-black"
                  >
                    <span>{category.name}</span>
                    <span className="text-lg">›</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <FilterSection title="Price">
            <Slider
              value={price}
              min={0}
              max={500}
              step={10}
              className="mb-5"
            />

            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#F0F0F0] px-4 py-2 text-sm">
                ${price[0]}
              </span>

              <span className="rounded-full bg-[#F0F0F0] px-4 py-2 text-sm">
                ${price[1]}
              </span>
            </div>
          </FilterSection>

          {/* Color */}
          <FilterSection title="Color">
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => {
                const isSelected = selectedColors.includes(color);

                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={color}
                    aria-pressed={isSelected}
                    onClick={() => toggleColor(color)}
                    className={`flex size-8 items-center justify-center rounded-full border border-black/10 ${
                      isSelected ? "ring-2 ring-black ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {isSelected && (
                      <Check
                        size={16}
                        className={
                          color === "#FFFFFF" || color === "#F5DD06"
                            ? "text-black"
                            : "text-white"
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection title="Size">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isSelected = selectedSizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleSize(size)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isSelected
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Apply Filter */}
          <button
            type="button"
            className="w-full rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Apply Filter
          </button>
        </>
      )}
    </aside>
  );
}
