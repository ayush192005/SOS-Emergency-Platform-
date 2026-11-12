import Image from '../assets/Logo.webp'
const Logo = () => {
  return (
    <div
      className={`h-10 w-10 bg-red-600  flex items-center  justify-center rounded-full shrink-0  /> `}>
      <img
        src={Image}
        alt="SOS Logo"
        className="w-full h-full object-contain shrink-0"
      />
    </div>
  );
};

export default Logo;
