import ContactData from "../components/Contacts/ContactCardData";
import ContactCard from "../components/Contacts/ContactCard";

const Contacts = () => {
  return (
    <div className="min-h-[calc(100vh-1.5rem)] bg-zinc-100 rounded-2xl md:rounded-3xl m-3 py-8">
      <div id="cardFrame" className="h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center overflow-auto">
        {ContactData.map((CardItem, idx) => {
          return <ContactCard key={idx} contact={CardItem} />;
        })}
      </div>
    </div>
  );
};

export default Contacts;
