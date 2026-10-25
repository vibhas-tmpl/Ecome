"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";

const tabs = ["Product Details", "Rating & Reviews", "FAQs"] as const;

type Tab = (typeof tabs)[number];

type Review = {
  id: number;
  name: string;
  review: string;
  rating: number;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. Every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    review:
      "Finding clothes that are both stylish and personal used to be a challenge. Shop.co has an incredible range of options.",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    review:
      "As someone who loves unique fashion pieces, I'm thrilled with the selection. The styles are diverse and on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Michael B.",
    rating: 4,
    review:
      "Shop.co has become my favorite place to shop. The clothes are comfortable, stylish, and perfect for everyday wear.",
  },
  {
    id: 5,
    name: "Emily R.",
    rating: 5,
    review:
      "Great quality for the price. The fit is comfortable, and the designs are exactly what I was looking for.",
  },
  {
    id: 6,
    name: "Daniel W.",
    rating: 4,
    review:
      "A smooth shopping experience with plenty of stylish options. I'll definitely be ordering again.",
  },
  {
    id: 7,
    name: "Olivia T.",
    rating: 5,
    review:
      "The material feels great, and the fit is exactly what I wanted. I'm really happy with my purchase.",
  },
  {
    id: 8,
    name: "Ryan C.",
    rating: 4,
    review:
      "Really nice design and comfortable to wear. The quality is good for the price, and delivery was smooth.",
  },
  {
    id: 9,
    name: "Sophia L.",
    rating: 5,
    review:
      "I love how easy it was to find something that matches my style. I'll definitely shop here again.",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Rating & Reviews");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 6);

  return (
    <section className="global-container mt-12">
      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-black/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative py-3 text-2xl font-medium transition ${
              activeTab === tab
                ? "text-black"
                : "text-black/60 hover:text-black"
            }`}
          >
            <p className="text-sm md:text-2xl">{tab}</p>

            {activeTab === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {/* Product Details */}
        {activeTab === "Product Details" && (
          <div>
            <p className="mb-3 text-2xl font-bold">Product Details</p>
            <p className="leading-7 text-black/60">
              Explore the design, comfort, and style of this product. Choose
              your preferred size and color before adding it to your cart.
            </p>
          </div>
        )}

        {/* Rating & Reviews */}
        {activeTab === "Rating & Reviews" && (
          <div>
            {/* Reviews Heading */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold sm:text-2xl">
                All Reviews
                <span className="ml-2 text-sm font-normal text-black/60">
                  ({reviews.length})
                </span>
              </h2>

              <button
                type="button"
                className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Write a Review
              </button>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-gray-200 p-5 shadow-sm sm:p-6"
                >
                  {/* Stars */}
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={22}
                        className={
                          index < review.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Customer Name */}
                  <div className="my-4 flex items-center gap-2">
                    <p className="text-lg font-bold">{review.name}</p>
                    <Check
                      size={17}
                      className="rounded-full bg-green-500 p-0.5 text-white"
                    />
                  </div>

                  {/* Review Text */}
                  <p className="text-base leading-6 text-gray-600">
                    “{review.review}”
                  </p>
                </article>
              ))}
            </div>

            {/* Load More / Show Less */}
            <button
              type="button"
              onClick={() => setShowAllReviews((prev) => !prev)}
              className="mx-auto mt-8 block rounded-full border border-black/10 px-8 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              {showAllReviews ? "Show Less" : "Load More Reviews"}
            </button>
          </div>
        )}

        {/* FAQs */}
        {activeTab === "FAQs" && (
          <div>
            <h2 className="mb-3 text-xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="leading-7 text-black/60">
              Find answers to common questions about sizing, delivery, and
              returns.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}