import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Check } from "lucide-react";

type Review = {
  id: number;
  name: string;
  review: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    review:
      "Finding clothes that are both stylish and personal style used to be a challenge until I discovered Shop.co. The range of options is incredible, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    review:
      "As someone who's always been on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 5,
    name: "Alex K.",
    review:
      "Finding clothes that are both stylish and personal style used to be a challenge until I discovered Shop.co. The range of options is incredible, catering to a variety of tastes and occasions.",
  },
  {
    id: 6,
    name: "Michael B.",
    review:
      "Shop.co has become my favorite place to shop. The clothes are comfortable, stylish, and perfect for everyday wear.",
  },
];

export default function HappyCustomers() {
return (
  <section className="w-full py-12 sm:py-21">
    <div className="global-container">
      {/* Heading */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-heading text-3xl font-bold sm:text-6xl">
          OUR HAPPY CUSTOMERS
        </h2>
      </div>

      {/* Customer reviews carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="basis-[85%] sm:basis-1/2 lg:basis-[32%]">
              <div className="h-64 rounded-2xl border border-gray-200 p-5 shadow-sm">
                {/* Stars */}
                <div className="flex items-center gap-4">
                        <div className="flex text-3xl leading-none tracking-tight text-yellow-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>★</span>
                        ))}
                        </div>
                </div>

                {/* Customer name */}
                <div className="my-4 flex items-center gap-2">
                  <p className="font-bold text-xl">{review.name}</p>
                  <Check
                    size={16}
                    className="rounded-full bg-green-500 p-0.5 text-white"
                  />
                </div>

                {/* Review text */}
                <p className="text-lg leading-6 text-gray-600">
                    “{review.review}”
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel arrows */}
        <div className="absolute right-0 top-[-55px] flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  </section>
);
}