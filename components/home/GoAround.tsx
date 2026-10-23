import Image from "next/image";

const logos = [
  { src: "/Versace.png", alt: "Versace" },
  { src: "/Zara.png", alt: "Zara" },
  { src: "/Gucci.png", alt: "Gucci" },
  { src: "/Parada.png", alt: "Prada" },
  { src: "/Ck.png", alt: "Calvin Klein" },
];

export default function GoAround() {
  return (
    <section className="w-full overflow-hidden bg-black py-8">
      <div className="logo-track">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="logo-group flex shrink-0 items-center"
            aria-hidden={set === 1}
          >
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="mx-8 flex w-32 shrink-0 items-center justify-center sm:mx-12 sm:w-40"
              >
                <Image
                  src={logo.src}
                  alt={set === 0 ? logo.alt : ""}
                  width={160}
                  height={60}
                  className="h-auto max-h-10 w-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
