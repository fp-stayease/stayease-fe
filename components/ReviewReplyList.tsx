"use client";

import ReplyCard from "@/components/ReplyCard";
import {cn} from "@/lib/utils";
import {FC} from "react";
import {useReviewReplies} from "@/hooks/reviews/useReplies";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ReviewReplyListProps {
    isVisible: boolean;
    reviewId: number;
}

const ReviewReplyList: FC<ReviewReplyListProps> = ({isVisible, reviewId}) => {
    const {
        replies,
        isLoading,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useReviewReplies(reviewId);

    if (isLoading) return <div className="w-full flex items-center gap-2">
        <Loader2 className="w-4 h-4 text-blue-950 animate-spin" />
        <p>Loading...</p>
    </div>

    if (error) return <>Something went wrong</>

    return (
        <div className={cn("w-full grid grid-cols-1 gap-1", isVisible ? "block" : "hidden")}>
            {
                !replies || replies.length === 0 &&
                <div className="text-gray-500">
                    No reviews
                </div>
            }
            {
                replies && replies.length > 0 &&
                replies.map((reply, i) => (
                    <ReplyCard key={i} reply={reply} />
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
    );
};

export default ReviewReplyList;