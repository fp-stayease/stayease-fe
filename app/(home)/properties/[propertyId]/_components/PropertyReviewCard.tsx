"use client";

import {ReviewType} from "@/constants/Review";
import {FC, useState} from "react";
import {Button} from "@/components/ui/button";
import ReviewReplyList from "@/components/ReviewReplyList";
import {dateFormater} from "@/utils/dateFormatter";
import ShowReplyBtn from "@/components/ShowReplyBtn";
import {useReviewReplies} from "@/hooks/reviews/useReplies";

interface PropertyReviewCardProps {
    review: ReviewType;
}

const PropertyReviewCard: FC<PropertyReviewCardProps> = ({review}) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const {replies} = useReviewReplies(review.id);
    return (
        <div className="w-full grid grid-cols-1 p-4 border gap-y-2 border-gray-200 rounded-md bg-white">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm">
                    <h1 className="font-semibold">{review.user.firstName} {review.user?.lastName}</h1>
                    <p className="text-gray-500">{dateFormater(review.createdAt)}</p>
                </div>
                <h1 className="text-xl">{review.rating?.toFixed(1)}<span className="text-sm text-gray-500 ml-1">/5</span></h1>
            </div>
            <div className="w-full">
                <p>
                    {review.comment}
                </p>
            </div>
            {
                replies && replies?.length > 0 &&
                    <ShowReplyBtn setShowReply={setShowReply} showReply={showReply} reviewId={review.id} />
            }
        </div>
    );
};

export default PropertyReviewCard;