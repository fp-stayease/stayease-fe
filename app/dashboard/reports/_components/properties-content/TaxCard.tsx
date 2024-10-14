"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Landmark} from "lucide-react";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface TaxCardProps {
    tax: number;
}

const TaxCard: FC<TaxCardProps> = ({ tax }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Property&apos;s Tax
                </CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{currencyFormatter(tax)}</div>
            </CardContent>
        </Card>
    );
};

export default TaxCard;