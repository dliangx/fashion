// Carousel.tsx
import React, { useState, useRef } from "react";
import { ImageSlide } from "../data/Product";

const Carousel: React.FC<{ images: ImageSlide[]; isListButton: boolean }> = ({
  images,
  isListButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  let dx = 0;
  const slideWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;

  const dragStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      touchStartX.current = e.touches[0].clientX;

      isDragging.current = true;
    }
  };

  const dragMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      dx = e.touches[0].clientX - touchStartX.current;
      if (carouselRef.current != null) {
        carouselRef.current.style.transform = `translateX( ${
          dx - currentIndex * slideWidth
        }px)`;
        carouselRef.current.style.transition = "transform 0.1s";
      }
    }
  };

  const dragEnd = () => {
    if (isDragging.current) {
      const threshold = slideWidth / 4;

      if (Math.abs(dx) > threshold) {
        if (currentIndex + (dx > 0 ? -1 : 1) > images.length - 1) {
          setCurrentIndex(images.length - 1);
        } else if (currentIndex + (dx > 0 ? -1 : 1) < 0) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currentIndex + (dx > 0 ? -1 : 1));
        }
      }
      if (carouselRef.current != null)
        carouselRef.current.style.transform = `translateX(-${
          currentIndex * slideWidth
        }px)`;
      if (carouselRef.current != null)
        carouselRef.current.style.transition = "transform 0.5s  ease-in-out ";
    }
    isDragging.current = false;
  };

  return (
    <div className=" relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        onTouchStart={dragStart}
        onTouchMove={dragMove}
        onTouchEnd={dragEnd}
        className="flex "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((slide, index) => (
          <div
            key={index}
            className="flex-none w-full snap-center"
            onClick={() => {}}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
      {isListButton && (
        <div className=" absolute left-0 bottom-0  w-full flex items-center justify-center space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 mb-4 rounded-full border-3 ${
                index === currentIndex ? " bg-black" : " bg-white"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
