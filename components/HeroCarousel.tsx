"use client";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const images = [
  { url: "/assets/images/hero1.jpg", alt: "smartwatch" },
  { url: "/assets/images/hero2.png", alt: "bag" },
  { url: "/assets/images/hero3.webp", alt: "lamp" },
  { url: "/assets/images/hero4.png", alt: "air fryer" },
  { url: "/assets/images/hero5.webp", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {images.map((image) => (
          <Image
            key={image.alt}
            src={image.url}
            width={200}
            height={200}
            alt={image.alt}
            className="object-contain"
          />
        ))}
      </Carousel>

    </div>
  );
};

export default HeroCarousel;
