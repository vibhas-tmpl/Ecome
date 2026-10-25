
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SlugPaginationProps = {
  totalProducts: number;
  productsPerPage: number;
};

export default function SlugPagination({
  totalProducts,
  productsPerPage,
}: SlugPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentPage = Math.min(
    Math.max(Number(searchParams.get("page")) || 1, 1),
    Math.max(totalPages, 1)
  );

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}#products`);
  }

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex items-center justify-between border-t border-black/10 pt-5"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => goToPage(page)}
              className={`size-9 rounded-full text-sm font-medium transition ${
                currentPage === page
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </nav>
  );
}
