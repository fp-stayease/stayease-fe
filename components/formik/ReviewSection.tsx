import RatingStar from "@/components/RatingStar";
import {FC} from "react";
import EditState from "@/app/(user)/profile/reviews/_components/EditState";

interface ReviewSectionProps {
    isEditState: boolean;
    comment: string | null | undefined;
    rating: number | null | undefined;
    reviewId: number;
}

const ReviewSection: FC<ReviewSectionProps> = ({ isEditState, comment, rating , reviewId}) => {
    return (
        <div className="w-full xl:w-1/2 flex flex-col gap-y-2 pl-2">
            {
                isEditState || (!comment && !rating) ?
                    <EditState reviewId={reviewId} comment={comment} rating={rating} /> :
                    <>
                        <RatingStar rating={rating} />
                        <p className="w-full text-wrap text-blue-950 text-sm">{comment}</p>
                    </>
            }
        </div>
    );
};

export default ReviewSection;