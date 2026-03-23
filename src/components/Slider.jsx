import { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/1200/400?1",
  "https://picsum.photos/1200/400?2",
  "https://picsum.photos/1200/400?3",
  "https://picsum.photos/1200/400?4",
  "https://picsum.photos/1200/400?5",
  "https://picsum.photos/1200/400?6",
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-auto overflow-hidden relative mt-2  mx-auto sm:mt-6">
      <img
        src={images[index]}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
