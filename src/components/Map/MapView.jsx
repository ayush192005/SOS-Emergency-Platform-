import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = () => {
  const [position, setPosition] = useState([30.829038, 76.927315]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const newPosition = [
          location.coords.latitude,
          location.coords.longitude,
        ];

        setPosition(newPosition);
      },
      (error) => {
        console.log(error.message);
      },
    );
  };
  const ChangeMapView = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, 15);
    }, [position, map]);

    return null;
  };
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView position={position} />
        <Marker position={position}>
          <Popup>Your current location</Popup>
        </Marker>

        <button
          className="absolute top-3 right-3 z-[1000] bg-white shadow-lg rounded-xl px-4 py-2 text-sm font-semibold hover:bg-gray-100"
          onClick={getCurrentLocation}
        >
          Get My Location
        </button>
      </MapContainer>
    </div>
  );
};

export default MapView;
