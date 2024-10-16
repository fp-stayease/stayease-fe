import { useCallback, useRef } from "react";
import logger from "@/utils/logger";

interface MarkerConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  initialCenter: google.maps.LatLngLiteral;
  isEditable: boolean;
  viewOnly: boolean;
  onLocationChange: (
    location: google.maps.LatLngLiteral,
    address?: string,
    city?: string,
    country?: string,
  ) => void;
}

export const useMarker = ({
  mapRef,
  initialCenter,
  isEditable,
  viewOnly,
  onLocationChange,
}: MarkerConfig) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const updateMarkerAndMap = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      if (mapRef.current && markerRef.current) {
        markerRef.current.position = new google.maps.LatLng(newPosition);
        mapRef.current.panTo(newPosition);

        if (geocoderRef.current) {
          geocoderRef.current.geocode(
            { location: newPosition, language: "en" },
            (results, status) => {
              if (status === "OK" && results && results[0]) {
                const addressComponents = results[0].address_components;
                let address = results[0].formatted_address;
                let city = "";
                let country = "";

                for (let component of addressComponents) {
                  if (component.types.includes("administrative_area_level_2")) {
                    city = component.long_name;
                  }
                  if (component.types.includes("country")) {
                    country = component.long_name;
                  }
                }

                onLocationChange(newPosition, address, city, country);
              } else {
                onLocationChange(newPosition);
              }
            },
          );
        } else {
          onLocationChange(newPosition);
        }
      }
    },
    [mapRef, onLocationChange],
  );

  const handleMarkerDragEnd = () => {
    const position = markerRef.current?.position;
    if (
      position &&
      typeof position.lat === "number" &&
      typeof position.lng === "number"
    ) {
      updateMarkerAndMap({ lat: position.lat, lng: position.lng });
    } else {
      logger.error("Marker position is null or undefined");
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const clickedPosition = e.latLng?.toJSON();
    if (clickedPosition) {
      updateMarkerAndMap(clickedPosition);
    }
  };

  const initMarker = useCallback(() => {
    if (!mapRef.current || markerRef.current) return;

    const iconElement = document.createElement("img");
    iconElement.src = "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
    iconElement.alt = "You are here";

    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: initialCenter,
      gmpDraggable: isEditable && !viewOnly,
      content: isEditable && viewOnly ? iconElement : undefined,
      title: isEditable && viewOnly ? "You are here" : undefined,
    });

    geocoderRef.current = new google.maps.Geocoder();

    if (isEditable) {
      markerRef.current.addListener("dragend", handleMarkerDragEnd);
      mapRef.current.addListener("click", handleMapClick);
    }
  }, [
    mapRef,
    initialCenter,
    isEditable,
    viewOnly,
    handleMarkerDragEnd,
    handleMapClick,
  ]);

  return { markerRef, initMarker, updateMarkerAndMap };
};
