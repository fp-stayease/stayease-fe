import {Button} from "@/components/ui/button";
import ReviewReplyList from "@/components/ReviewReplyList";
import {FC, SetStateAction} from "react";

interface ShowReplyBtnProps {
    setShowReply: (value: SetStateAction<boolean>) => void;
    showReply: boolean;
    reviewId: number;
}

const ShowReplyBtn: FC<ShowReplyBtnProps> = ({setShowReply, reviewId, showReply}) => {
    return (
        <div className="w-full grid grid-cols-1 gap-1">
            <Button
                variant="link"
                className="p-0 w-max"
                onClick={() => setShowReply(prev => !prev)}
            >
                {showReply ? "Close" : "Show reply"}
            </Button>
            <ReviewReplyList isVisible={showReply} reviewId={reviewId}/>
        </div>
    );
};

export default ShowReplyBtn;