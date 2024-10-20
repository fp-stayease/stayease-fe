import React, {FC, useEffect, useState} from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {transactionService} from "@/services/transactionService";
import {useQueryClient} from "@tanstack/react-query";
import {useAlert} from "@/context/AlertContext";

interface PaymentActionDialogProps {
    bookingId: string;
    isApproval: boolean;
}

const PaymentActionDialog: FC<PaymentActionDialogProps> = ({ bookingId, isApproval }) => {
    const client = useQueryClient();
    const { showAlert } = useAlert();
    const handleAction = async () => {
        try {
            if (isApproval) {
                await transactionService.tenantApproveTrx(bookingId);
                showAlert("success", "Booking approved");
            } else {
                await transactionService.tenantRejectTrx(bookingId);
                showAlert("success", "Booking rejected");
            }
            await client.invalidateQueries({queryKey: ["get-tenant-bookings"]});
        } catch (error) {
            showAlert("error", "Something went wrong, please try again");
        }
    };

    return (
        <Dialog>
            <DialogTrigger className={`text-sm ${isApproval ? 'text-green-800' : 'text-red-800'} p-2`}>
                {isApproval ? 'Approve payment' : 'Reject payment'}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{isApproval ? 'Approve Payment' : 'Reject Payment'}</DialogTitle>
                <DialogDescription className="">
                    Are you sure you want to {isApproval ? 'approve' : 'reject'} this payment?
                </DialogDescription>
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

export default PaymentActionDialog;