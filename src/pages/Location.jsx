import MapView from "../components/Map/MapView";
import { MapPin, ShieldCheck, Plus, Trash2, Edit, X, Map, Circle } from "lucide-react";
import { useState, useCallback } from "react";
import { SafeZoneContext } from "../context/SafeZoneContext";
import { AlertContext } from "../context/AlertContext";
import { useContext } from "react";

const Location = () => {
  const { safeZones, addSafeZone, updateSafeZone, deleteSafeZone, checkLocationInZones, activeZone, setActiveZone } = useContext(SafeZoneContext);
  const { addAlert } = useContext(AlertContext);

  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [currentPosition] = useState([30.829038, 76.927315]);
  const [zoneForm, setZoneForm] = useState({
    name: "",
    radius: 500,
    color: "#ef4444",
  });

  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setZoneForm((prev) => ({ ...prev, name: "", radius: 500 }));
    setEditingZone(null);
    setShowAddZoneModal(true);
    // Store the clicked position temporarily
    window.__tempZonePosition = [lat, lng];
  }, []);

  const handleAddZone = useCallback((e) => {
    e.preventDefault();
    const position = window.__tempZonePosition || currentPosition;
    if (!position) return;

    addSafeZone({
      ...zoneForm,
      lat: position[0],
      lng: position[1],
    });

    setShowAddZoneModal(false);
    setZoneForm({ name: "", radius: 500, color: "#ef4444" });
    delete window.__tempZonePosition;
  }, [addSafeZone, zoneForm, currentPosition]);

  const handleEditZone = useCallback((zone) => {
    setEditingZone(zone);
    setZoneForm({
      name: zone.name,
      radius: zone.radius,
      color: zone.color,
    });
    window.__tempZonePosition = [zone.lat, zone.lng];
    setShowAddZoneModal(true);
  }, []);

  const handleUpdateZone = useCallback((e) => {
    e.preventDefault();
    if (!editingZone) return;

    const position = window.__tempZonePosition || [editingZone.lat, editingZone.lng];
    updateSafeZone(editingZone.id, {
      ...zoneForm,
      lat: position[0],
      lng: position[1],
    });

    setShowAddZoneModal(false);
    setEditingZone(null);
    setZoneForm({ name: "", radius: 500, color: "#ef4444" });
    delete window.__tempZonePosition;
  }, [updateSafeZone, editingZone, zoneForm]);

  const handleDeleteZone = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this safe zone?")) {
      deleteSafeZone(id);
    }
  }, [deleteSafeZone]);

  const checkSafeZone = useCallback((position) => {
    const zone = checkLocationInZones(position);
    setActiveZone((prevActiveZone) => {
      if (zone && !prevActiveZone) {
        // Just entered a safe zone
        addAlert({
          history: `Entered safe zone: ${zone.name}`,
          status: "Safe",
        });
      } else if (!zone && prevActiveZone) {
        // Just left a safe zone
        addAlert({
          history: `Left safe zone: ${prevActiveZone.name}`,
          status: "Resolved",
        });
      }
      return zone;
    });
  }, [checkLocationInZones, setActiveZone, addAlert]);

  const COLORS = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
  ];

  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl flex flex-col gap-4 m-3 p-4 sm:p-5 md:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Location</h1>
          <p className="text-sm">Track and manage your current location</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-300 rounded-3xl font-bold p-3 text-sm text-green-600 flex items-center gap-1">
            <ShieldCheck strokeWidth={2} size={14} />
            GPS Active
          </span>
        </div>
      </div>

      {/* Location Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-zinc-200">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <MapPin className="text-red-500" strokeWidth={2} size={20} />
          </div>
          <div>
            <span className="font-bold text-lg">Current Location</span>
            <p className="text-sm text-gray-500">
              {currentPosition[0].toFixed(6)}, {currentPosition[1].toFixed(6)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-zinc-200">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="text-green-500" strokeWidth={2} size={20} />
          </div>
          <div>
            <span className="font-bold text-lg">Safe Zone Status</span>
            <p className="text-sm">
              {activeZone
                ? `Inside: ${activeZone.name}`
                : "Outside any safe zone"}
            </p>
          </div>
        </div>
      </div>

      {/* Map with Safe Zones */}
      <div className="flex-1 relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">Safe Zones</h2>
          <button
            onClick={() => {
              setEditingZone(null);
              setZoneForm({ name: "", radius: 500, color: "#ef4444" });
              window.__tempZonePosition = currentPosition;
              setShowAddZoneModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Zone
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden *:" style={{ height: "calc(100vh - 350px)", minHeight: "300px" }}>
          <MapView
            onPositionChange={checkSafeZone}
            initialPosition={currentPosition}
            safeZones={safeZones}
            activeZone={activeZone}
            onMapClick={handleMapClick}
          />
        </div>

        {safeZones.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-sm text-gray-700 mb-2">Your Safe Zones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {safeZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`
                    p-3 rounded-xl border-2 flex items-center gap-3 transition
                    ${activeZone?.id === zone.id
                      ? "bg-green-50 border-green-300"
                      : "bg-white border-zinc-200 hover:border-zinc-300"
                    }
                  `}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: zone.color }}
                  >
                    <Circle className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{zone.name}</p>
                    <p className="text-xs text-gray-500">
                      {zone.radius}m radius
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditZone(zone)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {safeZones.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            <Map className="w-12 h-12 mx-auto mb-2 opacity-50" strokeWidth={1.5} />
            <p className="text-sm">No safe zones defined yet</p>
            <p className="text-xs">Click "Add Zone" or click on the map to create one</p>
          </div>
        )}
      </div>

      {(showAddZoneModal || editingZone) && (
        <div className="fixed inset-0 flex items-center  z-9999 justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b-2 border-zinc-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingZone ? "Edit Safe Zone" : "Add Safe Zone"}
              </h2>
              <button
                onClick={() => {
                  setShowAddZoneModal(false);
                  setEditingZone(null);
                  setZoneForm({ name: "", radius: 500, color: "#ef4444" });
                }}
                className="p-2 rounded-xl hover:bg-zinc-100 transition text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingZone ? handleUpdateZone : handleAddZone} className="p-4 space-y-4">
              <div>
                <label htmlFor="zoneName" className="block text-sm font-medium text-gray-700 mb-1">
                  Zone Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="zoneName"
                  name="name"
                  type="text"
                  value={zoneForm.name}
                  onChange={(e) => setZoneForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Home, Office, School"
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="zoneRadius" className="block text-sm font-medium text-gray-700 mb-1">
                  Radius (meters) <span className="text-red-500">*</span>
                </label>
                <input
                  id="zoneRadius"
                  name="radius"
                  type="number"
                  value={zoneForm.radius}
                  onChange={(e) => setZoneForm((prev) => ({ ...prev, radius: parseInt(e.target.value) || 0 }))}
                  min="50"
                  max="5000"
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setZoneForm((prev) => ({ ...prev, color }))}
                      className={`
                        w-10 h-10 rounded-full border-3 transition
                        ${zoneForm.color === color ? "border-red-600 scale-110" : "border-transparent hover:border-zinc-300"}
                      `}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddZoneModal(false);
                    setEditingZone(null);
                    setZoneForm({ name: "", radius: 500, color: "#ef4444" });
                  }}
                  className="flex-1 px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-zinc-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  {editingZone ? "Save Changes" : "Add Zone"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;