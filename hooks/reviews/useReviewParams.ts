"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ReviewsParamsType} from "@/constants/Review";
import _ from "lodash";

export const useReviewParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [reviewParams, setReviewParams] = useState<ReviewsParamsType>({
        page: null,
        size: null,
        sortBy: null,
        direction: null,
        search: null,
    });

    useEffect(() => {
        const query = new URLSearchParams(searchParams);
        const page = query.get("page");
        const size = query.get("size");
        const sortBy = query.get("sortBy");
        const direction = query.get("direction");
        const search = query.get("search");

        setReviewParams(prev => ({
            ...prev,
            page: page ? +page : null,
            size: size ? +size : null,
            sortBy,
            direction,
            search
        }));
    }, [searchParams]);

    const debouncedUpdateURL = useMemo(
        () => _.debounce((params: URLSearchParams) => {
            router.push(`?${params.toString()}`);
        }, 1000),
        [router]
    );

    const handleParamsChange = useCallback((newParams: Partial<ReviewsParamsType>) => {
        setReviewParams((prevParams) => {
            const updatedParams = {...prevParams, ...newParams};
            const params = new URLSearchParams();

            Object.entries(updatedParams).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.set(key, value.toString());
                }
            });

            debouncedUpdateURL(params);
            return updatedParams;
        })
    }, [debouncedUpdateURL]);

    return { reviewParams, handleParamsChange }
};