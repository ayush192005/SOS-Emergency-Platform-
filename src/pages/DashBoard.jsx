import NotificationButton from "../components/NotificationButton";
import { useContext } from "react";
import { ContactContext } from "../context/ContactDataContext";
import alertHistory from "../data/alertHistoryData";
import MapView from "../components/Map/MapView";
import { Siren } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";

const DashBoard = () => {
  const { userContact } = useContext(ContactContext);

  return (
    <div
      id="dashboard"
      className="h-[calc(100vh-1.5rem)] flex flex-col gap-4 overflow-y-auto bg-white rounded-2xl md:rounded-3xl m-3 p-2 sm:p-4 md:p-5"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start px-4 md:items-center">
        {/* Welcome Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-['Sintony']">
            Welcome Back, <span className="font-bold">George!</span>
          </h2>

          <p className="text-sm text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Notification + Avatar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto min-w-0">
          {/* Bell */}
          <div className="hidden sm:block">
            <NotificationButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid sm:grid-cols-1 lg:grid-cols-12 p-4 gap-2 ">
        {/* Contact Board */}
        <div className="lg:col-span-7 bg-white border-2 border-zinc-300 shadow-lg rounded-2xl">
          {/* Card Heading */}
          <div className="flex justify-between items-center p-2">
            <span className="font-bold text-xl text-black">
              Emergency Contacts ({userContact.length}) Contact
            </span>
            <div className="flex gap-2">
              <button className="bg-black text-white p-2 text-xs font-bold border-2 border-black cursor-pointer rounded-xl ">
                Add
              </button>
              <button className="bg-white text-zinc-500 p-2 text-xs font-bold border-2 rounded-xl cursor-pointer ">
                Edit
              </button>
            </div>
          </div>
          {/* 3 contact list */}
          <div className="flex cursor-pointer flex-col py-2">
            {userContact.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="bg-white border-b-2 border-gray-300 p-2 flex flex-wrap justify-between hover:bg-gray-200 items-center"
              >
                <div className="flex gap-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.avatar}
                    alt="avatar"
                  />
                  <div className="">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm font-bold text-gray-500">
                      {item.relationship}
                    </p>
                  </div>
                </div>
                <div>
                  <span>Phone</span>
                  <p className="text-sm ">{item.phone}</p>
                </div>

                <div>
                  <span>Location</span>
                  <p className="text-yellow-400">Pending</p>
                </div>

                <span
                  className={`bg-green-300 text-sm shrink-0 px-2 py-1 text-green-800 font-bold rounded-4xl
                   ${item.trustLevel === "Trusted" ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}`}
                >
                  {item.trustLevel}
                </span>
              </div>
            ))}
          </div>

          {/* Add Contact Button  */}
          <div className="p-2 ">
            <button className="w-full cursor-pointer  bg-white border-2 border-zinc-400 py-1 hover:bg-zinc-200 rounded-lg">
              + Add Contact
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 bg-red-50 border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <div className="relative flex items-center justify-center w-100 h-100 mx-auto">
            {/* Animated Waves */}
            <Ripple
              mainCircleSize={60}
              mainCircleOpacity={0.25}
              numCircles={5}
              className="[&_div]:border-red-600 [&_div]:bg-red-600/20"
            />

            {/* SOS Button */}
            <button className="relative z-10 h-30 w-30 rounded-full bg-red-600 text-white shadow-xl flex flex-col items-center justify-center gap-1 hover:bg-red-700 active:scale-95 transition">
              <Siren size={36} />
              <span className="font-bold text-2xl">SOS</span>
            </button>
          </div>
        </div>

        {/* Medical ID */}
        <div className="lg:col-span-6 bg-white border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <h2 className="font-bold text-lg ">My Medical ID</h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
            {/* Health Information */}
            <div>
              <h2 className="font-bold text-lg">Health Information</h2>
              <div className="flex flex-col">
                <span className="text-sm">Blood Type</span>
                <span className="font-bold">O+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Allergies</span>
                <span className="font-bold">Penicillin, Nuts</span>
              </div>
            </div>
            {/* Emergency Contact */}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg">Emergency Contact</h2>
              <div className="flex flex-col">
                <span className="text-sm">Primary Contact</span>
                <span className="font-bold">Father</span>
              </div>
            </div>
          </div>
          {/* Insurance Details */}
          <div>
            <h2 className="font-bold text-lg">Insurance Details</h2>
            <div className="flex flex-col">
              <span className="text-sm">Provider</span>
              <span className="font-bold">Aetna</span>
              <span className="text-sm">Insurance ID</span>
              <span>ID#...</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border-2 border-zinc-300 shadow-lg flex flex-col  gap-3 p-3 rounded-2xl">
          <div className="w-full overflow-hidden">
            <h2 className="font-bold text-lg">Alert History & Safe Zone</h2>
            <div className=" w-full h-100 rounded-2xl bg-white border-2 border-zinc-300 flex flex-col gap-1 overflow-auto">
              {alertHistory.map((alert) => (
                <div
                  key={alert.id}
                  className="border-b-2 p-1 hover:bg-zinc-200  border-b-zinc-200"
                >
                  <span>{alert.history}</span>
                  <span>
                    ({alert.date} {alert.time}) -
                  </span>
                  <span>{alert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Alert History & Safe Zone */}
        <div className="lg:col-span-12  w-full p-3 bg-white border-2 border-zinc-300  shadow-lg flex flex-col sm:flex-row gap-3 justify-between rounded-2xl">
          {/* Map */}
          <div className="w-full overflow-hidden">
            <h2 className="font-bold text-lg">Define Safe Zones</h2>
            <div className="rounded-2xl h-100 w-full overflow-hidden">
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
