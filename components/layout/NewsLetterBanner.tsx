"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here later.
    console.log("Newsletter email:", email);
    setEmail("");
  }

  return (
    <section className="relative z-10 -mb-16 w-full">
      <div className="global-container">
        <div className="grid w-full gap-5 rounded-3xl bg-black px-6 py-5 text-white sm:px-8 sm:py-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-14 lg:py-9">
          {/* Heading */}
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          {/* Newsletter form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Enter your email 
            </label>

            <div className="mx-auto flex w-full items-center gap-3 rounded-full bg-white px-4 py-3.5 text-gray-400 sm:ml-auto sm:mr-0 sm:w-[65%]">
              <Mail size={20} className="shrink-0 text-gray-500" />

              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full min-w-0 bg-transparent text-sm outline-none focus:outline-none focus:ring-0 focus:border-none placeholder:text-gray-500"
              />
            </div>

            <button 

              type="submit"
              className="mx-auto flex w-full items-center justify-center gap-3 rounded-full bg-white px-4 py-3.5 text-lg text-black hover:bg-gray-400 sm:ml-auto sm:mr-0 sm:w-[65%]"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
