"use client";

import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {reviewService} from "@/services/reviewService";
import {PropertyRatingType, ReviewsParamsType, ReviewType} from "@/constants/Review";

const useUserReviews = (query?: Partial<ReviewsParamsType>) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
       queryKey: ["get-user-reviews", query],
       queryFn: async ({pageParam}) => {
           const response = await reviewService.getUserReviews({...query, page: pageParam});
           return {
               reviews: response.content,
               totalPages: response.totalPages,
               totalElements: response.totalElements,
               currentPage: response.pageable.pageNumber
           }},
       getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1
            }
            return undefined;
       },
       initialPageParam: 0,
       enabled: !!query
    });

    return {
        userReviews: data?.pages.flatMap((page) => page.reviews) as unknown as ReviewType[],
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
};

const usePropertyRating = (propertyId: number) => {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["get-property-rating", propertyId],
        queryFn: () => reviewService.getPropertyRating(propertyId),
        enabled: !!propertyId
    });

    return {
        propertyRating: data as PropertyRatingType,
        isLoading,
        error,
        refetch
    };
};

const usePropertyReviews = (propertyId: number) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["get-property-reviews", propertyId],
        queryFn: async ({pageParam}) => {
            const response = await reviewService.getPropertyReviews(propertyId, {page: pageParam});
            return {
                reviews: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.pageable.pageNumber
            }},
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!propertyId
    });

    return {
        propertyReviews: data?.pages.flatMap((page) => page.reviews as unknown as ReviewType[]),
        isLoading: isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
};

const useTenantReviews = (query?: Partial<ReviewsParamsType>) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["get-tenant-reviews", query],
        queryFn: async ({pageParam}) => {
            const response = await reviewService.getTenantReviews({...query, page: pageParam});
            return {
                reviews: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                currentPage: response.pageable.pageNumber
            }},
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPage.currentPage + 1
            }
            return undefined;
        },
        initialPageParam: 0,
        enabled: !!query
    });

    return {
        tenantReviews: data?.pages.flatMap((page) => page.reviews) as unknown as ReviewType[],
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
}

export { useUserReviews, usePropertyRating, usePropertyReviews, useTenantReviews };