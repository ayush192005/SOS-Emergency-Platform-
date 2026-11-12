import MapView from "../components/Map/MapView";
import { MapPin, ShieldCheck } from "lucide-react";

const Location = () => {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl flex flex-col gap-4 m-3 p-4 sm:p-5 md:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Location</h1>
          <p className="text-sm">Track and manage your current location</p>
        </div>
        <div>
          <span className="bg-green-300  rounded-3xl font-bold p-3 text-sm text-green-600">
            GPS Active
          </span>
        </div>
      </div>

      <div className="flex justify-between w-1/2 ">
        <div className="flex flex-col gap-1">
          <MapPin className="text-green-400" strokeWidth={2} />
          <span className="font-bold text-xl">Current Location</span>
          <span className="text-sm">Location detected</span>
        </div>
        <div className="flex flex-col gap-1">
          <ShieldCheck  className="text-green-400" strokeWidth={2} />
          <span className="font-bold text-xl">Safe Zone</span>
          <span className="text-sm">Monitoring status</span>
        </div>
      </div>

      <div className="w-full h-100">
        <MapView />
      </div>
    </div>
  );
};

export default Location;
