"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {reviewService} from "@/services/reviewService";
import {useQueryClient} from "@tanstack/react-query";
import {FC} from "react";

interface DeleteDialogProps {
    reviewId: number;
}

const DeleteReviewDialog: FC<DeleteDialogProps> = ({reviewId}) => {
    const clientQuery = useQueryClient();
    const handleAction = async () => {
        await reviewService.deleteUserReview(reviewId);
        await clientQuery.invalidateQueries({queryKey: ["get-user-reviews", "get-property-reviews", "get-tenant-reviews"]})
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="p-1 h-max"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete Review</DialogTitle>
                <DialogDescription>Are you sure you want to delete this review?</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-blue-950 text-white" onClick={handleAction}>
                            Confirm
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="link" className="text-blue-950">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteReviewDialog;