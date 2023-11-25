import Image from "next/image";
import Navbar from "@/components/navbar";
import Logo from "../../../public/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useRef } from "react";
import NotificationContext from "@/context/notification-context";
import { useState } from "react";
import { useRouter } from "next/router";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const namaRef = useRef();
  const teleponRef = useRef();
  const emailRef = useRef();
  const alamatRef = useRef();
  const usiaRef = useRef();
  const jenisKelaminRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
    const enteredProfileImage = imageUrl;

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
      profileImage: enteredProfileImage,
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
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong|",
          status: "error",
        });
      })
      .then(() => {
        router.replace("/authentication/login");
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
            <Label className="">Nama Lengkap</Label>
            <Input
              placeholder="Nama"
              ref={namaRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Nomor Telepon</Label>
            <Input
              placeholder="08..."
              ref={teleponRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Email</Label>
            <Input
              placeholder="Email"
              ref={emailRef}
              type="email"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Alamat</Label>
            <Input
              placeholder="Alamat"
              ref={alamatRef}
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Usia</Label>
            <Input
              placeholder="Usia (>= 15)"
              ref={usiaRef}
              type="number"
              min="15"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Jenis Kelamin</Label>
            <Input
              placeholder="Laki-laki / Perempuan"
              ref={jenisKelaminRef}
              type=""
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Username</Label>
            <Input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
            />
            <Label className="">Password</Label>
            <Input
              ref={passwordRef}
              type="password"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
              placeholder="password"
            />
            <Label className="">Confirm Password</Label>
            <Input
              ref={confirmPasswordRef}
              type="password"
              className="border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
              required
              placeholder="confirm password"
            />

            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Class Image"
                width={1000}
                height={1000}
                className="w-full h-5/6 object-cover mt-3"
              />
            ) : (
              <div>
                <Label>Upload Foto Profil</Label>
                <UploadDropzone
                  required
                  className="bg-slate-200 h-full"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res[0].url);
                    setImageUrl(res[0].url);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}

            {imageUrl && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => setImageUrl("")}
                  variant="yellow_outline"
                >
                  Change Image
                </Button>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                variant="yellow_outline"
                className="my-8 w-1/2"
                type="submit"
              >
                Daftar
              </Button>
            </div>
            <p className="text-center text-xs">
              Already have an account?
              <Link
                href="/authentication/login"
                className="text-[#FFD700] hover:text-yellow-500 ml-2"
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
