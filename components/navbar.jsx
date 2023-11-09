import Image from "next/image";
import Logo from "../public/logo.png";

export default function navbar() {
  return (
    <div className="flex justify-around items-center py-4 bg-gray-800 m-8">
      <a href="/">
        <Image src={Logo} alt="logo" width={250} height={70} />
      </a>
      <div>
        <ul className="flex justify-evenly gap-12">
          <li>
            <a href="" className="hover:text-[#FFD700]">Membership</a>
          </li>
          <li>
            <a href="" className="hover:text-[#FFD700]">Classes</a>
          </li>
          <li>
            <a href="" className="hover:text-[#FFD700]">About</a>
          </li>
          <li>
            <a href="" className="hover:text-[#FFD700]">Contact</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-evenly gap-6">
        <a href="/authentication/login" className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-8 py-2 hover:bg-[#FFD700] hover:text-black">
          Login
        </a>
        <a href="/authentication/register" className="text-white font-sans border border-solid border-white rounded-lg px-6 py-2 hover:bg-white hover:text-black">
          Register
        </a>
      </div>
    </div>
  );
}
