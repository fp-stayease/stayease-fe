"use client";

import TenantReviewCard from "@/app/dashboard/reviews/_components/TenantReviewCard";
import {useReviewParams} from "@/hooks/reviews/useReviewParams";
import {useTenantReviews} from "@/hooks/reviews/useReviews";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import ReviewsFilter from "@/components/ReviewsFilter";

const TenantReviewList = () => {
    const {reviewParams, handleParamsChange} = useReviewParams();
    const {
        tenantReviews,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useTenantReviews(reviewParams);

    console.log(tenantReviews);

    if (isLoading) return <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-950 animate-spin" />
            <p className="text-blue-950">Loading...</p>
        </div>
    </div>

    if (error) return <>Something went wrong</>;

    return (
        <div className="w-full grid grid-cols-1 gap-3">
            <ReviewsFilter />
            <div className="grid grid-cols-1 gap-2">
                {
                    !tenantReviews || tenantReviews.length === 0 &&
                    <div className="w-full flex justify-center mt-5">
                        <h1 className="text-xl text-gray-500">You have no reviews</h1>
                    </div>
                }
                {
                    tenantReviews?.length > 0 &&
                    tenantReviews.map((review, i) => (
                        <TenantReviewCard key={i} review={review} />
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
        </div>
    );
};

export default TenantReviewList;