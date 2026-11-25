import { useContext, useState } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { ContactContext } from "../context/ContactDataContext";
import { SOSContext } from "../context/SOSContext";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  MapPin,
  HeartPulse,
  ChevronRight,
  Camera,
  Settings,
  AlertCircle,
  CheckCircle,
  X,
  User,
} from "lucide-react";

const Profile = () => {
  const { profile, updateAvatar } = useContext(UserProfileContext);
  const { getTrustedContacts } = useContext(ContactContext);
  const { triggerSOS, isSending, lastTriggered, resetSOS } = useContext(SOSContext);
  const navigate = useNavigate();

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarInput, setAvatarInput] = useState("");

  const trustedContacts = getTrustedContacts();

  const handleTestSOS = async () => {
    if (trustedContacts.length === 0) {
      alert("Please add trusted contacts first before testing SOS.");
      navigate("/contacts");
      return;
    }

    // Get current location
    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const position = [location.coords.latitude, location.coords.longitude];
        const result = await triggerSOS(trustedContacts, position);
        if (result?.success) {
          alert(`Test SOS sent successfully to ${result.contactsNotified} contacts!`);
        }
      },
      (error) => {
        console.error("Location error:", error);
        // Use default position
        const position = [30.829038, 76.927315];
        triggerSOS(trustedContacts, position);
      }
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        updateAvatar(dataUrl);
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUrl = () => {
    if (avatarInput.trim()) {
      updateAvatar(avatarInput.trim());
      setShowAvatarModal(false);
      setAvatarInput("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl m-3 overflow-hidden">
      {/* Banner */}
      <div className="relative flex flex-col">
        <div className="w-full h-36 relative">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1762503203754-62c5a0c969d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt=""
          />
        </div>

        {/* Image & Protection Status */}
        <div className="flex justify-end py-2 px-4">
          <div className="absolute left-5 top-20 sm:left-5 sm:top-20">
            <div className="relative">
              <div className="h-24 w-24 shadow-2xl sm:h-30 sm:w-30 rounded-full border-6 border-white overflow-hidden">
                <img className="w-full h-full object-cover" src={profile.avatar} alt="" />
              </div>  
            </div>
          </div>

          {/* Protection Status */}
          <div className="flex gap-1 flex-col items-end pr-4">
            <span className="text-xs text-zinc-400 font-bold">Protection Status</span>
            <span className="bg-green-200 px-3 py-1.5 text-xs text-green-600 inline-flex items-center gap-1.5 rounded-3xl font-bold">
              <ShieldCheck strokeWidth={2} size={12} /> System Active
            </span>
          </div>
        </div>

        {/* Profile Content Area */}
        <div className="w-full mt-7 px-6 flex flex-col gap-10 pb-8">
          <div className="w-full flex flex-col md:items-center sm:justify-between md:flex-row gap-4">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-3xl font-bold">{profile.name}</span>
              <div className="flex flex-col md:flex-row gap-1.5 text-gray-500 justify-center md:justify-start">
                <span className="flex items-center gap-1">
                  <Phone strokeWidth={2} size={16} className="text-red-600" />{" "}
                  ICE: {profile.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin strokeWidth={2} size={14} className="" />
                  {profile.location}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTestSOS}
                disabled={isSending}
                className="bg-red-600 rounded-3xl cursor-pointer px-4 py-1.5 text-white font-medium hover:bg-red-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {isSending ? "Sending..." : "Test SOS"}
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="bg-gray-200 border-2 cursor-pointer border-gray-300 rounded-3xl px-4 py-1.5 font-medium hover:bg-gray-300 transition flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Blood Badges */}
          <div className="text-gray-600 flex lg:justify-between flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex gap-1 items-center text-sm">
              <HeartPulse strokeWidth={2} size={15} className="text-red-600" />{" "}
              MEDICAL & HEALTH BADGES
            </div>
            <div className="flex flex-wrap w-fit gap-1">
              <span className="px-3 py-1 text-nowrap bg-red-200 rounded-3xl text-red-500 font-bold text-sm">
                Blood Type: {profile.bloodType}
              </span>
              {profile.conditions.map((condition, idx) => (
                <span key={idx} className="px-3 py-1 text-nowrap bg-amber-100 rounded-3xl text-amber-700 font-bold text-sm">
                  {condition}
                </span>
              ))}
              {profile.allergies.map((allergy, idx) => (
                <span key={idx} className="px-3 py-1 text-nowrap bg-blue-200 rounded-3xl text-blue-700 font-bold text-sm">
                  {allergy} Allergy
                </span>
              ))}
              {profile.isOrganDonor && (
                <span className="px-3 py-1 text-nowrap bg-zinc-200 rounded-3xl text-zinc-500 font-bold text-sm">
                  Organ Donor
                </span>
              )}
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
            <div className="w-full max-w-80 min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold text-sm">Trusted Contacts</span>
                <span className="text-sm text-zinc-500">
                  {trustedContacts.length} People Linked for alerts
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <ChevronRight strokeWidth={2} />
              </div>
            </div>

            <div className="w-full max-w-80 min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold text-sm">Medical ID</span>
                <span className="text-sm text-zinc-500">
                  {profile.conditions.length + profile.allergies.length} Conditions & Allergies
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <ChevronRight strokeWidth={2} />
              </div>
            </div>

            <div className="w-full max-w-80 min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-bold text-sm">Safe Zones</span>
                <span className="text-sm text-zinc-500">
                  Configure in Location tab
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <ChevronRight strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* SOS Test Result */}
          {lastTriggered && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-800">Test SOS Sent Successfully</h3>
                  <p className="text-sm text-green-700">
                    Notified {lastTriggered.contactsNotified} contacts at{" "}
                    {new Date(lastTriggered.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={resetSOS}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-slide-up">
            <div className="flex justify-between items-center p-4 border-b-2 border-zinc-200">
              <h2 className="text-xl font-bold text-gray-900">Update Profile Photo</h2>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-2 rounded-xl hover:bg-zinc-100 transition text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Current Avatar Preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="h-24 w-24 rounded-full border-4 border-zinc-200 overflow-hidden bg-zinc-100 flex items-center justify-center">
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Upload Options */}
              <div className="grid grid-cols-2 gap-3">
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                  <div className="p-4 border-2 border-zinc-300 rounded-xl text-center hover:border-red-500 hover:bg-red-50 transition">
                    <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Upload Photo</p>
                    <p className="text-xs text-gray-500">From your device</p>
                  </div>
                </label>

                <div className="relative cursor-pointer flex flex-col">
                  <input
                    type="text"
                    value={avatarInput}
                    onChange={(e) => setAvatarInput(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="p-3 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={handleAvatarUrl}
                    disabled={!avatarInput.trim()}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Use URL
                  </button>
                </div>
              </div>

              {/* Generate from name */}
              <button
                onClick={() => {
                  const name = profile.name.trim() || "User";
                  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ef4444&color=fff&size=150`;
                  updateAvatar(avatarUrl);
                  setShowAvatarModal(false);
                }}
                className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-zinc-50 transition flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Generate from Name
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;