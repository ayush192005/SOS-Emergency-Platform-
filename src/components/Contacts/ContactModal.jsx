import { useState, useEffect, useMemo } from "react";
import { X, User, Phone, Mail, Users, Shield, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const RELATIONSHIPS = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Wife",
  "Husband",
  "Son",
  "Daughter",
  "Friend",
  "Colleague",
  "Cousin",
  "Other",
];

const TRUST_LEVELS = [
  { value: "Trusted", label: "Trusted", color: "bg-green-100 text-green-700" },
  { value: "Not Trusted", label: "Not Trusted", color: "bg-red-100 text-red-700" },
];

const ContactModal = ({ isOpen, onClose, contact, onSave }) => {
  
  const initialFormData = useMemo(() => {
    if (contact) {
      return {
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        relationship: contact.relationship || "Friend",
        trustLevel: contact.trustLevel || "Trusted",
        avatar: contact.avatar || "",
      };
    }
    return {
      name: "",
      phone: "",
      email: "",
      relationship: "Friend",
      trustLevel: "Trusted",
      avatar: "",
    };
  }, [contact]);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const avatarPreview = formData.avatar;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setFormData((prev) => ({ ...prev, avatar: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Name and phone are required");
      return;
    }
    onSave(formData);
  };

  const generateAvatar = () => {
    const name = formData.name.trim() || "User";
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ef4444&color=fff&size=150`;
    setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-2 border-zinc-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {contact ? "Edit Contact" : "Add New Contact"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-100 transition text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-zinc-200 overflow-hidden bg-zinc-100 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-zinc-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="sr-only"
                />
                <span className="text-xs font-medium">Change</span>
              </label>
            </div>
            <button
              type="button"
              onClick={generateAvatar}
              disabled={!formData.name.trim()}
              className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate from name
            </button>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
              />
            </div>
          </div>

          {/* Relationship */}
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition appearance-none bg-white"
              >
                {RELATIONSHIPS.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Trust Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trust Level</label>
            <div className="grid grid-cols-2 gap-2">
              {TRUST_LEVELS.map((level) => (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, trustLevel: level.value }))}
                  className={cn(
                    "p-3 rounded-xl border-2 text-sm font-medium transition",
                    formData.trustLevel === level.value
                      ? "border-red-500 bg-red-50"
                      : "border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", level.color)}>
                      {level.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-zinc-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              {contact ? "Save Changes" : "Add Contact"}
            </button>
          </div>

          {contact && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this contact?")) {
                  // Delete handled by parent
                  onClose();
                }
              }}
              className="w-full px-4 py-2.5 border-2 border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Contact
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;