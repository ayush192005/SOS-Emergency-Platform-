import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = createContext();
export const ContactDataProvider = ({ children }) => {
 

const [userContact, setUserContact] = useState([
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul.sharma@gmail.com",
    relationship: "Brother",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Active",
    trustLevel: "Trusted",
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
  },
]);

  return (
    <ContactContext.Provider value={{ userContact, setUserContact }}>
      {children}
    </ContactContext.Provider>
  );
};
