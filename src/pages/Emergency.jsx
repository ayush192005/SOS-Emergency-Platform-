import { Siren, CheckCircle, MapPin, XCircle } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";
import { useState, useCallback, useContext } from "react";
import { ContactContext } from "../context/ContactDataContext";
import { SOSContext } from "../context/SOSContext";

const Emergency = () => {
  const { getPrimaryContact } = useContext(ContactContext);

  const {
    isActive,
    isSending,
    lastTriggered,
    sosError,
    startHold,
    cancelHold,
    resetSOS,
  } = useContext(SOSContext);

  const [currentPosition, setCurrentPosition] = useState([
    30.829038, 76.927315,
  ]);

  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const primaryContact = getPrimaryContact();

  // Get current location
  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const position = [location.coords.latitude, location.coords.longitude];

        setCurrentPosition(position);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Location error:", error);
        setIsGettingLocation(false);
        alert("Unable to get location. Please enable location services.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  // Start SOS after checking primary contact
  const handleSOSStart = useCallback(() => {
    if (!primaryContact) {
      alert("Please select a primary emergency contact first.");
      return;
    }

    startHold([primaryContact], currentPosition);
  }, [startHold, primaryContact, currentPosition]);

  // Cancel SOS hold
  const handleSOSCancel = useCallback(() => {
    cancelHold();
  }, [cancelHold]);

  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl flex flex-col gap-3 m-3 p-4 sm:p-5 md:p-6">
      {/* Heading */}
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Emergency Dashboard</h1>
      </div>

      {/* Location Status */}
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-50 rounded-xl">
        <MapPin className="text-red-500" size={20} />

        <div className="text-center">
          <p className="text-sm text-gray-500">Current Location</p>

          <p className="font-medium text-gray-900">
            {currentPosition[0].toFixed(4)}, {currentPosition[1].toFixed(4)}
          </p>
        </div>

        <button
          onClick={handleGetLocation}
          disabled={isGettingLocation || isSending}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-zinc-300 rounded-lg hover:bg-zinc-100 disabled:opacity-50 transition"
        >
          {isGettingLocation ? "Locating..." : "Update Location"}
        </button>
      </div>

      {/* SOS Button */}
      <div className="relative flex items-center justify-center w-full h-80 sm:h-96 overflow-hidden mx-auto">
        {/* Animated Waves */}
        <Ripple
          mainCircleSize={100}
          mainCircleOpacity={0.25}
          numCircles={5}
          className="[&_div]:border-red-600 [&_div]:bg-red-600/20"
        />

        <button
          type="button"
          className="relative z-10 h-32 w-32 sm:h-44 sm:w-44 rounded-full bg-red-600 text-white shadow-xl flex flex-col items-center justify-center gap-1 hover:bg-red-700 active:scale-95 transition disabled:opacity-60 touch-none select-none"
          onPointerDown={(e) => {
            e.preventDefault();
            console.log("SOS button pressed");
            handleSOSStart();
          }}
          onPointerUp={handleSOSCancel}
          onPointerLeave={handleSOSCancel}
          onPointerCancel={handleSOSCancel}
          disabled={isSending || !primaryContact}
        >
          <Siren size={36} />

          <span className="font-bold text-2xl">SOS</span>

          {isSending && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-600/80 rounded-full">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>

      {/* Hold Progress Indicator */}
      {isActive && !isSending && (
        <div className="text-center">
          <div className="w-64 mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full animate-pulse"
              style={{ width: "100%" }}
            />
          </div>

          <p className="text-sm text-red-600 font-medium mt-2">
            Hold for 2 seconds...
          </p>
        </div>
      )}

      {/* Instructions */}
      <p className="text-sm text-gray-500 font-medium text-center">
        Press and hold the SOS button for{" "}
        <span className="text-red-600 font-bold">2 seconds</span> to send an
        emergency SMS to your primary contact.
      </p>

      {/* Primary Contact Preview */}
      {primaryContact ? (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Primary Emergency Contact:
          </p>

          <div className="flex items-center justify-center gap-2">
            {primaryContact.avatar ? (
              <img
                src={primaryContact.avatar}
                alt={primaryContact.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">
                  {primaryContact.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold">{primaryContact.name}</p>

              <p className="text-xs text-gray-500">{primaryContact.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-600 text-sm">
          No primary contact selected. Please select one first.
        </p>
      )}

      {/* Success Message */}
      {lastTriggered && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 w-6 h-6 shrink-0" />

            <div className="flex-1">
              <h3 className="font-bold text-green-800">SOS Request Accepted</h3>

              <p className="text-sm text-green-700">
                SMS request accepted by TextBee for {lastTriggered.contactName}{" "}
                at {new Date(lastTriggered.timestamp).toLocaleTimeString()}.
              </p>
            </div>

            <button
              type="button"
              onClick={resetSOS}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {sosError && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600 w-6 h-6 shrink-0" />

            <div className="flex-1">
              <h3 className="font-bold text-red-800">
                Failed to Send SOS Alert
              </h3>

              <p className="text-sm text-red-700">{sosError}</p>
            </div>

            <button
              type="button"
              onClick={resetSOS}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Sending State */}
      {isSending && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin shrink-0" />

            <div>
              <h3 className="font-bold text-red-800">
                Sending Emergency Alert...
              </h3>

              <p className="text-sm text-red-700">
                Please wait while TextBee processes your SMS request.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
