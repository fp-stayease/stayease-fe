import ReplyDialog from "@/app/dashboard/reviews/_components/ReplyDialog";
import {ReviewType} from "@/constants/Review";
import {FC} from "react";
import {useReviewReplies} from "@/hooks/reviews/useReplies";
import TenantReplyList from "@/app/dashboard/reviews/_components/TenantReplyList";
import {dateFormater} from "@/utils/dateFormatter";
import DeleteReviewDialog from "@/components/DeleteReviewDialog";

interface TenantReviewCardProps {
    review: ReviewType;
}
const TenantReviewCard: FC<TenantReviewCardProps> = ({ review }) => {
    const {replies} = useReviewReplies(review.id);
    return (
        <div className="w-full grid grid-cols-1 p-4 border gap-y-2 border-gray-200 rounded-md bg-white">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm">
                    <h1 className="font-semibold">{review.user.firstName} {review.user?.lastName}</h1>
                    <p>{review.booking.propertyName}</p>
                    <p className="text-gray-500">{dateFormater(review.createdAt)}</p>
                </div>
                <h1 className="text-xl">{review.rating?.toFixed(1)}<span className="text-sm text-gray-500 ml-1">/5</span></h1>
            </div>
            <div className="w-full">
                <p>{ review.comment }</p>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                    <ReplyDialog reviewId={review.id} />
                    <DeleteReviewDialog reviewId={review.id} />
                </div>
                {
                    replies && replies.length > 0 &&
                    <TenantReplyList reviewId={review.id} />
                }
            </div>
        </div>
    );
};

export default TenantReviewCard;