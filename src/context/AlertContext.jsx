import { createContext, useState, useCallback, useEffect, useContext } from "react";

const STORAGE_KEY = "sos-alert-history";
const INITIAL_ALERTS = [
  {
    id: 1,
    history: "Alert sent to 3 contacts",
    date: "11/10/2026",
    time: "09:45 AM",
    status: "Resolved",
  },
  {
    id: 2,
    history: "Alert sent to 2 contacts",
    date: "11/09/2026",
    time: "06:20 PM",
    status: "Safe",
  },
  {
    id: 3,
    history: "Alert sent to 4 contacts",
    date: "11/07/2026",
    time: "11:15 PM",
    status: "Resolved",
  },
  {
    id: 4,
    history: "Alert sent to 5 contacts",
    date: "11/05/2026",
    time: "02:30 PM",
    status: "Safe",
  },
  {
    id: 5,
    history: "Alert sent to 1 contact",
    date: "11/03/2026",
    time: "08:10 AM",
    status: "Cancelled",
  },
];

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertHistory, setAlertHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load alerts from storage:", e);
    }
    return INITIAL_ALERTS;
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alertHistory));
  }, [alertHistory]);

  const addAlert = useCallback((alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    setAlertHistory((prev) => [newAlert, ...prev]);
    setNotifications((prev) => [newAlert, ...prev]);
    return newAlert;
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        alertHistory,
        notifications,
        addAlert,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
}