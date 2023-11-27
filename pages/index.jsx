import Hero from "../public/hero.png";
import Image from "next/image";
import Navbar from "../components/navbar"
import { Noticia_Text } from 'next/font/google'
import Link from "next/link";

const noticia_text = Noticia_Text({
  weight: '400', // if single weight, otherwise you use array like [400, 500, 700],
  style: 'normal', // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ['latin'],
})


const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center px-20  h-fit">
      <div className=" md:hidden">
        <Image src={Hero} className="h-[full] w-full ml-auto mr-auto" alt="hero image" />
      </div>
        <div className=" mt-[5vw] w-full md:w-1/2">
          <h1 className={`${noticia_text.className} text-white text-3xl md:text-5xl lg:text-7xl font-sans`}>Welcome to the</h1>
          <h1 className={`${noticia_text.className} text-[#FFD700] text-3xl md:text-5xl lg:text-7xl font-sans`}>Jungle</h1>
          <p className={`${noticia_text.className} mt-10 mb-20`}>
            Discover your greatest potential and expedite your fitness journey with GymBros. Embrace the challenge and roar with determination with our diverse classes and personalized training programs. Join us and bring yourself closer to
            conquering your fitness dreams in a jungle of endless possibilities
          </p>
          <Link href="/classes" className="text-[#FFD700] font-sans border border-solid border-[#FFD700] rounded-lg px-4 py-2">
            Learn More
          </Link>
        </div>
        <div className="hidden md:block">
          <Image src={Hero} className=" h-[39vw] w-[39vw] object-fill" alt="hero image" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
