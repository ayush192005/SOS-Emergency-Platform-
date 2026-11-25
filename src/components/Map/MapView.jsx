
import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const DefaultIcon = icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ChangeMapView = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [position, map]);

  return null;
};

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e);
      }
    },
  });

  return null;
};

const MapControls = () => {
  const map = useMap();

  return (
    <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-1">
      <button
        type="button"
        className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          map.zoomIn();
        }}
      >
        +
      </button>

      <button
        type="button"
        className="bg-white shadow-lg rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          map.zoomOut();
        }}
      >
        −
      </button>
    </div>
  );
};

const MapView = ({
  onPositionChange,
  initialPosition = [30.829038, 76.927315],
  safeZones = [],
  activeZone = null,
  onMapClick,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [locationError, setLocationError] = useState("");

  const handlePositionChange = useCallback(
    (newPosition) => {
      setPosition(newPosition);

      if (onPositionChange) {
        onPositionChange(newPosition);
      }
    },
    [onPositionChange]
  );

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const newPosition = [
          location.coords.latitude,
          location.coords.longitude,
        ];

        handlePositionChange(newPosition);
      },
      (error) => {
        console.error("Location error:", error.message);

        setLocationError(
          `Unable to get location: ${error.message}`
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [handlePositionChange]);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full"
      >
       
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView position={position} />

        <MapClickHandler onMapClick={onMapClick} />

        {safeZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            color={zone.color}
            fillColor={zone.color}
            fillOpacity={
              activeZone?.id === zone.id ? 0.3 : 0.15
            }
            weight={activeZone?.id === zone.id ? 3 : 2}
            dashArray={
              activeZone?.id === zone.id ? "0" : "5, 5"
            }
          >
            <Popup>
              <div className="p-2">
                <div
                  className="w-3 h-3 rounded-full mr-2 inline-block"
                  style={{ backgroundColor: zone.color }}
                />

                <strong>{zone.name}</strong>

                <br />

                <span className="text-xs text-gray-500">
                  Radius: {zone.radius}m
                </span>
              </div>
            </Popup>
          </Circle>
        ))}

        <Marker position={position} icon={DefaultIcon}>
          <Popup>
            <div className="p-2">
              <strong>Your Location</strong>

              <br />

              <span className="text-xs text-gray-500">
                {position[0].toFixed(6)},{" "}
                {position[1].toFixed(6)}
              </span>
            </div>
          </Popup>
        </Marker>

        <CircleMarker
          center={position}
          radius={10}
          color="#ef4444"
          fillColor="#ef4444"
          fillOpacity={0.3}
          weight={1}
          className="animate-pulse"
        />

        <div className="absolute top-3 right-3 z-999">
          <button
            type="button"
            className="bg-white shadow-lg rounded-xl px-4 py-2 text-sm font-semibold hover:bg-gray-100 flex items-center gap-2"
            onClick={getCurrentLocation}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            Get My Location
          </button>
        </div>

        <MapControls />
      </MapContainer>

      {locationError && (
        <div className="absolute bottom-3 left-3 bg-white text-red-600 shadow-lg rounded-lg px-3 py-2 text-xs max-w-[80%]">
          {locationError}
        </div>
      )}
    </div>
  );
};

export default MapView;
