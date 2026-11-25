import { useContext, useState, useMemo } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { Smartphone, Tablet, Laptop, Monitor, Watch } from "lucide-react";

const Settings = () => {
  const { profile, preferences, updateProfile, updatePreferences, updateAvatar } = useContext(UserProfileContext);

  const initialFormData = useMemo(() => ({
    name: profile.name,
    email: profile.email,
  }), [profile.name, profile.email]);

  const [formData, setFormData] = useState(initialFormData);
  const [avatarInput, setAvatarInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setFormData({ name: profile.name, email: profile.email });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        updateAvatar(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUrl = () => {
    if (avatarInput.trim()) {
      updateAvatar(avatarInput.trim());
      setAvatarInput("");
    }
  };

  const handleThemeChange = (e) => {
    updatePreferences({ theme: e.target.value });
  };

  const handleLanguageChange = (e) => {
    updatePreferences({ language: e.target.value });
  };

  const handleTimezoneChange = (e) => {
    updatePreferences({ timezone: e.target.value });
  };

  // Mock connected accounts
  const connectedAccounts = [
    {
      id: "google",
      name: "Google",
      email: "jatin.sharma@gmail.com",
      icon: "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    },
    {
      id: "github",
      name: "GitHub",
      email: "jatinsharma",
      icon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
  ];

  // Mock devices
  const devices = [
    {
      id: "1",
      name: "iPhone 14 Pro",
      type: "phone",
      lastUsed: "2 days ago",
      current: true,
    },
    {
      id: "2",
      name: "MacBook Pro",
      type: "laptop",
      lastUsed: "1 hour ago",
      current: false,
    },
    {
      id: "3",
      name: "iPad Pro",
      type: "tablet",
      lastUsed: "1 week ago",
      current: false,
    },
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case "phone":
        return <Smartphone strokeWidth={2} size={18} />;
      case "tablet":
        return <Tablet strokeWidth={2} size={18} />;
      case "laptop":
        return <Laptop strokeWidth={2} size={18} />;
      case "desktop":
        return <Monitor strokeWidth={2} size={18} />;
      case "watch":
        return <Watch strokeWidth={2} size={18} />;
      default:
        return <Smartphone strokeWidth={2} size={18} />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl m-3 p-3 sm:p-4 md:p-5">
      <span className="text-3xl font-bold block mb-6">Settings</span>

      {/* Card Container */}
      <div className="space-y-6">
        {/* Card 1: Personal Information */}
        <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
          <div className="px-4 py-3 border-b-2 border-zinc-200">
            <h1 className="font-bold text-lg">Personal Information</h1>
          </div>

          <form onSubmit={handleSaveProfile} className="p-4 space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-zinc-300 flex-shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src={profile.avatar}
                  alt="profile Image"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                  <button
                    type="button"
                    className="border-2 border-zinc-300 text-sm px-4 py-2 font-bold rounded-lg hover:bg-zinc-100 transition"
                  >
                    Change Photo
                  </button>
                </label>
                <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>

            {/* Avatar URL */}
            <div className="flex gap-2">
              <input
                type="text"
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                placeholder="Or paste image URL..."
                className="flex-1 px-4 py-2 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
              />
              <button
                type="button"
                onClick={handleAvatarUrl}
                disabled={!avatarInput.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Use URL
              </button>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Preferences */}
        <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
          <div className="px-4 py-3 border-b-2 border-zinc-200">
            <h1 className="font-bold text-lg">Preferences</h1>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Theme</label>
                <select
                  value={preferences.theme}
                  onChange={handleThemeChange}
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition bg-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Language</label>
                <select
                  value={preferences.language}
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={handleTimezoneChange}
                  className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition bg-white"
                >
                  <option value="Asia/Kolkata">India (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT/BST)</option>
                  <option value="Europe/Paris">Paris (CET/CEST)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                  <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                </select>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="pt-4 border-t-2 border-zinc-200">
              <h2 className="font-bold text-lg mb-3">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { id: "sos_alerts", label: "SOS Alerts", desc: "Receive emergency alerts from contacts" },
                  { id: "safe_zone", label: "Safe Zone Notifications", desc: "Get notified when entering/leaving safe zones" },
                  { id: "location_updates", label: "Location Sharing Updates", desc: "Periodic location updates to trusted contacts" },
                  { id: "app_updates", label: "App Updates & Tips", desc: "New features and safety tips" },
                ].map((item) => (
                  <label key={item.id} className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg cursor-pointer hover:border-zinc-300 transition">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-red-600 border-zinc-300 rounded focus:ring-red-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Connected Accounts & Devices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connected Accounts */}
          <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
            <div className="px-4 py-3 border-b-2 border-zinc-200">
              <h1 className="font-bold text-lg">Connected Accounts</h1>
            </div>

            <div className="p-4 space-y-3">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center gap-3 p-3 bg-white border-2 border-zinc-200 rounded-lg">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex-shrink-0">
                    <img
                      className="h-full w-full object-contain p-1"
                      src={account.icon}
                      alt={account.name}
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-bold text-gray-900">{account.name}</span>
                    <span className="text-sm text-gray-500 truncate">Connected as {account.email}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-zinc-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-zinc-300 transition">
                    Disconnect
                  </button>
                </div>
              ))}

              <div className="pt-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-zinc-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-zinc-100 hover:border-zinc-400 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Account
                </button>
              </div>
            </div>
          </div>

          {/* Devices */}
          <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
            <div className="px-4 py-3 border-b-2 border-zinc-200">
              <h1 className="font-bold text-lg">Devices</h1>
            </div>

            <div className="p-4 space-y-3">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center gap-3 p-3 bg-white border-2 border-zinc-200 rounded-lg">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-gray-600 flex-shrink-0">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{device.name}</span>
                      {device.current && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">Last used {device.lastUsed}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-zinc-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-zinc-300 transition">
                    Remove
                  </button>
                </div>
              ))}

              <div className="pt-4 text-center text-sm text-gray-500">
                <p>This device: <span className="font-medium">Current Browser</span></p>
                <p className="mt-1">Last active: <span className="font-medium">Just now</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Data & Privacy */}
        <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
          <div className="px-4 py-3 border-b-2 border-zinc-200">
            <h1 className="font-bold text-lg">Data & Privacy</h1>
          </div>

          <div className="p-4 space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg hover:border-zinc-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Export My Data</p>
                  <p className="text-sm text-gray-500">Download a copy of your data</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg hover:border-zinc-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card 5: About */}
        <div className="bg-zinc-100 border-2 border-gray-200 rounded-xl">
          <div className="px-4 py-3 border-b-2 border-zinc-200">
            <h1 className="font-bold text-lg">About</h1>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Version</p>
                  <p className="text-sm text-gray-500">1.0.0</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Privacy Policy</p>
                  <p className="text-sm text-gray-500">Read our privacy policy</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Terms of Service</p>
                  <p className="text-sm text-gray-500">Read our terms of service</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Open Source Licenses</p>
                  <p className="text-sm text-gray-500">View third-party licenses</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;