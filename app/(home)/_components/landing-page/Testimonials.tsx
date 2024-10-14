"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fillerTestimonials } from "@/constants/FillerData";
import {useAllReviews} from "@/hooks/reviews/useAllReviews";
import ListLoading from "@/components/ListLoading";
import NoResultsFound from "@/components/NoResultsFound";

const Testimonials = () => {
  const {reviews, isLoading, error} = useAllReviews();

  if (isLoading) return <ListLoading />
  if (error) return <>Something went wrong. Please try again</>
  if (!reviews || reviews.length === 0) return <NoResultsFound />;

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-8 text-center">
          That&apos;s What Our Clients Say
        </h2>
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <CarouselContent>
            {reviews?.map((review, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage
                        src={review.user.avatar}
                        alt={review.user.firstName}
                      />
                      <AvatarFallback>{review.user.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-2">
                      {review.user.firstName} {review.user?.lastName}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
