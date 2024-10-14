"use client";
import * as React from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselPluginProps {
  className?: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export function CarouselPlugin({ className, images }: CarouselPluginProps) {
  const plugin = useRef(Autoplay({ delay: 3000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className={`carousel relative w-full h-full ${className}`}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full w-full p-1">
            <div className="h-full w-full">
              <Image
                src={image.src}
                alt={`Slide ${index + 1} - ${image.alt}`}
                width={480}
                height={480}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
