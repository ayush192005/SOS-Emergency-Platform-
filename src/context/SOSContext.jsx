
import {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";

const HOLD_DURATION = 2000;

export const SOSContext = createContext();

export const SOSProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastTriggered, setLastTriggered] = useState(null);
  const [sosError, setSosError] = useState(null);

  const pressTimerRef = useRef(null);
  const isSendingRef = useRef(false);

  // Send emergency SMS through backend
  const triggerSOS = useCallback(async (contacts, location) => {
    if (isSendingRef.current) return;

    const primaryContact = contacts?.[0];

    if (!primaryContact) {
      setSosError("No primary emergency contact selected.");
      setIsActive(false);
      return;
    }

    isSendingRef.current = true;
    setIsSending(true);
    setIsActive(true);
    setSosError(null);
    setLastTriggered(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/send-sms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: primaryContact.name,
            phone: primaryContact.phone,
            location: {
              latitude: location[0],
              longitude: location[1],
            },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to send emergency SMS."
        );
      }

      setLastTriggered({
        success: true,
        contactsNotified: 1,
        contactName: primaryContact.name,
        timestamp: new Date().toISOString(),
      });

      return result;
    } catch (error) {
      console.error("SOS failed:", error);
      setSosError(error.message || "Unable to send emergency SMS.");

      return {
        success: false,
        error: error.message,
      };
    } finally {
      isSendingRef.current = false;
      setIsSending(false);
      setIsActive(false);
    }
  }, []);

  // Start 2-second hold
  const startHold = useCallback((contacts, location) => {
    if (isSendingRef.current || pressTimerRef.current) return;

    setSosError(null);
    setIsActive(true);

    pressTimerRef.current = setTimeout(() => {
      pressTimerRef.current = null;
      triggerSOS(contacts, location);
    }, HOLD_DURATION);
  }, [triggerSOS]);

  // Cancel if user releases before 2 seconds
  const cancelHold = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
      setIsActive(false);
    }
  }, []);

  // Reset SOS status
  const resetSOS = useCallback(() => {
    setIsActive(false);
    setLastTriggered(null);
    setSosError(null);
  }, []);

  return (
    <SOSContext.Provider
      value={{
        isActive,
        isSending,
        lastTriggered,
        sosError,
        triggerSOS,
        startHold,
        cancelHold,
        resetSOS,
        holdDuration: HOLD_DURATION,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
};

export function useSOS() {
  const context = useContext(SOSContext);

  if (!context) {
    throw new Error("useSOS must be used within an SOSProvider");
  }

  return context;
}
