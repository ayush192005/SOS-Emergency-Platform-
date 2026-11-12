import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import {ContactDataProvider} from "./context/ContactDataContext";

import MobileNav from "./components/MobileNav";
import SlideBar from "./Components/SlideBar";
import Emergency from "./pages/Emergency";
import Location from "./pages/Location";
import Settings from "./pages/Settings";
import Contact from "./pages/Contacts";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const location = useLocation();
  const isNotFound = ![
    "/",
    "/dashboard",
    "/emergency",
    "/location",
    "/contact",
    "/profile",
    "/settings",
  ].includes(location.pathname);

  return (
    <ContactDataProvider>
      <div className="min-h-screen w-full flex">
        {!isNotFound && <SlideBar />}

        <div className="flex-1 min-w-0">
          {!isNotFound && <MobileNav />}

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/location" element={<Location />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </ContactDataProvider>
  );
};

export default App;
