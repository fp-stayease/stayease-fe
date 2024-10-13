"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useMemo, useState} from "react";
import {UserBookingsType} from "@/constants/Booking";
import _ from "lodash";

export const useUserBookingsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [queries, setQueries] = useState<UserBookingsType>({
        page: 0,
        size: 5,
        direction: null,
        search: null
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const page = params.get("page");
        const size = params.get("size");
        const direction = params.get("direction");
        const search = params.get("search");

        setQueries(prev => ({
            ...prev,
            page: page ? +page : 0,
            size: size ? +size : 5,
            direction: direction ? direction : "DESC",
            search: search
        }));
    }, [searchParams]);

    const debouncedUpdateURL = useMemo(
        () => _.debounce((params: URLSearchParams) => {
            router.push(`?${params.toString()}`);
        }, 1000),
        [router]
    );

    const setQuery = useCallback((newQuery: Partial<UserBookingsType>) => {
        setQueries((prev) => {
            const updatedQueries= { ...prev, ...newQuery };
            const newParams = new URLSearchParams();

            Object.entries(updatedQueries).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    newParams.set(key, value.toString());
                }
            });
            debouncedUpdateURL(newParams);
            return updatedQueries;
        });
    }, [debouncedUpdateURL]);

    return { queries, setQuery }
}