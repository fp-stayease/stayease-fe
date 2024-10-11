"use client";

import { useQuery } from "@tanstack/react-query";
import { RoomType } from "@/constants/Property";
import propertyService from "@/services/propertyService";

export const useRoomDetail = (propertyId: number, roomId: number) => {
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["get-room-detail", propertyId, roomId],
        queryFn: () => propertyService.getRoomById(propertyId, roomId),
        enabled: !!propertyId && !!roomId,
    });

    const room = data as RoomType;
    return { room, isLoading, error, refetch };
};