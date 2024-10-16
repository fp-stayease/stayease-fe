import { useCallback, useRef } from "react";
import logger from "@/utils/logger";

interface InitMapConfig {
  initialCenter: google.maps.LatLngLiteral;
  isEditable: boolean;
  viewOnly: boolean;
  mapStyles?: google.maps.MapTypeStyle[];
}

export const useInitMap = ({
  initialCenter,
  isEditable,
  viewOnly,
  mapStyles,
}: InitMapConfig) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const initMap = useCallback(() => {
    if (mapRef.current) return;

    const mapElement = document.getElementById("map");
    if (!mapElement) {
      logger.error("Map element not found");
      return;
    }
    mapRef.current = new window.google.maps.Map(
      mapElement,

      {
        center: initialCenter,
        zoom: 15,
        disableDefaultUI: false,
        zoomControl: !viewOnly,
        fullscreenControl: !viewOnly,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        draggable: isEditable,
        clickableIcons: isEditable,
        mapId: apiKey,
        styles: mapStyles,
        streetViewControl: false, // Disable Street View
        mapTypeControl: false, // Disable Map/Satellite switch
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
      },
    );
    addLocationButton(mapRef, isEditable);
  }, [initialCenter, isEditable, viewOnly, apiKey, mapStyles]);

  return { mapRef, initMap, apiKey };
};

const addLocationButton = (
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  isEditable: boolean,
) => {
  if (mapRef.current && isEditable) {
    // Create the My Location button
    const locationButton = document.createElement("button");
    locationButton.textContent = "My Location";

    // Inline styles for the button
    Object.assign(locationButton.style, {
      backgroundColor: "white",
      border: "none",
      borderRadius: "5px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
      margin: "10px",
      padding: "6px 12px",
      fontSize: "12px",
      fontWeight: "bold",
      color: "#333",
      cursor: "pointer",
      textAlign: "center",
    });

    // Handle hover styles
    locationButton.addEventListener("mouseover", () => {
      locationButton.style.backgroundColor = "#f1f1f1";
    });
    locationButton.addEventListener("mouseout", () => {
      locationButton.style.backgroundColor = "white";
    });

    // Add the button to the map
    mapRef.current.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      locationButton,
    );

    // Handle click event to center the map to user's location
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            mapRef.current?.setCenter(pos);
          },
          () => {
            logger.error("Error: The Geolocation service failed.");
          },
        );
      } else {
        logger.error("Error: Your browser doesn't support geolocation.");
      }
    });
  }
};
