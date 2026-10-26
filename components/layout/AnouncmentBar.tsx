"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnouncmentBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-black text-white">
      <div className="global-container relative flex min-h-9.5 items-center justify-center px-8 py-2 sm:px-10">
        <div className="flex flex-nowrap items-center justify-center gap-x-1 whitespace-nowrap font-sans text-[10px] leading-tight font-light sm:text-sm">
          <p>Sign up and get 20% off to your first order.</p>

          <a
            href="/signup"
            className="shrink-0 font-medium underline underline-offset-2"
          >
            Sign Up Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 sm:block sm:right-0"
        >
          <X size={20} className="sm:h-6 sm:w-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
