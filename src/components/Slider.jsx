import { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/seed/fashion-store1/1200/400",
  "https://picsum.photos/seed/tech-sale2/1200/400",
  "https://picsum.photos/seed/new-arrivals3/1200/400",
  "https://picsum.photos/seed/shop-banner4/1200/400",
  "https://picsum.photos/seed/accessories5/1200/400",
  "https://picsum.photos/seed/gadgets6/1200/400",
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = (i) => {
    setFade(false);
    setTimeout(() => {
      setIndex(i);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((index + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="w-full relative overflow-hidden">
      <img
        src={images[index]}
        alt={`Слайд ${index + 1}`}
        className={`w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
