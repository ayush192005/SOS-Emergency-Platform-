import Image from "../assets/Avatar.webp";
import {Smartphone,Tablet} from 'lucide-react'
const Settings = () => {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-white rounded-2xl md:rounded-3xl m-3 p-3   sm:p-4 md:p-5">
      <span className="text-3xl font-bold">Settings</span>

      {/* Card Container */}
      <div className="py-4 flex flex-col gap-3">
        {/* Card 1 */}
        <div className="w-full  bg-zinc-100 border-2 p-2 border-gray-200 rounded-lg ">
          <h1 className=" font-bold border-b-2 pb-2 border-zinc-200">
            Personal Information
          </h1>

          {/* Profile Picture */}
          <div className="px-2 py-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={Image}
                  alt="profile Image"
                />
              </div>
              <button className="border-2 border-zinc-300 text-xs px-1 h-[25px] font-bold rounded-lg">
                Change
              </button>
            </div>

            {/* Input Section */}
            <div className="w-full flex flex-col md:flex-row justify-between gap-2 ">
              <div className="w-full flex flex-col gap-1">
                <span className="text-sm font-bold">Name</span>
                <input
                  className="bg-zinc-100 border-2 border-zinc-300  rounded-sm px-1 py-1 text-sm"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex  w-full flex-col gap-1">
                <span className="text-sm font-bold">Email</span>
                <input
                  className="bg-zinc-100 border-2 border-zinc-300 rounded-sm px-1 py-1 text-sm"
                  type="text"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full bg-zinc-100 border-2 p-2 border-gray-200 rounded-lg ">
          <h1 className=" font-bold border-b-2 pb-2 border-zinc-200">
            Perferences
          </h1>

          {/* Input Section */}
          <div className="w-full flex flex-col md:flex-row justify-between gap-2 py-6 ">
            <div className="w-full flex flex-col gap-1">
              <span className="text-sm font-bold">Theme</span>
              <select className="bg-zinc-100 border-2 border-zinc-300 rounded-sm px-1 py-1 text-sm">
                <option value="">Select Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="text-sm font-bold">Language</span>
              <select className="bg-zinc-100 border-2 border-zinc-300 rounded-sm px-1 py-1 text-sm">
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="flex  w-full flex-col gap-1">
              <span className="text-sm font-bold">Timezone</span>
              <select className="bg-zinc-100 border-2 border-zinc-300 rounded-sm px-1 py-1 text-sm">
                <option value="">Select Timezone</option>
                <option value="Asia/Kolkata">India (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Connect Account */}
        <div className="w-full bg-zinc-100 border-2 p-2 border-gray-200 rounded-lg ">
          <h1 className=" font-bold border-b-2 pb-2 border-zinc-200">
            Connected Accounts
          </h1>

          <div>
            {/* Google */}
            <div className="flex flex-col md:flex-row gap-2 justify-between px-2 py-3">
              <div className="flex items-center gap-2 ">
                <div className="h-5 w-5 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="https://imgs.search.brave.com/RZxELxZzJs3qJxJE1avulBEXKTFOvZRmP_DxThI15wU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDkvR29vZ2xlLVN5/bWJvbC03MDB4Mzk0/LnBuZw"
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-xs ">
                  <span className="font-bold">Google</span>
                <span className="text-zinc-500">Connect as parveen23@gmail.com</span>
                </div>
              </div>
              <button className="bg-zinc-200 px-2 py-1 rounded-sm cursor-pointer text-sm font-bold">Disconnect</button>
            </div>
            {/* Github */}
              <div className="flex flex-col md:flex-row gap-2 justify-between px-2 py-3">
              <div className="flex items-center gap-2 ">
                <div className="h-5 w-5 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="https://imgs.search.brave.com/HptZnS3VcG7zfu11o2nDL79HtA-x6VnLBZBXXte3epc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdpdGh1Yi1pY29u/LXN2Zy1kb3dubG9h/ZC1wbmctMjI2MDk2/LnBuZz9mPXdlYnAm/dz0xMjg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col text-xs ">
                  <span className="font-bold">GitHub</span>
                <span className="text-zinc-500">Connect as parveenth</span>
                </div>
              </div>
              <button className="bg-zinc-200 px-2 py-1 rounded-sm cursor-pointer text-sm font-bold">Disconnect</button>
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="w-full bg-zinc-100 border-2 p-2 border-gray-200 rounded-lg ">
          <h1 className=" font-bold border-b-2 pb-2 border-zinc-200">
            Devices
          </h1>

           <div>
            {/* Iphone */}
            <div className="flex flex-col gap-2 md:flex-row  justify-between px-2 py-3">
              <div className="flex items-center gap-2 ">
             <span> <Smartphone strokeWidth={2} size={18}/></span>
                <div className="flex flex-col text-xs ">
                  <span className="font-bold">iphone 14 Pro</span>
                <span className="text-zinc-500">Last Used 2 Days ago</span>
                </div>
              </div>
              <button className="bg-zinc-200 px-2 rounded-sm cursor-pointer py-1 text-sm font-bold">Remove</button>
            </div>
            {/* SuperFace pro */}
               <div className="flex flex-col gap-2  md:flex-row  justify-between px-2 py-3">
              <div className="flex items-center gap-2 ">
             <span> <Tablet strokeWidth={2} size={18}/></span>
                <div className="flex flex-col text-xs ">
                  <span className="font-bold">Surface Pro 8</span>
                <span className="text-zinc-500">Last Used 1 Week ago</span>
                </div>
              </div>
              <button className="bg-zinc-200 px-2 rounded-sm cursor-pointer py-1 text-sm font-bold">Remove</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
