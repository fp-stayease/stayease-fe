import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const MiniHero = () => {
  const badges = [
    "Professional Team",
    "Always in touch",
    "Verified Rooms",
    "Fast and Secure Booking",
  ];

  return (
    <div className="mini-hero bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="side-picture h-[500px] md:w-1/2 hidden md:block mb-8 md:mb-0">
          <div className="relative w-full h-full">
            <div className="relative w-2/3 h-2/3">
              <Image
                src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726767340/Mask_group_1_wc5ilc.png`}
                alt="Building"
                fill
                sizes="100%"
                className="object-scale-down"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3">
              <Image
                src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726767340/catarina-carvalho-cqMwRNd0i7I-unsplash_aimgbo.png`}
                alt="Door"
                fill
                sizes="100%"
                className="object-scale-down"
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-semibold text-blue-950 mb-4">
            We Help You Find Your Perfect{" "}
            <span className="font-light">Stay</span> with{" "}
            <span className="font-light tracking-wide">Ease</span>
          </h2>
          <p className="text-gray-600 mb-4">
            At StayEase, we&apos;re all about helping you find the ideal room or
            apartment, whether you&apos;re traveling for work, leisure, or just
            need a temporary home. With a wide selection of comfortable and
            affordable options, we&apos;ve made it easier for you to find a
            place to stay, hassle-free.
          </p>
          <p className="text-gray-600 mb-4">
            Our goal is to simplify the search for short-term accommodations,
            offering transparency and trust along the way. No matter your
            destination, we’ve got you covered with a smooth and secure booking
            experience.
          </p>
          <div className="flex flex-wrap gap-4">
            {badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHero;
