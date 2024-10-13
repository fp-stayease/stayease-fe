import {ColumnDef} from "@tanstack/table-core";
import {BookingDataType, pendingBookings, rejectedBookings} from "@/constants/Booking";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, EllipsisVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import Tag from "@/components/ui/tag";
import PaymentProofDialog from "@/app/dashboard/booking-request/_components/PaymentProofDialog";
import PaymentActionDialog from "@/app/dashboard/booking-request/_components/PaymentActionDialog";
import {dateFormater} from "@/utils/dateFormatter";
import DetailButton from "@/app/dashboard/booking-request/_components/DetailButton";

export const columns: ColumnDef<BookingDataType>[] = [
    {
        accessorKey: "user",
        header: "User",
        accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
        cell: ({ row }) => <div>{row.getValue("user")}</div>
    },
    {
        accessorKey: "room",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="p-0"
            >
                Room
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.bookingItems.map(i => i.room.name),
        cell: ({ row }) => <div>{row.getValue("room")}</div>
    },
    {
        accessorKey: "property",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="p-0"
            >
                Property
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.property.propertyName,
        cell: ({ row }) => <div>{row.getValue("property")}</div>
    },
    {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="p-0"
            >
                Payment Method
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </Button>
        ),
        accessorFn: (row) => row.payment.paymentMethod,
        cell: ({ row }) => <div className="capitalize">{row.getValue("paymentMethod")?.toString().replace("_", " ")}</div>
    },
    {
        accessorKey: "checkInDate",
        header: "Check-in",
        accessorFn: (row) => row.checkInDate,
        cell: ({ row }) => <div>{dateFormater(row.getValue("checkInDate"))}</div>
    },
    {
        accessorKey: "checkOutDate",
        header: "Check-out",
        accessorFn: (row) => row.checkOutDate,
        cell: ({ row }) => <div>{dateFormater(row.getValue("checkOutDate"))}</div>
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="p-0"
            >
                Status
                <ArrowUpDown className="ml-2 w-4 h-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status")?.toString() || "";
            let color;
            if (rejectedBookings.includes(status)) {
                color = "bg-red-400 text-red-800";
            } else if (pendingBookings.includes(status)) {
                color = "bg-yellow-500 text-yellow-800";
            } else {
                color = "bg-green-400 text-green-800";
            }
            return (
                <div className="uppercase font-semibold">
                    <Tag className={color}>
                        {status.replaceAll("_", " ")}
                    </Tag>
                </div>
            )
        }
    },
    {
        id: "actions",
        header: "More",
        enableHiding: false,
        cell: ({ row }) => {
            const paymentMethod = row.original.payment.paymentMethod;
            const paymentProof = row.original.payment?.paymentProof || "https://res.cloudinary.com/duxay6ujg/image/upload/v1724836498/Payment%20Proof/odablihssogwvqisthlv.jpg";
            const totalAmount = row.original.totalPrice;
            const bookingId = row.original.id;
            const paymentStatus = row.original.status;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-blue-950">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-blue-950" asChild>
                            <DetailButton bookingId={bookingId} />
                        </DropdownMenuItem>
                        {
                            paymentMethod === "manual_transfer" && paymentStatus === "WAITING_FOR_CONFIRMATION" &&
                                <div className="w-full flex flex-col gap-2">
                                    <PaymentProofDialog paymentProof={paymentProof} totalAmount={totalAmount}/>
                                    <PaymentActionDialog bookingId={bookingId} isApproval={true} />
                                    <PaymentActionDialog bookingId={bookingId} isApproval={false}/>
                                </div>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];