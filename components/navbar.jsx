import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";

export default function navbar() {
  return (
    <div className="flex justify-around items-center py-4 bg-[#4B4B4B] bg-opacity-80 m-8">
      {/* <a href="/">
        <Image src={Logo} alt="logo" width={250} height={70} />
      </a> */}
      <Link href="/">
        <Image src={Logo} alt="logo" width={250} height={70} />
      </Link>
      <div>
        <ul className="flex justify-evenly gap-12">
          <li>
            <Link href="/user/member/userid" className="hover:text-[#FFD700]">
              My Profile
            </Link>
          </li>
          <li>
            <Link href="/classes" className="hover:text-[#FFD700]">
              Classes
            </Link>
          </li>
          <li>
            <Link href="/admin" className="hover:text-[#FFD700]">
              Admin
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-evenly gap-6">
        <Link
          href="/authentication/login"
          className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-8 py-2 hover:bg-[#FFD700] hover:text-black"
        >
          Login
        </Link>
        <Link
          href="/authentication/register"
          className="text-white font-sans border border-solid border-white rounded-lg px-6 py-2 hover:bg-white hover:text-black"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
