import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <div className="bg-gray-200 p-2 rounded-full cursor-pointer shrink-0">
      <Bell strokeWidth={2} size={18} />
    </div>
  );
};

export default NotificationButton;
