import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import NewsletterBanner from "./NewsLetterBanner";

const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Works", href: "/works" },
      { label: "Career", href: "/career" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "/account" },
      { label: "Manage Deliveries", href: "/deliveries" },
      { label: "Orders", href: "/orders" },
      { label: "Payments", href: "/payments" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Free eBooks", href: "/ebooks" },
      { label: "Development Tutorial", href: "/tutorials" },
      { label: "How to - Blog", href: "/blog" },
      { label: "YouTube Playlist", href: "/youtube" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative min-h-[500px] mt-16 bg-search-background">
      {/* Newsletter banner: overlaps the top of the footer */}
        <div className="relative z-10 -translate-y-1/3 sm:-translate-y-1/2">
        <NewsletterBanner />
        </div>

      {/* Footer content */}
      <div className="global-container mb-10 -mt-16 pb-12 pt-8 sm:-mt-20 sm:pt-10 ">
        <div className="grid grid-cols-2 gap-8 border-b border-black/10 pb-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mr-8">
            <Link
              href="/"
              className="font-heading text-5xl font-bold tracking-tight"
            >
              SHOP.CO
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-black/60">
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://x.com"
                aria-label="X"
                className="flex size-9 items-center justify-center rounded-full border border-black/20 bg-white transition hover:bg-black hover:text-white"
              >
                <FaXTwitter size={17} />
              </Link>

              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-black/20 bg-white transition hover:bg-black hover:text-white"
              >
                <FaFacebookF size={17} />
              </Link>

              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-black/20 bg-white transition hover:bg-black hover:text-white"
              >
                <FaInstagram size={17} />
              </Link>

              <Link
                href="https://github.com"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-full border border-black/20 bg-white transition hover:bg-black hover:text-white"
              >
                <FaGithub size={17} />
              </Link>
            </div>
          </div>

          {/* Footer link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <p className="mb-4 text-xm font-semibold leading-5 tracking-[0.3em]">
                {group.title}
              </p>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="  transition hover:text-black"
                    >  <p className="text-xm text-black/60"> {link.label}</p>
                      
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and payment methods */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-black/60">
            Shop.co © 2000–2026, All Rights Reserved
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold italic">
              VISA
            </span>

            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              Mastercard
            </span>

            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold italic">
              PayPal
            </span>

            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              Apple Pay
            </span>

            <span className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-bold">
              G Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}