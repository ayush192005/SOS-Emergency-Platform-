import Image from "../assets/Avatar.webp";
import {useNavigate} from "react-router-dom"
import {
  ShieldCheck,
  Phone,
  MapPin,
  HeartPulse,
  ChevronRight,
} from "lucide-react";

const Profile = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl m-3 overflow-hidden ">
    
      {/* Banner */}
      <div className="relative flex flex-col ">
        <div className="w-full h-36  relative">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1762503203754-62c5a0c969d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt=""
          />
        </div>

        {/* Image */}
        <div className="flex justify-end py-2 px-4">
          <div className="absolute  left-5 top-26 sm:left-5 sm:top-20">
            <div className="h-24 w-24 shadow-2xl   sm:h-30 sm:w-30 rounded-full border-6 border-white  overflow-hidden">
              <img className="w-full h-full object-cover" src={Image} alt="" />
            </div>

            <span className="absolute h-4 w-4 top-15 sm:top-20 right-0 bg-green-500 rounded-full "></span>
          </div>

          {/* Protection Status */}
          <div className="flex gap-1 flex-col items-end ">
            <span className="text-xs text-zinc-400 font-bold ">
              Protection Status
            </span>
            <span className="bg-green-200 px-3 py-1.5 text-xs text-green-600 inline-flex items-center gap-1.5 rounded-3xl font-bold">
              <ShieldCheck strokeWidth={2} /> System Active
            </span>
          </div>
        </div>

        {/* Profile Content Area */}
        <div className="w-full mt-7 px-6 flex flex-col gap-10">
         <div className="w-full flex flex-col md:items-center sm:justify-between md:flex-row gap-4">
            <div className="flex flex-col  gap-1">
              <span className="text-3xl font-bold">Jatin Sharma</span>
              <div className="flex flex-col md:flex-row gap-1.5 text-gray-500">
                <span className="flex items-center gap-1">
                  <Phone strokeWidth={2} size={16} className="text-red-600 " />{" "}
                  ICE: +91 94844 84343
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin strokeWidth={2} size={14} className="" />
                  India, Harayan
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-red-600 rounded-3xl  cursor-pointer px-4 py-1 text-white">
                {" "}
                Test SOS
              </button>
              <button onClick={() => navigate("/settings")}
               className="bg-gray-200 border-2  cursor-pointer  border-gray-300 rounded-3xl px-4 py-1">
                Settings
              </button>
            </div>
          </div>

          {/* Blood Badges */}
          <div className="text-gray-600 flex lg:justify-between flex-col lg:flex-row gap-4">
            <div className="flex gap-1 items-center text-sm">
              <HeartPulse
                strokeWidth={2}
                size={15}
                className="text-red-600"
              />{" "}
              MEDICAL & HEALTH BAGES
            </div>
            <div className="flex flex-wrap w-fit gap-1">
              <span className="px-3 py-1 text-nowrap bg-red-200 rounded-3xl text-red-500 font-bold text-sm">
                Blood Type: O-
              </span>
              <span className="px-3 py-1 text-nowrap bg-amber-100 rounded-3xl text-amber-700 font-bold text-sm">
                Asthma
              </span>
              <span className="px-3 py-1  text-nowrap bg-blue-200 rounded-3xl text-blue-700 font-bold text-sm">
                Penicillin Allergy
              </span>
              <span className="px-3 py-1  text-nowrap bg-zinc-200 rounded-3xl text-zinc-500 font-bold text-sm">
                {" "}
                Organ Donor
              </span>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
            <div className="w-full max-w-80  min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-sm">Trusted Contacts</span>
                <span className="text-sm text-zinc-500">
                  3 People Linked for alerts{" "}
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <span>
                  <ChevronRight strokeWidth={2} />
                </span>
              </div>
            </div>

            <div className="w-full max-w-80  min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-sm">Trusted Contacts</span>
                <span className="text-sm text-zinc-500">
                  3 People Linked for alerts{" "}
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <span>
                  <ChevronRight strokeWidth={2} />
                </span>
              </div>
            </div>

            <div className="w-full max-w-80  min-h-20 bg-gray-100 rounded-2xl flex justify-between p-3 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-sm">Trusted Contacts</span>
                <span className="text-sm text-zinc-500">
                  3 People Linked for alerts{" "}
                </span>
              </div>
              <div className="h-8 w-8 bg-zinc-200 p-3 rounded-full flex items-center justify-center">
                <span>
                  <ChevronRight strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
