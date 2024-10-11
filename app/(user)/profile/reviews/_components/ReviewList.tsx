"use client";

import ReviewedCard from "@/app/(user)/profile/reviews/_components/ReviewedCard";
import ReviewsFilter from "@/components/ReviewsFilter";
import {useUserReviews} from "@/hooks/reviews/useReviews";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useReviewParams} from "@/hooks/reviews/useReviewParams";

const ReviewList = () => {
    const {reviewParams} = useReviewParams();
    const {
        userReviews,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useUserReviews(reviewParams);

    if (isLoading) return <>Loading...</>
    if (error) return <>Something went wrong</>;

    return (
        <div className="grid grid-cols-1 gap-2">
            <ReviewsFilter />
            {
                !userReviews || userReviews.length === 0 &&
                <div className="w-full flex justify-center mt-5">
                    <h1 className="text-xl text-gray-500">You have no reviews</h1>
                </div>
            }
            {
                userReviews?.length > 0 &&
                    userReviews.map((review, i) => (
                        <ReviewedCard key={i} review={review} />
                    ))
            }
            {
                hasNextPage &&
                    <Button
                        onClick={() => fetchNextPage()}
                        variant="outline"
                        className="border-blue-950 text-blue-950"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? <Loader2 className="w-4 h-4 text-blue-950 animate-spin" /> : null} Show more
                    </Button>
            }
        </div>
    );
};

export default ReviewList;