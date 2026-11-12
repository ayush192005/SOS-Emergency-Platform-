import { Outlet } from "react-router-dom";
import SlideBar from "../components/SlideBar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SlideBar />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
