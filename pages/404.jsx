import Navbar from "../components/navbar";
import Image from "next/image";
import NotFoundImage from "../public/not-found.png";

export default function NotFound() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="w-1/2">
          <Image src={NotFoundImage} alt="not found image" />
        </div>
        <div className="w-2/5 px-20">
          <h1 className="lg:text-7xl font-sans mb-10">
            We cant seem to find the page you're looking for
          </h1>
          <a
            href="/"
            className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-4 py-2"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
}
