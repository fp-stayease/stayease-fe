import { AvailablePropertyType } from "@/constants/Property";
import { useCallback, useEffect, useRef, useState } from "react";
import propertyService from "@/services/propertyService";
import { usePropertySearch } from "./usePropertySearch";
import { buildSearchParams } from "@/utils/urlBuilder";
import { useRouter } from "next/navigation";
import _ from "lodash";

export interface FilterOptions {
  city?: string;
  minPrice: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
  searchTerm?: string;
}

export interface SortOption {
  sortBy?: string;
  sortDirection?: string;
}

export const initialFilters: FilterOptions = {
  city: "",
  minPrice: 0,
  maxPrice: undefined,
  startDate: undefined,
  endDate: undefined,
  categoryId: "",
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
  const [properties, setProperties] = useState<AvailablePropertyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [pagination, setPagination] = useState(initialPagination);

  // Update filters from URL parameters on mount
  useEffect(() => {
    const urlFilters = getUrlFilters();
    setFilters(urlFilters);
  }, [getUrlFilters]);

  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSort({ sortBy: "name", sortDirection: "ASC" });
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    updateSearchParams({});
    router.replace("/properties");
  }, [updateSearchParams]);

  // Fetch property listings based on current filters, sort, and pagination
  const fetchPropertyListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await propertyService.sortAndFilter(
        filters.startDate,
        filters.endDate,
        filters.city,
        filters.categoryId ? Number(filters.categoryId) : undefined,
        filters.searchTerm,
        filters.minPrice,
        filters.maxPrice,
        pagination.currentPage,
        pagination.size,
        sort.sortBy,
        sort.sortDirection,
      );
      setProperties(result.content);
      setPagination((prev) => ({
        ...prev,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalElements: result.totalElements,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.currentPage, pagination.size, sort, router]);

  // Debounce the fetch function to avoid rapid calls
  const debouncedFetchPropertyListings = useCallback(
    _.debounce(fetchPropertyListings, 1000),
    [fetchPropertyListings],
  );

  // Trigger fetch when dependencies change
  useEffect(() => {
    debouncedFetchPropertyListings();
  }, [
    debouncedFetchPropertyListings,
    filters,
    pagination.currentPage,
    pagination.size,
    sort,
    router,
  ]);

  // Update filters and reset pagination
  const updateFilters = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      setFilters((prev) => {
        const updatedFilters = { ...prev, ...newFilters };

        // Only update URL if filters have changed
        if (JSON.stringify(updatedFilters) !== JSON.stringify(prev)) {
          updateSearchParams(updatedFilters);
          const params = buildSearchParams(updatedFilters);
          router.replace(`/properties?${params.toString()}`, { scroll: false });
        }
        return updatedFilters;
      });
      setPagination((prev) => ({ ...prev, currentPage: 0 }));
    },
    [updateSearchParams, router],
  );

  // Update sort and reset pagination
  const updateSort = useCallback((newSort: Partial<SortOption>) => {
    setSort((prev) => ({ ...prev, ...newSort }));
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
  }, []);

  // Update current page
  const updatePage = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  }, []);

  return {
    properties,
    isLoading,
    error,
    filters,
    sort,
    pagination,
    updateFilters,
    updateSort,
    updatePage,
    resetFilters,
  };
};
