const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 border-green-300";
      case "User Verified":
        return "bg-blue-100 text-blue-600 border-blue-300";
      case "Not Active":
        return "bg-gray-100 text-gray-600 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const getTrustColor = (trustLevel) => {
    return trustLevel === "Trusted"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-60 p-2 cursor-pointer hover:scale-104 transition-all ease-in hover:bg-zinc-200  flex flex-col gap-2 rounded-xl bg-white border-zinc-200 border-2 relative">
      
      <div className="flex justify-end">
        <span className={`text-[11px] px-2 py-0.5 max-w-fit border ${getStatusColor(contact.status)} rounded-full font-medium`}>
          {contact.status}
        </span>
      </div>

      
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="h-15 w-15 rounded-full bg-amber-200 overflow-hidden flex items-center justify-center">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              className="h-full w-full object-cover"
              alt="avatar"
            />
          ) : (
            <span className="text-xl font-bold text-amber-700">
              {getInitials(contact.name)}
            </span>
          )}
        </div>
        <span className="text-black font-medium text-sm mt-1 truncate w-full text-center px-1">
          {contact.name}
        </span>
      </div>

     
      <div className="w-full h-full bg-zinc-100 p-2 flex flex-col justify-between rounded-b-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400 w-24">Relationship:</span>
            <span className="font-medium text-gray-700 truncate">{contact.relationship}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400 w-24">Phone:</span>
            <span className="font-medium text-gray-700 truncate">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400 w-24">Email:</span>
            <span className="font-medium text-gray-700 truncate">{contact.email}</span>
          </div>
        </div>

 
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200">
          <span className={`px-2 py-1 text-xs font-bold rounded-full text-center ${getTrustColor(contact.trustLevel)}`}>
            {contact.trustLevel}
          </span>
          <div className="flex gap-1">
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 hover:border-zinc-400 transition"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;