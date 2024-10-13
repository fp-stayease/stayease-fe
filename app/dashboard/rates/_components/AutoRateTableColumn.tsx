import * as React from "react";
import { ColumnDef } from "@tanstack/table-core";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RateResponseType } from "@/constants/Rates";
import { formatDate } from "@/utils/dateFormatter";
import { currencyFormatter } from "@/utils/CurrencyFormatter";

export const AutoRateColumns: ColumnDef<RateResponseType>[] = [
  {
    id: "propertyName",
    accessorKey: "propertySummary.propertyName",
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
    cell: ({ row }) => {
      const propertyName = row.original.propertySummary.propertyName;
      return (
        <div className="flex items-center gap-2">
          <p>{propertyName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "adjustmentRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        Adjustment Rate
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => {
      let rate;
      if (row.original.adjustmentType === "PERCENTAGE") {
        rate = `${row.original.adjustmentRate}%`;
      } else {
        const price = currencyFormatter(row.original.adjustmentRate);
        rate = `${price}`;
      }
      return (
        <div className="flex items-center gap-2">
          <p>{rate}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        Start Date
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
      >
        End Date
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    accessorFn: (row) => `${formatDate(row.validFrom)}`,
    cell: ({ row }) => <div>{row.getValue("validFrom")}</div>,
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <div>{row.getValue("reason")}</div>,
  },
];
