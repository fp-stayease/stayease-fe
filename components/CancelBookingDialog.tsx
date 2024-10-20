"use client";

import {FC} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {transactionService} from "@/services/transactionService";
import {useQueryClient} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {useAlert} from "@/context/AlertContext";

interface CancelBookingDialogProps {
    bookingId: string;
    queryKey: string;
}

const CancelBookingDialog: FC<CancelBookingDialogProps> = ({ bookingId, queryKey }) => {
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const { showAlert } = useAlert();

    const handleCancel = async () => {
        try {
            if (pathname.includes("dashboard")) {
                await transactionService.tenantCancelTrx(bookingId);
            } else {
                await transactionService.userCancelTrx(bookingId);
            }
            showAlert("success", "Booking cancelled");
            await queryClient.invalidateQueries({queryKey: [queryKey]})
        } catch (error) {
            showAlert("error", "Something went wrong, please try again");
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-800"
                >
                    Cancel
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogDescription>
                    Are you sure you want to cancel this booking?
                </DialogDescription>
                <div className="w-full flex items-center justify-end">
                    <DialogClose asChild>
                        <Button
                            variant="link"
                            className="text-blue-950"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={handleCancel}
                            className="bg-blue-950"
                        >
                            Continue
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CancelBookingDialog;