import { Siren } from "lucide-react";
import { Ripple } from "@/components/ui/ripple";
const Emergency = () => {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl flex flex-col gap-3 m-3 p-4 sm:p-5 md:p-6">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Emergency Dashboard</h1>
      </div>
      <div className="relative flex items-center justify-center w-120 h-120 mx-auto">
        {/* Animated Waves */}
        <Ripple
          mainCircleSize={200}
          mainCircleOpacity={0.25}
          numCircles={5}
          className="[&_div]:border-red-600 [&_div]:bg-red-600/20"
        />

        {/* SOS Button */}
        <button className="relative z-10 h-50 w-50 rounded-full bg-red-600 text-white shadow-xl flex flex-col items-center justify-center gap-1 hover:bg-red-700 active:scale-95 transition">
          <Siren size={36} />
          <span className="font-bold text-2xl">SOS</span>
        </button>
      </div>

      {/* Instructions */}
      <p className="text-sm text-gray-500 font-medium text-center">
        Press and hold the SOS button for{" "}
        <span className="text-red-600 font-bold">2 seconds</span> to broadcast
        location.
      </p>
    </div>
  );
};

export default Emergency;
