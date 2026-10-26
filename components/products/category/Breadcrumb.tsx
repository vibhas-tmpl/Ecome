import Link from "next/link";

type BreadcrumbProps = {
  items: {
    name: string;
    href: string;
  }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="my-5">
      <ol className="flex flex-wrap items-center gap-2 text-md text-black/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.href}-${index}`}
              className="flex items-center gap-2"
            >
              {isLast ? (
                <p
                  className="font-satoshi font-medium capitalize text-black"
                  aria-current="page"
                >
                  {item.name}
                </p>
              ) : (
                <Link href={item.href} className="capitalize hover:text-black">
                  {item.name}
                </Link>
              )}

              {!isLast && <span>&gt;</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
