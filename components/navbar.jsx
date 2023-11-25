import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function navbar() {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <Fragment>
      <div className="flex justify-around items-center py-4 bg-[#4B4B4B] bg-opacity-80 m-8">
        {/* <a href="/">
        <Image src={Logo} alt="logo" width={250} height={70} />
        </a> */}
        <Link href="/">
          <Image src={Logo} alt="logo" className=" w-[180px] h-[55px] md:w-[250px] md:h-[70px]" />
        </Link>
        <div>
          <ul className="hidden md:flex justify-evenly gap-12">
            {session && (
              <li>
                <Link
                  href="/profile"
                  className="hover:text-[#FFD700]"
                >
                  My Profile
                </Link>
              </li>
            )}
            <li>
              <Link href="/classes" className="hover:text-[#FFD700]">
                Classes
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-evenly gap-6">
          {!session &&  (
            <Link
              href="/authentication/login"
              className="hidden md:block text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-8 py-2 hover:bg-[#FFD700] hover:text-black"
            >
              Login
            </Link>
          )}
          {!session  && (
            <Link
              href="/authentication/register"
              className="hidden md:block text-white font-sans border border-solid border-white rounded-lg px-6 py-2 hover:bg-white hover:text-black"
            >
              Register
            </Link>
          )}
          {session && (
            <button
              className="hidden md:block text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-8 py-2 hover:bg-[#FFD700] hover:text-black"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}

          <div onClick={handleNav} className="block lg:hidden z-[110]">
            {nav ? (
              <AiOutlineClose
                className="z-[110]"
                size={30}
                style={{ color: `white` }}
              />
            ) : (
              <AiOutlineMenu style={{ color: "white" }} size={30} />
            )}
          </div>
          <div
            className={`lg:hidden fixed z-[100] top-0 ${
              nav ? "translate-x-0" : "translate-x-full"
            } transition duration-300 right-0 bottom-0 flex justify-center items-center w-[80vw] h-screen bg-[#4B4B4B] text-center text-white`}
          >
            <ul>
              {session && (
                <li onClick={handleNav} className="p-4">
                  <Link
                    href="/profile"
                    className="hover:opacity-70 hover:text-[#FFD700]"
                  >
                    My Profile
                  </Link>
                </li>
              )}
              <li onClick={handleNav} className="p-4">
                <Link
                  href="/classes"
                  className="hover:opacity-70 hover:text-[#FFD700]"
                >
                  Classes
                </Link>
              </li>

              {!session && (
                <ul>
                  <li onClick={handleNav} className="p-4">
                    <Link
                      href="/authentication/login"
                      className="hover:opacity-70 hover:text-[#FFD700]"
                    >
                      Login
                    </Link>
                  </li>
                  <li onClick={handleNav} className="p-4">
                    <Link
                      href="/authentication/register"
                      className="hover:opacity-70 hover:text-[#FFD700]"
                    >
                      Register
                    </Link>
                  </li>{" "}
                </ul>
              )}

              {session && (
                <ul>
                  <li onClick={handleNav} className="p-4">
                    <Link
                      href="/"
                      onClick={logoutHandler}
                      className="hover:opacity-70 hover:text-[#FFD700]"
                    >
                      Logout
                    </Link>
                  </li>{" "}
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
