import Link from "next/link";

type BreadcrumbsProps = {
  slug: string;
  productName: string;
};

export default function BreadCrumb({
  slug,
  productName,
}: BreadcrumbsProps) {
  const category = slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className=" border-t border-black/10 ">
      <nav aria-label="Breadcrumb" className="my-8 ">
        <ol className="flex flex-wrap items-center gap-2 text-md font-satoshi  text-black/60">
          <li>
            <Link href="/">
                <p className="font-satoshi font-medium capitalize ">
                Home
                </p>
            </Link>
            </li>

            <li aria-hidden="true">&gt;</li>

            <li>
            <Link href="/shop">
                <p className="font-satoshi text-md font-medium capitalize ">
                Shop
                </p>
            </Link>
            </li>

            <li aria-hidden="true">&gt;</li>

            <li>
            <Link href={`/shop/${slug}`}>
                <p className="font-satoshi font-medium capitalize ">
                {category}
                </p>
            </Link>
            </li>

            <li aria-hidden="true">&gt;</li>

            <li>
            <p
                className="font-satoshi font-medium capitalize text-black"
                aria-current="page"
            >
                {productName}
            </p>
            </li>
        </ol>
      </nav>
    </div>
  );
}