import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  FilterOptions,
  initialFilters,
} from "@/hooks/properties/usePropertyListings";
import {
  buildSearchParams,
  buildUrl,
  getFilterFromParams,
} from "@/utils/urlBuilder";
import { debounce } from "lodash";

export const usePropertySearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get filters from URL parameters
  const getUrlFilters = useCallback(() => {
    const filters = getFilterFromParams(searchParams);
    return {
      ...initialFilters,
      ...Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [
          key,
          value ?? initialFilters[key as keyof FilterOptions],
        ]),
      ),
    };
  }, [searchParams]);

  /// Function to update URL parameters with new filters
  const updateSearchParams = useCallback(
    (filters: Partial<FilterOptions>) => {
      const currentPath = new URL(window.location.href).pathname;
      const newParams = buildSearchParams(filters);
      router.replace(`${currentPath}?${newParams.toString()}`, {
        scroll: false,
      });
    },
    [router],
  );

  // Handle redirect with filters and optional property/room IDs
  const handleRedirect = useCallback(
    (
      filters: Partial<FilterOptions>,
      basePath: string,
      propertyId?: string,
      roomId?: string,
    ) => {
      const newUrl = buildUrl(basePath, filters, { propertyId, roomId });
      router.push(newUrl);
    },
    [router],
  );

  const resetFilters = useCallback(() => {
    updateSearchParams(initialFilters);
  }, [updateSearchParams]);

  return { getUrlFilters, handleRedirect, updateSearchParams, resetFilters };
};
