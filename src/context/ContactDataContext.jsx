import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

const STORAGE_KEY = "sos-emergency-contacts";

const INITIAL_CONTACTS = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul.sharma@gmail.com",
    relationship: "Brother",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Active",
    trustLevel: "Trusted",
    isPrimary: false,
  },
  {
    id: 2,
    name: "Priya Verma",
    phone: "+91 9876543211",
    email: "priya.verma@gmail.com",
    relationship: "Sister",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "Not Active",
    trustLevel: "Trusted",
    isPrimary: false,
  },
  {
    id: 3,
    name: "Amit Kumar",
    phone: "+91 9876543212",
    email: "amit.kumar@gmail.com",
    relationship: "Friend",
    avatar: "https://i.pravatar.cc/150?img=13",
    status: "User Verified",
    trustLevel: "Not Trusted",
    isPrimary: false,
  },
  {
    id: 4,
    name: "Neha Gupta",
    phone: "+91 9876543213",
    email: "neha.gupta@gmail.com",
    relationship: "Mother",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "Active",
    trustLevel: "Trusted",
    isPrimary: false,
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "+91 9876543214",
    email: "vikram.singh@gmail.com",
    relationship: "Father",
    avatar: "https://i.pravatar.cc/150?img=14",
    status: "User Verified",
    trustLevel: "Trusted",
    isPrimary: false,
  },
  {
    id: 6,
    name: "Anjali Mehta",
    phone: "+91 9876543215",
    email: "anjali.mehta@gmail.com",
    relationship: "Friend",
    avatar: "https://i.pravatar.cc/150?img=45",
    status: "Not Active",
    trustLevel: "Not Trusted",
    isPrimary: false,
  },
  {
    id: 7,
    name: "Karan Malhotra",
    phone: "+91 9876543216",
    email: "karan.malhotra@gmail.com",
    relationship: "Cousin",
    avatar: "https://i.pravatar.cc/150?img=15",
    status: "Active",
    trustLevel: "Not Trusted",
    isPrimary: false,
  },
  {
    id: 8,
    name: "Sneha Kapoor",
    phone: "+91 9876543217",
    email: "sneha.kapoor@gmail.com",
    relationship: "Wife",
    avatar: "https://i.pravatar.cc/150?img=48",
    status: "User Verified",
    trustLevel: "Trusted",
    isPrimary: false,
  },
  {
    id: 9,
    name: "Rohit Yadav",
    phone: "+91 9876543218",
    email: "rohit.yadav@gmail.com",
    relationship: "Colleague",
    avatar: "https://i.pravatar.cc/150?img=16",
    status: "Not Active",
    trustLevel: "Not Trusted",
    isPrimary: false,
  },
  {
    id: 10,
    name: "Pooja Sharma",
    phone: "+91 9876543219",
    email: "pooja.sharma@gmail.com",
    relationship: "Friend",
    avatar: "https://i.pravatar.cc/150?img=49",
    status: "Active",
    trustLevel: "Trusted",
    isPrimary: false,
  },
];

export const ContactContext = createContext(null);

export const ContactDataProvider = ({ children }) => {
  // Load contacts from localStorage
  const [userContact, setUserContact] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsedContacts = JSON.parse(stored);

        if (Array.isArray(parsedContacts)) {
          // Ensure only one contact can be primary
          let primaryFound = false;

          return parsedContacts.map((contact) => {
            const isPrimary = contact.isPrimary === true && !primaryFound;

            if (isPrimary) {
              primaryFound = true;
            }

            return {
              ...contact,
              isPrimary,
            };
          });
        }
      }
    } catch (error) {
      console.error("Failed to load contacts:", error);
    }

    return INITIAL_CONTACTS;
  });

  // Save contacts whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userContact));
    } catch (error) {
      console.error("Failed to save contacts:", error);
    }
  }, [userContact]);

  // Add a new contact
  const addContact = useCallback((contact) => {
    const newContact = {
      ...contact,
      id: Date.now(),
      isPrimary: false,
      status: "Active",
      trustLevel: "Trusted",
    };

    setUserContact((prev) => [...prev, newContact]);

    return newContact;
  }, []);

  // Update an existing contact
  const updateContact = useCallback((id, updates) => {
    setUserContact((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, ...updates, id: contact.id }
          : contact
      )
    );
  }, []);

  // Delete a contact
  const deleteContact = useCallback((id) => {
    setUserContact((prev) =>
      prev.filter((contact) => contact.id !== id)
    );
  }, []);

  // Select primary contact
  const setPrimaryContact = useCallback((id) => {
    setUserContact((prev) =>
      prev.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  }, []);

  // Get primary contact
  const getPrimaryContact = useCallback(() => {
    return userContact.find((contact) => contact.isPrimary === true) || null;
  }, [userContact]);

  // Get trusted contacts
  const getTrustedContacts = useCallback(() => {
    return userContact.filter(
      (contact) => contact.trustLevel === "Trusted"
    );
  }, [userContact]);

  return (
    <ContactContext.Provider
      value={{
        userContact,
        setUserContact,
        addContact,
        updateContact,
        deleteContact,
        setPrimaryContact,
        getPrimaryContact,
        getTrustedContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook
export function useContacts() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error(
      "useContacts must be used within a ContactDataProvider"
    );
  }

  return context;
}
