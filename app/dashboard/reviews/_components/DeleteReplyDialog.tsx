"use client";

import React, {FC} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useQueryClient} from "@tanstack/react-query";
import {replyService} from "@/services/ReplyService";

interface IDeleteReplyDialog {
    replyId: number;
}

const DeleteReplyDialog: FC<IDeleteReplyDialog> = ({replyId}) => {
    const queryClient = useQueryClient();
    const handleDelete = async () => {
        try {
            await replyService.deleteReply(replyId);
            await queryClient.invalidateQueries({queryKey: ["get-review-replies"]});
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="p-2"
                >
                    <Trash2 className="w-4 h-4 text-blue-950" />
                </Button>
            </DialogTrigger>
            <DialogContent className="text-blue-950">
                <DialogTitle>Delete reply</DialogTitle>
                <DialogDescription>Are you sure you want to delete this reply?</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-blue-950 text-white" onClick={handleDelete}>
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

export default DeleteReplyDialog;