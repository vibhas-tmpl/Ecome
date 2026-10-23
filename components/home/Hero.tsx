import GoAround from "@/components/home/GoAround";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-search-background md:min-h-175">
      <div className="global-container min-h-175 grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Hero content */}
        <div className="flex w-full flex-col py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-6">
            <h1 className="font-heading text-4xl leading-none sm:text-5xl lg:mr-8 lg:text-7xl">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-sm leading-relaxed text-black/60 sm:text-base lg:mr-8">
              Browse through our diverse range of meticulously crafted
              garments, designed to bring out your individuality and cater
              to your sense of style.
            </p>

            <button className="h-14 w-full rounded-full bg-black px-10 text-white sm:w-fit">
              Shop Now
            </button>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-2 md:mt-4">
              <div className="flex flex-col items-center justify-center border-r border-black/10">
                <p className="text-xl font-bold sm:text-4xl">200+</p>
                <p className="text-center text-xs text-black/60 sm:text-sm">
                  International Brands
                </p>
              </div>

              <div className="flex flex-col items-center justify-center border-r border-black/10">
                <p className="text-xl font-bold sm:text-4xl">2,000+</p>
                <p className="text-center text-xs text-black/60 sm:text-sm">
                  High-Quality Products
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-bold sm:text-4xl">30,000+</p>
                <p className="text-center text-xs text-black/60 sm:text-sm">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Hero image */}
        <div className="relative aspect-[3/3] w-full overflow-hidden sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-auto lg:min-h-150">
          <Image
            src="/hero.jpg"
            alt="Models wearing stylish clothes"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top"
          />

          {/* First star */}
          <Image
            src="/star.png"
            alt=""
            width={100}
            height={100}
            className="absolute right-0 top-[15%] z-10 w-14 sm:w-20 lg:w-25"
          />

          {/* Second star */}
          <Image
            src="/star.png"
            alt=""
            width={65}
            height={65}
            className="absolute left-[4.5%] top-[46%] z-10 w-10 sm:w-14 lg:w-16.25"
          />
        </div>
      </div>
      <GoAround />
    </section>
  );
}
