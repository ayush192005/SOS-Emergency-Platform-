import { useState } from "react";
import SiteLogo from "../components/SiteLogo";
import { NavLink } from "react-router-dom";
import {Search, LayoutDashboard, MapPin,  Siren, Contact, User,  Settings} from "lucide-react";
import { PanelLeftClose } from "lucide-react";
import { PanelLeftOpen } from "lucide-react";

const SlideBar = () => {
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

  const [IsOpen, SetIsOpen] = useState(false);

  return (
    <div
      className={`hidden md:flex bg-black shrink-0 gap-2 px-2 py-3
      flex-col justify-between transition-all duration-300
      ${IsOpen ? "w-60" : "w-20"}`}
    >
      {/* Logo + Search Bar + Menu Bars */}
      <div className="flex flex-col gap-3">
        {/* Logo */}
        <div
          className={`flex p-3 items-center gap-6 ${IsOpen ? "justify-start" : "justify-center"}`}
        >
          <SiteLogo />
          {IsOpen && (
            <span className="text-white text-xl font-bold whitespace-nowrap">
              SafeGuard
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex w-full">
          <div
            className={`flex items-center gap-4 p-2 rounded-3xl transition-all duration-300
       ${IsOpen ? "bg-zinc-800 w-full" : "justify-center w-full"}`}
          >
            <Search
              strokeWidth={1.5}
              size={22}
              className="text-white shrink-0"
            />
            {IsOpen && (
              <input
                placeholder="Search Here..."
                className="text-white outline-none whitespace-nowrap text-sm"
              ></input>
            )}
          </div>
        </div>

        {/* Main Menu */}
        <div className=" flex flex-col gap-2 ">
          {IsOpen && (
            <span className="text-[#7F8487] text-sm whitespace-nowrap">
              Main Menu
            </span>
          )}

          {navbar.map((item, idx) => {
            const Icons = item.icon;

            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({isActive}) =>
                  `w-full flex gap-3 p-2 items-center hover:to-blue-300 transition-all duration-200 rounded-3xl
                  ${IsOpen ? "justify-start" : "justify-center"}
                  ${isActive ? "bg-red-500 " : "hover:bg-red-900"}`
                }
              >
                <Icons
                  strokeWidth={2}
                  size={22}
                  className="text-white shrink-0"
                />
                {IsOpen && (
                  <span className="text-white whitespace-nowrap">
                    {item.icons_name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Toogle */}
      <div
        className={`flex justify-center p-3 ${IsOpen ? "justify-start" : "justify-center"}`}
      >
        <button onClick={() => SetIsOpen(!IsOpen)}>
          {IsOpen ? (
            <PanelLeftClose className="text-white" size={20} />
          ) : (
            <PanelLeftOpen className="text-white" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SlideBar;
