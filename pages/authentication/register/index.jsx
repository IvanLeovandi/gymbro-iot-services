import Image from "next/image";
import Navbar from "components/navbar";
import Logo from "../../../public/logo.png";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";

const RegisterPage = () => {
  return (
    <div className="">
      <Navbar />
      {/* Register Card */}
      <div className="border border-solid border-white rounded-xl px-12 py-8 w-1/3 mx-auto">
        <Image src={Logo} alt="logo" className="mx-auto my-16" />
        <div className="">
          <form action="">
            <label className="">Full Name</label>
            <Input placeholder="" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Phone Number</label>
            <Input className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Email</label>
            <Input type="email" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Address</label>
            <Input className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Age</label>
            <Input type="number" min="15" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Gender</label>
            <Input type="" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Username</label>
            <Input type="text" placeholder="" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Password</label>
            <Input type="password" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <label className="">Confirm Password</label>
            <Input type="password" className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" required />
            <div className="flex justify-center">
              <Button variant="ghost" className="my-8 w-1/2">
                Register
              </Button>
            </div>
            <p className="text-center text-xs">
              Already have an account?{" "}
              <a href="/authentication/login" className="text-[#FFD700] hover:text-yellow-500">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
