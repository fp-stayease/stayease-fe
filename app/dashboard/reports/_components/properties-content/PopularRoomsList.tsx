"use client";

import RoomsCard from "@/app/dashboard/reports/_components/properties-content/RoomsCard";
import {usePopularRooms} from "@/hooks/reports/usePropertiesReport";
import ListLoading from "@/components/ListLoading";

const PopularRoomsList = () => {
    const {
        popularRooms,
        popularRoomsIsLoading,
        popularRoomsError
    } = usePopularRooms();

    if (popularRoomsIsLoading) return <ListLoading />
    if (popularRoomsError) return <>Something went wrong</>
    if (!popularRooms) return <p className="text-gray-500">No data available</p>

    return (
        <div className="space-y-8">
            {
                popularRooms.map((room, i) => (
                    <RoomsCard rooms={room} key={i} />
                ))
            }
        </div>
    );
};

export default PopularRoomsList;