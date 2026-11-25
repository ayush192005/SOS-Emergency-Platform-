import { createContext, useState, useCallback, useEffect, useContext } from "react";

const STORAGE_KEY = "sos-user-profile";

export const UserProfileContext = createContext();

const DEFAULT_PROFILE = {
  name: "Jatin Sharma",
  email: "jatin.sharma@example.com",
  phone: "+91 94844 84343",
  location: "India, Haryana",
  bloodType: "O-",
  allergies: ["Penicillin", "Nuts"],
  conditions: ["Asthma"],
  isOrganDonor: true,
  avatar: "https://i.pravatar.cc/150?img=1",
};

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error("Failed to load profile from storage:", e);
    }
    return DEFAULT_PROFILE;
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem("sos-user-preferences");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load preferences from storage:", e);
    }
    return {
      theme: "system",
      language: "en",
      timezone: "Asia/Kolkata",
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // Apply theme
    if (preferences.theme === "dark" || (preferences.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [profile, preferences]);

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePreferences = useCallback((updates) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateAvatar = useCallback((avatarUrl) => {
    setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        preferences,
        updateProfile,
        updatePreferences,
        updateAvatar,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}