
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SiteLogo from "../components/SiteLogo";

import {
  Search,
  LayoutDashboard,
  MapPin,
  Siren,
  Contact,
  User,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const SlideBar = () => {
  const [IsOpen, SetIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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

  // Filter navigation pages based on search input
  const filteredNavbar = navbar.filter((item) =>
    item.icons_name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Navigate to selected search result
  const handleSearchResult = (path) => {
    navigate(path);
    setSearch("");
  };

  return (
    <div
      className={`hidden md:flex bg-black shrink-0 gap-2 px-2 py-3
      flex-col justify-between transition-all duration-300
      ${IsOpen ? "w-60" : "w-20"}`}
    >
      {/* Logo + Search Bar + Menu */}
      <div className="flex flex-col gap-3">

        {/* Logo */}
        <div
          className={`flex p-3 items-center gap-6 ${
            IsOpen ? "justify-start" : "justify-center"
          }`}
        >
          <SiteLogo />

          {IsOpen && (
            <span className="text-white text-xl font-bold whitespace-nowrap">
              SafeGuard
            </span>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative flex flex-col w-full">
          <div
            className={`flex items-center gap-3 p-2 rounded-3xl transition-all duration-300
            ${
              IsOpen
                ? "bg-zinc-800 w-full"
                : "justify-center w-full"
            }`}
          >
            <Search
              strokeWidth={1.5}
              size={22}
              className="text-white shrink-0"
            />

            {IsOpen && (
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Here..."
                className="text-white bg-transparent outline-none text-sm w-full min-w-0"
              />
            )}
          </div>

          {/* Search Results */}
          {IsOpen && search.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-lg">

              {filteredNavbar.length > 0 ? (
                filteredNavbar.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleSearchResult(item.path)}
                      className="flex items-center gap-3 w-full p-2 text-white hover:bg-red-900 rounded-lg text-sm transition-colors"
                    >
                      <Icon size={18} />
                      <span>{item.icons_name}</span>
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-400 text-sm p-2">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Main Menu */}
        <div className="flex flex-col gap-2">

          {IsOpen && (
            <span className="text-[#7F8487] text-sm whitespace-nowrap">
              Main Menu
            </span>
          )}

          {navbar.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex gap-3 p-2 items-center hover:to-blue-300 transition-all duration-200 rounded-3xl
                  ${IsOpen ? "justify-start" : "justify-center"}
                  ${isActive ? "bg-red-500" : "hover:bg-red-900"}`
                }
              >
                <Icon
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

      {/* Toggle Sidebar */}
      <div
        className={`flex p-3 ${
          IsOpen ? "justify-start" : "justify-center"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            SetIsOpen(!IsOpen);
            setSearch("");
          }}
          aria-label={IsOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
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
