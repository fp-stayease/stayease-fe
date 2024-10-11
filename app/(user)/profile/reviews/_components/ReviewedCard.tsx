"use client";

import Image from "next/image";
import ReviewSection from "@/components/formik/ReviewSection";
import {Button} from "@/components/ui/button";
import {PencilLine} from "lucide-react";
import {FC, useState} from "react";
import {ReviewType} from "@/constants/Review";
import {dateFormater} from "@/utils/dateFormatter";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import {useReviewReplies} from "@/hooks/reviews/useReplies";
import ShowReplyBtn from "@/components/ShowReplyBtn";

interface ReviewedCardProps {
    review: ReviewType;
}

const ReviewedCard: FC<ReviewedCardProps> = ({ review }) => {
    const {id, published, booking, rating, comment} = review;
    const [isEditState, setEditState] = useState<boolean>(!published);
    const [showReply, setShowReply] = useState<boolean>(false);
    const {replies} = useReviewReplies(review.id);
    return (
        <div className="w-full grid-cols-1 border border-gray-200 p-5 rounded-md">
            <div className="w-full flex flex-col lg:flex-row gap-3">
                <Image src={booking.propertyImage} alt={"image"} height={120} width={120} className="h-32 object-cover rounded-md" />
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-xs text-blue-950 text-opacity-50">Booking ID: {booking.id}</p>
                        <Button
                            variant="ghost"
                            className="p-1 h-max"
                            onClick={() => setEditState(!isEditState)}
                        >
                            <PencilLine className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="w-full flex flex-col xl:flex-row gap-3 lg:gap-1">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2">
                            <h1 className="text-lg text-blue-950 font-semibold">{booking.propertyName}</h1>
                            <p className="text-sm text-blue-950">{currencyFormatter(booking.totalPrice)}</p>
                            <p className="text-sm text-blue-950 text-opacity-70">{dateFormater(booking.checkInDate)} - {dateFormater(booking.checkOutDate)}</p>
                        </div>
                        <div className="w-px h-full bg-gray-200 hidden lg:block" />
                        <hr className="border-gray-200" />
                        <ReviewSection isEditState={isEditState} comment={comment} rating={rating} reviewId={id} />
                    </div>
                </div>
            </div>
            {
                replies && replies?.length > 0 &&
                <ShowReplyBtn setShowReply={setShowReply} showReply={showReply} reviewId={review.id} />
            }
        </div>
    );
};

export default ReviewedCard;