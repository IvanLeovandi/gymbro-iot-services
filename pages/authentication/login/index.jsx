import Image from "next/image";
import Navbar from "@/components/navbar";
import Logo from "../../../public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="">
      <Navbar />
      {/* Login Card */}
      <div className="border border-solid border-white rounded-xl px-12 py-8 w-1/3 mx-auto">
        <Image src={Logo} alt="logo" className="mx-auto my-16" />
        <div>
          <form action="">
            <label className="">Username</label>
            <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" />
            <label className="">Password</label>
            <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2" />
            <div className="flex justify-center">
              <Button variant="ghost" className="my-8 w-1/2">
                Login
              </Button>
            </div>
            <p className="text-center text-xs">Don't have an account? <a href="/authentication/register" className="text-[#FFD700] hover:text-yellow-500">Register here</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
