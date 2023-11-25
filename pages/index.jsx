import Hero from "../public/hero.png";
import Image from "next/image";
import Navbar from "../components/navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center px-20 py-10 h-fit">
        <div className="w-1/2">
          <h1 className="text-white lg:text-7xl font-sans">Welcome to the</h1>
          <h1 className="text-[#FFD700] lg:text-7xl font-sans">Jungle</h1>
          <p className="mt-10 mb-20">
            Discover your greatest potential and expedite your fitness journey
            with GymBros. Embrace the challenge and roar with determination with
            our diverse classes and personalized training programs. Join us and
            bring yourself closer to conquering your fitness dreams in a jungle
            of endless possibilities
          </p>
        </div>
        <div>
          <Image src={Hero} alt="hero image" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
