"use client";

import PropertyReviewCard from "@/app/(home)/properties/[propertyId]/_components/PropertyReviewCard";
import {usePropertyReviews} from "@/hooks/reviews/useReviews";
import {FC} from "react";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ReviewTabsContentProps {
    propertyId: number;
}

const ReviewTabsContent: FC<ReviewTabsContentProps> = ({propertyId}) => {
    const {
        propertyReviews,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = usePropertyReviews(propertyId);

    if (isLoading) return <div className="w-full flex items-center gap-2">
        <Loader2 className="w-4 h-4 text-blue-950 animate-spin" />
        <p>Loading...</p>
    </div>

    if (error) return <>Something went wrong</>

    return (
        <div className="w-full grid grid-cols-1 mt-2">
            <div className="grid grid-cols-1 gap-2">
                {
                    !propertyReviews || propertyReviews.length === 0 &&
                    <div className="text-gray-500">
                        No reviews
                    </div>
                }
                {
                    propertyReviews && propertyReviews.length > 0 &&
                    propertyReviews.map((review, i) => (
                        <PropertyReviewCard key={i} review={review} />
                    ))
                }
                {
                    hasNextPage &&
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={() => fetchNextPage()}
                    >
                        {isFetchingNextPage ? <Loader2 className="w-10 h-10 text-blue-950 animate-spin" /> : null} Show more
                    </Button>
                }
            </div>
        </div>
    );
};

export default ReviewTabsContent;