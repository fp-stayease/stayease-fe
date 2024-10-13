import { AvailablePropertyType } from "@/constants/Property";
import { useCallback, useEffect, useMemo, useState } from "react";
import propertyService from "@/services/propertyService";
import { usePropertySearch } from "./usePropertySearch";
import { buildSearchParams } from "@/utils/urlBuilder";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "@/hooks/utils/useFetchData";

export interface FilterOptions {
  city?: string;
  guestCount?: number;
  minPrice: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
  categoryName?: string;
  searchTerm?: string;
}

export interface SortOption {
  sortBy?: string;
  sortDirection?: string;
}

export const initialFilters: FilterOptions = {
  city: "",
  guestCount: 0,
  minPrice: 0,
  maxPrice: undefined,
  startDate: undefined,
  endDate: undefined,
  categoryName: "",
  searchTerm: "",
};

const initialSort: SortOption = {
  sortBy: "",
  sortDirection: "",
};

const initialPagination = {
  currentPage: 0,
  totalPages: 1,
  totalElements: 0,
  size: 10,
};

export const usePropertyListings = () => {
  const router = useRouter();
  const { getUrlFilters, updateSearchParams } = usePropertySearch();
  const [filters, setFilters] = useState<FilterOptions>(getUrlFilters());
  const [debouncedFilters, setDebouncedFilters] =
    useState<FilterOptions>(filters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [pagination, setPagination] = useState(initialPagination);

  const queryKey = useMemo(
    () => ["propertyListings", debouncedFilters, sort, pagination],
    [debouncedFilters, sort, pagination],
  );

  const {
    data: propertyListingsData,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: () =>
      propertyService.sortAndFilter(
        debouncedFilters.startDate,
        debouncedFilters.endDate,
        debouncedFilters.city,
        debouncedFilters.categoryName,
        debouncedFilters.searchTerm,
        debouncedFilters.minPrice,
        debouncedFilters.maxPrice,
        debouncedFilters.guestCount
          ? Number(debouncedFilters.guestCount)
          : undefined,
        pagination.currentPage,
        pagination.size,
        sort.sortBy,
        sort.sortDirection,
      ),
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
  });

  // Debounce the filter updates for API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  // Update URL immediately when filters change
  useEffect(() => {
    const params = buildSearchParams(filters);
    router.replace(`/properties?${params.toString()}`, { scroll: false });
    updateSearchParams(filters);
  }, [filters, router, updateSearchParams]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSort({ sortBy: "name", sortDirection: "ASC" });
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    updateSearchParams({});
    router.replace("/properties");
  }, [updateSearchParams, router]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
  }, []);

  const updateSort = useCallback((newSort: Partial<SortOption>) => {
    setSort((prev) => ({ ...prev, ...newSort }));
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
  }, []);

  const updatePage = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  }, []);

  return {
    properties: propertyListingsData?.content || [],
    isLoading,
    error,
    filters,
    sort,
    pagination: {
      ...pagination,
      totalPages: propertyListingsData?.totalPages || 0,
      totalElements: propertyListingsData?.totalElements || 0,
    },
    updateFilters,
    updateSort,
    updatePage,
    resetFilters,
  };
};
