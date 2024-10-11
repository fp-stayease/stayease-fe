"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {ReviewsParamsType} from "@/constants/Review";
import {FC} from "react";

interface SortDirectionFilterProps {
    handleSortChange: (params: Partial<ReviewsParamsType>) => void;
}

const SortDirectionFilter: FC<SortDirectionFilterProps> = ({ handleSortChange }) => {
    const handleChange = (sort: string) => {
        handleSortChange({ direction: sort })
    };
    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-52">
                <SelectValue placeholder="Sort Direction" className="text-blue-950 capitalize"  />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="text-blue-950" >Sort Direction</SelectLabel>
                    <SelectItem value={"ASC"}>Newest Reviews</SelectItem>
                    <SelectItem value={"DESC"}>Oldest Reviews</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SortDirectionFilter;