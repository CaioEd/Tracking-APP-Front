// Hook that initializes Google Maps API and creates a map instance.
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import { Map } from "../utils/map";
import { getCurrentPosition } from "./geolocation";

export function useMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    (async () => {
      // Creates a new instance of the Google Maps API loader.
      const loader = new Loader({
        apiKey: import .meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries: ["routes", "geometry", "marker"],
      });
      // Load the Google Maps API and the required libraries.
      const [, , , position] = await Promise.all([
        loader.importLibrary("routes"),
        loader.importLibrary("geometry"),
        loader.importLibrary("marker"),
        getCurrentPosition({ enableHighAccuracy: true }),
      ]);
      // Create a new map instance with the specified options.
      const map = new Map(containerRef.current!, {
        mapId: "8e0a97af9386fef", // theme
        zoom: 15,
        center: position,
      });
      setMap(map);
    })();
  }, [containerRef]);

  return map;
}