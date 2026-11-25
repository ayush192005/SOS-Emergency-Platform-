import { createContext, useState, useCallback, useEffect, useContext } from "react";

const STORAGE_KEY = "sos-safe-zones";

export const SafeZoneContext = createContext();

export const SafeZoneProvider = ({ children }) => {
  const [safeZones, setSafeZones] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load safe zones from storage:", e);
    }
    return [];
  });

  const [activeZone, setActiveZone] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeZones));
  }, [safeZones]);

  const addSafeZone = useCallback((zone) => {
    const newZone = {
      ...zone,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSafeZones((prev) => [...prev, newZone]);
    return newZone;
  }, []);

  const updateSafeZone = useCallback((id, updates) => {
    setSafeZones((prev) =>
      prev.map((zone) => (zone.id === id ? { ...zone, ...updates } : zone))
    );
  }, []);

  const deleteSafeZone = useCallback((id) => {
    setSafeZones((prev) => prev.filter((zone) => zone.id !== id));
  }, []);

  const checkLocationInZones = useCallback(
    (position) => {
      return safeZones.find((zone) => {
        const distance = getDistanceFromLatLonInKm(
          position[0],
          position[1],
          zone.lat,
          zone.lng
        );
        return distance <= zone.radius;
      });
    },
    [safeZones]
  );

  return (
    <SafeZoneContext.Provider
      value={{
        safeZones,
        activeZone,
        setActiveZone,
        addSafeZone,
        updateSafeZone,
        deleteSafeZone,
        checkLocationInZones,
      }}
    >
      {children}
    </SafeZoneContext.Provider>
  );
};

export function useSafeZones() {
  const context = useContext(SafeZoneContext);
  if (!context) {
    throw new Error("useSafeZones must be used within a SafeZoneProvider");
  }
  return context;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}