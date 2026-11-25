
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

                    <Route
                      path="/dashboard"
                      element={<DashBoard />}
                    />

                    <Route
                      path="/emergency"
                      element={<Emergency />}
                    />

                    <Route
                      path="/location"
                      element={<Location />}
                    />

                    <Route
                      path="/contact"
                      element={<Contact />}
                    />

                    <Route
                      path="/profile"
                      element={<Profile />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings />}
                    />

                    <Route
                      path="*"
                      element={<NotFoundPage />}
                    />
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
