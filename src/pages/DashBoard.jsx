import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactDataContext";
import { AlertContext } from "../context/AlertContext";
import { SafeZoneContext } from "../context/SafeZoneContext";
import { SOSContext } from "../context/SOSContext";
import MapView from "../components/Map/MapView";
import { Siren, Bell, Plus, Edit, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";
import ContactModal from "../components/Contacts/ContactModal";

const DashBoard = () => {
  const { userContact, addContact, updateContact, getTrustedContacts } = useContext(ContactContext);
  const { alertHistory, notifications } = useContext(AlertContext);
  const { checkLocationInZones } = useContext(SafeZoneContext);
  const { isActive, isSending, lastTriggered, startHold, cancelHold, resetSOS } = useContext(SOSContext);

  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [activeZone, setActiveZone] = useState(null);
  const [currentPosition] = useState([30.829038, 76.927315]);

  const trustedContacts = getTrustedContacts();

  const handleAddContact = () => {
    setEditingContact(null);
    setShowContactModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowContactModal(true);
  };

  const handleSOSStart = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const position = [location.coords.latitude, location.coords.longitude];
        startHold(trustedContacts, position);
      },
      (error) => {
        console.error("Location error:", error);
        // Use default position if geolocation fails
        startHold(trustedContacts, [30.829038, 76.927315]);
      }
    );
  };

  const handleSOSCancel = () => {
    cancelHold();
  };

  // Check safe zones on position change
  const checkSafeZone = (position) => {
    const zone = checkLocationInZones(position);
    setActiveZone(zone);
  };

  return (
    <div
      id="dashboard"
      className="h-[calc(100vh-1.5rem)] flex flex-col gap-4 overflow-y-auto bg-white rounded-2xl md:rounded-3xl m-3 p-2 sm:p-4 md:p-5"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start px-4 md:items-center">
        {/* Welcome Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-['Sintony']">
            Welcome Back, <span className="font-bold">Jatin!</span>
          </h2>

          <p className="text-sm text-gray-500">
            Stay safe. Your trusted contacts are monitoring your location.
          </p>
        </div>

        {/* Notification + Avatar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto min-w-0">
          {/* Bell */}
          <div className="hidden sm:block relative">
            <NotificationButton count={notifications.length} />
          </div>

          {/* SOS Status Indicator */}
          {isActive && (
            <div className="flex items-center gap-2 bg-red-100 border-2 border-red-400 px-3 py-1 rounded-3xl animate-pulse">
              <AlertCircle className="text-red-500" size={16} />
              <span className="text-red-700 text-sm font-medium">SOS Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 p-2 sm:p-4 gap-4">
        {/* Contact Board */}
        <div className="lg:col-span-7 object-fit bg-white border-2 border-zinc-300 shadow-lg rounded-2xl">
          {/* Card Heading */}
          <div className="flex justify-between items-center p-2">
            <span className="font-bold text-xl text-black">
              Emergency Contacts ({userContact.length}) Contact
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleAddContact}
                className="bg-black text-white p-2 text-xs font-bold border-2 border-black cursor-pointer rounded-xl hover:bg-gray-800 transition"
              >
                <Plus className="inline w-4 h-4 mr-1" /> Add
              </button>
              <button className="bg-white text-zinc-500 p-2 text-xs font-bold border-2 rounded-xl cursor-pointer hover:bg-zinc-100 transition">
                <Edit className="inline w-4 h-4 mr-1" /> Edit
              </button>
            </div>
          </div>
          {/* 3 contact list */}
          <div className="flex cursor-pointer flex-col py-2 max-h-96 overflow-y-auto">
            {userContact.slice(0, 20).map((item) => (
              <div
                key={item.id}
                className="bg-white border-b-2 border-gray-300 p-2 flex flex-wrap justify-between hover:bg-gray-200 items-center"
              >
                <div className="flex gap-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.avatar}
                    alt="avatar"
                  />
                  <div className="">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm font-bold text-gray-500">
                      {item.relationship}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Phone</span>
                  <p className="text-sm ">{item.phone}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-400">Location</span>
                  <p className="text-yellow-400 text-sm">Pending</p>
                </div>

                <span
                  className={`bg-green-300 text-sm shrink-0 px-2 py-1 text-green-800 font-bold rounded-4xl
                   ${item.trustLevel === "Trusted" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}`}
                >
                  {item.trustLevel}
                </span>

                <button
                  onClick={() => handleEditContact(item)}
                  className="text-zinc-400 hover:text-red-500 p-1"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Contact Button  */}
          <div className="p-2 border-t-2 border-gray-200">
            <button
              onClick={handleAddContact}
              className="w-full cursor-pointer  bg-white border-2 border-zinc-400 py-1 hover:bg-zinc-200 rounded-lg"
            >
              <Plus className="inline w-4 h-4 mr-1" /> + Add Contact
            </button>
          </div>
        </div>

        {/* Animated Waves + SOS Button */}
        <div className="lg:col-span-5 bg-red-50 border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <div className="relative flex items-center justify-center w-full max-w-[400px] aspect-square mx-auto">
            <Ripple
              mainCircleSize={60}
              mainCircleOpacity={0.25}
              numCircles={5}
              className="[&_div]:border-red-600 [&_div]:bg-red-600/20"
            />

            {/* SOS Button */}
            <button
              className="relative z-10 h-30 w-30 rounded-full bg-red-600 text-white shadow-xl flex flex-col items-center justify-center gap-1 hover:bg-red-700 active:scale-95 transition"
              onMouseDown={handleSOSStart}
              onMouseUp={handleSOSCancel}
              onMouseLeave={handleSOSCancel}
              onTouchStart={(e) => { e.preventDefault(); handleSOSStart(); }}
              onTouchEnd={handleSOSCancel}
              disabled={isSending}
            >
              <Siren size={36} />
              <span className="font-bold text-2xl">SOS</span>
              {isSending && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-600/80 rounded-full">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          </div>

          {/* Hold instruction */}
          <p className="text-sm text-gray-500 font-medium text-center">
            Press and hold the SOS button for{" "}
            <span className="text-red-600 font-bold">2 seconds</span> to broadcast
            location.
          </p>

          {/* Last triggered info */}
          {lastTriggered && (
            <div className="bg-white border-2 border-green-300 rounded-xl p-3 animate-fade-in">
              <div className="flex items-center gap-2 text-green-700">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-medium">SOS sent successfully!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Notified {lastTriggered.contactsNotified} contacts at {new Date(lastTriggered.timestamp).toLocaleTimeString()}
              </p>
              <button
                onClick={resetSOS}
                className="mt-2 text-sm text-green-700 underline hover:text-green-900"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Medical ID */}
        <div className="lg:col-span-6 bg-white border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <h2 className="font-bold text-lg ">My Medical ID</h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
            {/* Health Information */}
            <div>
              <h2 className="font-bold text-lg">Health Information</h2>
              <div className="flex flex-col">
                <span className="text-sm">Blood Type</span>
                <span className="font-bold">O+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Allergies</span>
                <span className="font-bold">Penicillin, Nuts</span>
              </div>
            </div>
            {/* Emergency Contact */}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg">Emergency Contact</h2>
              <div className="flex flex-col">
                <span className="text-sm">Primary Contact</span>
                <span className="font-bold">Father</span>
              </div>
            </div>
          </div>
          {/* Insurance Details */}
          <div>
            <h2 className="font-bold text-lg">Insurance Details</h2>
            <div className="flex flex-col">
              <span className="text-sm">Provider</span>
              <span className="font-bold">Aetna</span>
              <span className="text-sm">Insurance ID</span>
              <span>ID#...</span>
            </div>
          </div>
        </div>

        {/* Alert History & Safe Zone */}
        <div className="lg:col-span-6 bg-white border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <div className="w-full overflow-hidden">
            <h2 className="font-bold text-lg">Alert History & Safe Zone</h2>
            <div className=" w-full h-100 rounded-2xl bg-white border-2 border-zinc-300 flex flex-col gap-1 overflow-auto">
              {alertHistory.map((alert) => (
                <div
                  key={alert.id}
                  className="border-b-2 p-1 hover:bg-zinc-200  border-b-zinc-200 flex flex-wrap justify-between items-center"
                >
                  <span>{alert.history}</span>
                  <span className="text-sm text-gray-500">
                    ({alert.date} {alert.time}) -
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      alert.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : alert.status === "Safe"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map with Safe Zones */}
        <div className="lg:col-span-12  w-full p-3 bg-white border-2 border-zinc-300  shadow-lg flex flex-col sm:flex-row gap-3 justify-between rounded-2xl">
          {/* Map */}
          <div className="w-full overflow-hidden flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">Define Safe Zones</h2>
              <div className="flex items-center gap-2">
                <MapPin
                  className={`${activeZone ? "text-green-500" : "text-gray-400"}`}
                  strokeWidth={2}
                  size={18}
                />
                <span className="text-sm">
                  {activeZone ? `Inside: ${activeZone.name}` : "Outside safe zone"}
                </span>
              </div>
            </div>
            <div className="rounded-2xl h-[400px] w-full overflow-hidden">
              <MapView onPositionChange={checkSafeZone} initialPosition={currentPosition} />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contact={editingContact}
        onSave={(data) => {
          if (editingContact) {
            updateContact(editingContact.id, data);
          } else {
            addContact(data);
          }
          setShowContactModal(false);
        }}
      />
    </div>
  );
};

// Notification Button with badge
const NotificationButton = ({ count }) => {
  return (
    <div className="relative bg-gray-200 p-2 rounded-full cursor-pointer shrink-0">
      <Bell strokeWidth={2} size={18} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
};

export default DashBoard;