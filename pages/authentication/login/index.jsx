import Image from "next/image";
import Navbar from "@/components/navbar";
import Logo from "../../../public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });

    if (!result.error) {
      router.replace('/user/member/userId');
    }
  };
  return (
    <div className="">
      <Navbar />
      {/* Login Card */}
      <div className="border border-solid border-white rounded-xl px-12 py-8 w-1/3 mx-auto">
        <Image src={Logo} alt="logo" className="mx-auto my-16" />
        <div>
          <form onSubmit={submitHandler}>
            <label className="">Username</label>
            <Input
              className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              ref={usernameRef}
            />
            <label className="">Password</label>
            <Input
              className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2"
              ref={passwordRef}
            />
            <div className="flex justify-center">
              <Button variant="ghost" className="my-8 w-1/2" type="submit">
                Login
              </Button>
            </div>
            <p className="text-center text-xs">
              Don't have an account?{" "}
              <a
                href="/authentication/register"
                className="text-[#FFD700] hover:text-yellow-500"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
