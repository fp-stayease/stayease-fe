"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ReplyForm from "@/app/dashboard/reviews/_components/ReplyForm";
import {FC} from "react";

interface ReplyDialogProps {
    reviewId: number;
}

const ReplyDialog: FC<ReplyDialogProps> = ({reviewId}) => {
    return (
       <Dialog>
           <DialogTrigger asChild>
               <Button
                   variant="link"
                   className="p-0 text-blue-950 w-max"
               >
                   Reply
               </Button>
           </DialogTrigger>
           <DialogContent>
               <DialogTitle>What&apos;s your reply</DialogTitle>
               <DialogDescription></DialogDescription>
               <ReplyForm DialogClose={DialogClose} reviewId={reviewId} />
           </DialogContent>
       </Dialog>
    );
};

export default ReplyDialog;