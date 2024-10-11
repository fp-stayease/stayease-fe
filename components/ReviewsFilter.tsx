"use client";

import {Input} from "@/components/ui/input";
import SortDirectionFilter from "@/app/(user)/profile/reviews/_components/SortDirectionFilter";
import {useReviewParams} from "@/hooks/reviews/useReviewParams";

const ReviewsFilter = () => {
    const {reviewParams, handleParamsChange} = useReviewParams();
    return (
        <div className="w-full flex flex-col md:flex-row gap-2">
            <Input
                placeholder="Serch your review"
                className="max-w-64"
                onChange={(e) => handleParamsChange({search: e.target.value})}
                value={reviewParams.search ? reviewParams.search : ""}
            />
            <SortDirectionFilter handleSortChange={handleParamsChange} />
        </div>
    );
};

export default ReviewsFilter;