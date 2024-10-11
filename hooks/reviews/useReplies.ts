"use client";

import {useInfiniteQuery} from "@tanstack/react-query";
import {replyService} from "@/services/ReplyService";
import {ReplyType} from "@/constants/Replies";

const useReviewReplies = (reviewId: number) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["get-review-replies", reviewId],
        queryFn: async ({pageParam}) => {
            const response = await replyService.getReviewReplies(reviewId, pageParam);
            return {
                replies: response.content,
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
        enabled: !!reviewId
    });

    return {
        replies: data?.pages.flatMap((page) => page.replies as unknown as ReplyType[]),
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
};

export { useReviewReplies };