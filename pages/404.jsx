import Navbar from "../components/navbar";
import Image from "next/image";
import NotFoundImage from "../public/not-found.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/2">
          <Image src={NotFoundImage} alt="not found image" />
        </div>
        <div className="w-full md:w-2/5 px-20 mt-[50px]">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-sans mb-10">We cant seem to find the page you&apos;re looking for</h1>
          <Link href="/" className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-4 py-2">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
