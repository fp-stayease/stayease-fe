"use client";

import {useQuery} from "@tanstack/react-query";
import {reviewService} from "@/services/reviewService";

export const useAllReviews = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery(({
        queryKey: ["get-all-reviews"],
        queryFn: async () => await reviewService.getAllReviews()
    }));

    return {
        reviews: data,
        isLoading,
        error
    }
}