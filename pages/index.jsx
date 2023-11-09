import { useEffect, useState } from "react";
import Hero from "../public/hero.png";
import Image from "next/image";
import Navbar from "../components/navbar"

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center px-20 py-10 h-fit">
        <div className="w-1/2">
          <h1 className="text-white lg:text-7xl font-sans">Welcome to the</h1>
          <h1 className="text-[#FFD700] lg:text-7xl font-sans">Jungle</h1>
          <p className="mt-10 mb-20">
            Discover your greatest potential and expedite your fitness journey with GymBros. Embrace the challenge and roar with determination with our diverse classes and personalized training programs. Join us and bring yourself closer to
            conquering your fitness dreams in a jungle of endless possibilities
          </p>
          <a href="" className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-4 py-2">
            Learn More
          </a>
        </div>
        <div>
          <Image src={Hero} alt="hero image" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
