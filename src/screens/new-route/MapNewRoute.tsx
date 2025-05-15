"use client";

import { useEffect, useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { DirectionsData } from "../../utils/models";

export type MapNewRouteProps = {
  directionsData: DirectionsData;
};

export function MapNewRoute(props: MapNewRouteProps) {
  const { directionsData } = props;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    if (!map || !directionsData) {
      return;
    }

    map.removeAllRoutes();

  }, [map, directionsData]);

  return <div className="w-2/3 h-full" ref={mapContainerRef} />;
}