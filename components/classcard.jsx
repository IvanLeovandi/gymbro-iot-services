import Image from "next/image";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ClassCard = (props) => {

  const submitHandler = async (event) => {
    event.preventDefault();

    /*
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });

    console.log(result);

    //       if (!result.error) {
    //         const role = result.user.role;
    //         const userId = result.user._id;
    // ;       router.replace(`/${role}/${userId}`);
    //       }
    */
  };

  return (
    <div key={props.id} className="flex ml-auto mr-auto mt-[30px]">
      <div className="relative">
        <Image
          src={Card}
          alt="Card"
          className="w-[420px] md:w-[480px] h-[580px]"
        />
        <div className="absolute top-[20px] left-[30px] md:left-[40px] w-[360px] md:w-[400px]">
          <Image
            src={Img_dum}
            alt="image fitnes"
            className="w-[360px] md:w-[400px]  h-[300px]  py-[5px] ml-auto mr-auto"
          />
          <div className="flex justify-between items-center">
            <div>
              <h3 className=" text-xl font-bold">{props.tipe}</h3>
              <p className="text-sm">{props.instruktur}</p>
            </div>
            <p className="text-sm">{props.jadwal.toString()}</p>
          </div>
          <hr className=" w-[360px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]" />
          <p className="mt-[5px] h-[70px]">{props.deskripsi}</p>

          <div className="flex">
            <div className="flex-col">
              <p className="font-bold">Harga</p>
              <p className="mb-[10px] text-md">Rp {props.harga}</p>
            </div>

            <div className="flex-col ml-[100px]">
              <p className="font-bold">Kuota</p>
              <p className="mb-[10px] text-md">
                {props.user}/{props.kapasitas}
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
            <Button
              type = "button"
              variant="yellow_outline"
              onClick={props.handleShowModal}
              className="ml-[240px] md:ml-[280px]"
            >
              Daftar
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{props.tipe}</DialogTitle>
                <DialogDescription>
                  {props.instruktur}
                </DialogDescription>
              </DialogHeader>
              <hr></hr>
              <p className="text-lg mt-[20px]">
                {props.deskripsi}
              </p>
              <div className="flex justify-between mt-[40px]">
                <p className="font-bold">Jadwal</p>
                <p>{props.jadwal}</p>
              </div>
              <div className="flex justify-between ">
                <p className="font-bold">Harga</p>
                <p>{props.harga}</p>
              </div>
              <div class="inline-flex items-center justify-center w-full mt-[10px]">
                  <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                  <span class="absolute px-3  font-medium bg-black -translate-x-[4px] text-white ">Daftar</span>
              </div>
              <form className="mt-[5px]" onSubmit={submitHandler}>
                <label className="">Nama Lengkap</label>
                <Input
                  className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4"
                />
                <label className="">Nomor Telepon</label>
                <Input
                  className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" 
                />
                <label className="">Email</label>
                <Input
                  className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2"
                />
                <div className="flex justify-center">
                  <Button variant="yellow_full"  className="my-[40px] w-full py-3" type="submit">
                    Lanjut ke Pembayaran
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
