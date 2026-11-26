
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ContactDataProvider } from "./context/ContactDataContext";
import { AlertProvider } from "./context/AlertContext";
import { SafeZoneProvider } from "./context/SafeZoneContext";
import { SOSProvider } from "./context/SOSContext";
import { UserProfileProvider } from "./context/UserProfileContext";

import MobileNav from "./components/MobileNav";
import SlideBar from "./components/SlideBar";

import Emergency from "./pages/Emergency";
import Location from "./pages/Location";
import Settings from "./pages/Settings";
import Contact from "./pages/Contacts";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const location = useLocation();

  const validRoutes = [
    "/",
    "/dashboard",
    "/emergency",
    "/location",
    "/contact",
    "/profile",
    "/settings",
  ];

  const isNotFound = !validRoutes.includes(location.pathname);

  // Temporary backend connection test
  const testBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Ayush",
          message: "Hello from React",
        }),
      });

      const data = await response.json();

      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Backend connection failed:", error);
    }
  };

  return (
    <ContactDataProvider>
      <AlertProvider>
        <SafeZoneProvider>
          <SOSProvider>
            <UserProfileProvider>
              <div className="min-h-screen w-full flex">
                {!isNotFound && <SlideBar />}

                <div className="flex-1 min-w-0">
                  {!isNotFound && <MobileNav />}

                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />

                    <Route path="/dashboard" element={<DashBoard />} />

                    <Route path="/emergency" element={<Emergency />} />

                    <Route path="/location" element={<Location />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/profile" element={<Profile />} />

                    <Route path="/settings" element={<Settings />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </div>
              </div>
            </UserProfileProvider>
          </SOSProvider>
        </SafeZoneProvider>
      </AlertProvider>
    </ContactDataProvider>
  );
};

export default App;
