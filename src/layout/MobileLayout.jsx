import MobileNav from "../components/MobileNav"
import DashBoard from "../Pages/DashBoard"

const MobileLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-amber-600">
      <MobileNav />
      <DashBoard />
    </div>
  )
}

export default MobileLayout
