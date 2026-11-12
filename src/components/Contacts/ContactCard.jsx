const ContactCard = ({ contact }) => {
  return (
    <div className="w-60  h-60 p-2 cursor-pointer hover:scale-104 transition-all ease-in hover:bg-zinc-200 flex flex-col gap-2 rounded-xl bg-white border-zinc-200 border-2">
      <div className="flex justify-end">
        <h2 className="text-[12px] p-1 max-w-fit  bg-green-100 border-2 border-green-400 text-green-500">
          {contact.status}
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className=" h-15 w-15 rounded-full bg-amber-200 overflow-hidden">
          <img
            src={contact.avatar}
            className="h-full w-full object-cover"
            alt="avtar"
          />
        </div>
        <span className="text-black">{contact.name}</span>
      </div>

      <div className="w-full h-full bg-zinc-100 p-2 flex flex-col ">

        <div className="">
          <span className="text-[11px]">Relationship : {contact.relationship}</span>
        </div>

        <div>
          <span className="text-[11px]">Phone : {contact.phone}</span>
        </div>

        <div>
          <span className="text-[11px]">Email : {contact.email}</span>
        </div>


      </div>
    </div>
  );
};

export default ContactCard;
