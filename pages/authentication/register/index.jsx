import Image from "next/image";
import Navbar from "@/components/navbar";
import Logo from "../../../public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useContext, useRef } from "react";
import NotificationContext from "@/context/notification-context";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const namaRef = useRef();
  const teleponRef = useRef();
  const emailRef = useRef();
  const alamatRef = useRef();
  const usiaRef = useRef();
  const jenisKelaminRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [success, setSuccess] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNama = namaRef.current.value;
    const enteredTelepon = teleponRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredAlamat = alamatRef.current.value;
    const enteredUsia = usiaRef.current.value;
    const enteredJenisKelamin = jenisKelaminRef.current.value;
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    const newRegisteredUser = {
      nama: enteredNama,
      telepon: enteredTelepon,
      email: enteredEmail,
      alamat: enteredAlamat,
      usia: enteredUsia,
      jenisKelamin: enteredJenisKelamin,
      username: enteredUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    notificationCtx.showNotification({
      title: "Registrasi akun",
      message: "Meregistrasikan akun anda",
      status: "pending",
    });

    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(newRegisteredUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response
          .json()
          .then((data) => {
            throw new Error(data.message || "Something went wrong");
          })
          .catch((error) => {
            notificationCtx.showNotification({
              title: "Error",
              message: error.message || "Something went wrong|",
              status: "error",
            });
          });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Registrasi berhasil",
          message: "Akun berhasil didaftarkan",
          status: "success",
        });
        setSuccess(true);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong|",
          status: "error",
        });
      }).then(() => {
        router.replace('/authentication/login')
      });
  };

  return (
    <div className="">
      <Navbar />
      {/* Register Card */}
      <div className="border border-solid border-white rounded-xl px-12 py-8 w-1/3 mx-auto">
        <Image src={Logo} alt="logo" className="mx-auto my-16" />
        <div className="">
          <form onSubmit={submitHandler} action="">
            <label className="">Full Name</label>
            <Input
              placeholder="Nama"
              ref={namaRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Phone Number</label>
            <Input
              placeholder="08..."
              ref={teleponRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Email</label>
            <Input
              placeholder="Email"
              ref={emailRef}
              type="email"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Address</label>
            <Input
              placeholder="Alamat"
              ref={alamatRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Age</label>
            <Input
              placeholder="Usia (>= 15)"
              ref={usiaRef}
              type="number"
              min="15"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Gender</label>
            <Input
              placeholder="Laki-laki / Perempuan"
              ref={jenisKelaminRef}
              type=""
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Username</label>
            <Input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <label className="">Password</label>
            <Input
              ref={passwordRef}
              type="password"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
              placeholder="password"
            />
            <label className="">Confirm Password</label>
            <Input
              ref={confirmPasswordRef}
              type="password"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
              placeholder="confirm password"
            />
            <div className="flex justify-center">
              <Button variant="ghost" className="my-8 w-1/2" type="submit">
                Register
              </Button>
            </div>
            <p className="text-center text-xs">
              Already have an account?{" "}
              <Link
                href="/authentication/login"
                className="text-[#FFD700] hover:text-yellow-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
