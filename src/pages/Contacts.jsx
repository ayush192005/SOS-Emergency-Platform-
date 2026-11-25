import { useContext, useState } from "react";
import { ContactContext } from "../context/ContactDataContext";
import ContactCard from "../components/Contacts/ContactCard";
import ContactModal from "../components/Contacts/ContactModal";
import { Plus, Search, Users, Shield, Filter, User, Phone } from "lucide-react";

const Contacts = () => {
  const { userContact, addContact, updateContact, deleteContact, getTrustedContacts } = useContext(ContactContext);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrust, setFilterTrust] = useState("all");

  const handleAddContact = () => {
    setEditingContact(null);
    setShowContactModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowContactModal(true);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(id);
    }
  };

  const filteredContacts = userContact.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.relationship.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrust =
      filterTrust === "all" || contact.trustLevel === filterTrust;

    return matchesSearch && matchesTrust;
  });

  const trustedContacts = getTrustedContacts();

  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-zinc-100 rounded-2xl md:rounded-3xl m-3 py-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Emergency Contacts</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your trusted emergency contacts
            </p>
          </div>
          <button
            onClick={handleAddContact}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterTrust}
              onChange={(e) => setFilterTrust(e.target.value)}
              className="px-4 py-2.5 border-2 border-zinc-300 rounded-xl text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition bg-white"
            >
              <option value="all">All Contacts</option>
              <option value="Trusted">Trusted Only</option>
              <option value="Not Trusted">Not Trusted</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userContact.length}</p>
                <p className="text-xs text-gray-500">Total Contacts</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{trustedContacts.length}</p>
                <p className="text-xs text-gray-500">Trusted</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userContact.length - trustedContacts.length}</p>
                <p className="text-xs text-gray-500">Not Trusted</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{userContact.filter(c => c.phone).length}</p>
                <p className="text-xs text-gray-500">With Phone</p>
              </div>
            </div>
          </div>
        </div>

        <div id="cardFrame" className="h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center overflow-auto">
          {filteredContacts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No contacts found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchQuery || filterTrust !== "all"
                  ? "Try adjusting your search or filter"
                  : "Add your first emergency contact"}
              </p>
              {!searchQuery && filterTrust === "all" && (
                <button
                  onClick={handleAddContact}
                  className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition"
                >
                  Add Contact
                </button>
              )}
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={() => handleEditContact(contact)}
                onDelete={() => handleDeleteContact(contact.id)}
              />
            ))
          )}
        </div>
      </div>

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contact={editingContact}
        onSave={(data) => {
          if (editingContact) {
            updateContact(editingContact.id, data);
          } else {
            addContact(data);
          }
          setShowContactModal(false);
        }}
      />
    </div>
  );
};

export default Contacts;