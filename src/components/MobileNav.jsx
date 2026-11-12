import SiteLogo from "../components/SiteLogo";
import {
  LayoutDashboard,
  MapPin,
  Siren,
  Contact,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import NotificationButton from "./NotificationButton";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  const [SlideLeft, SetSlideLeft] = useState(false);
  const [IsOpen, SetIsOpen] = useState(false);
  const navbar = [
    {
      icon: LayoutDashboard,
      icons_name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Siren,
      icons_name: "Emergency",
      path: "/emergency",
    },
    {
      icon: MapPin,
      icons_name: "Location",
      path: "/location",
    },
    {
      icon: Contact,
      icons_name: "Contact",
      path: "/contact",
    },
    {
      icon: User,
      icons_name: "Profile",
      path: "/profile",
    },
    {
      icon: Settings,
      icons_name: "Settings",
      path: "/settings",
    },
  ];
  return (
    <>
      <nav className="md:hidden w-full bg-black sticky top-0 h-16 flex justify-between items-center px-3">
        <SiteLogo />
        <div className="flex items-center gap-3">
          <div className="block sm:hidden">
            <NotificationButton />
          </div>

          <button onClick={() => SetSlideLeft(!SlideLeft)}>
            {SlideLeft ? (
              <X strokeWidth={2} className="text-white cursor-pointer" />
            ) : (
              <Menu strokeWidth={2} className="text-white cursor-pointer" />
            )}
          </button>
        </div>
      </nav>

      {SlideLeft && (
        <div
          onClick={() => SetSlideLeft(false)}
          className="fixed inset-x-0 top-16 bottom-0 bg-black/50 z-30"
        />
      )}

      <div>
        {SlideLeft && (
          <div
            className={`fixed top-16 right-0 bottom-0 w-72 max-w-[85vw] bg-black z-40 p-5
             transition-transform duration-300 ease-in-out
               ${SlideLeft ? "translate-x-0" : "translate-x-full"}`}
          >
            <NavLink>
              <div className="h-full w-full bg-black flex flex-col gap-4">
                {navbar.map((item, idx) => {
                  const Icons = item.icon;

                  return (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={() => SetIsOpen(false)}
                      className={({ isActive }) => 
                        `flex items-center gap-3 p-3 rounded-3xl text-white
                         ${isActive ? "bg-red-600" : "hover:bg-red-900"}`
                      }
                    >
                      <Icons
                        strokeWidth={2}
                        size={22}
                        className="text-white shrink-0"
                      />
                     <span>{item.icons_name}</span>
                    </NavLink>
                  );
                })}
              </div>  
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNav;
