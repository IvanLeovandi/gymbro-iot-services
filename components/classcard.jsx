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
} from "@/components/ui/dialog";

const ClassCard = (props) => {
  const jadwalKelas = new Date(props.jadwal);

  const tahunKelas = jadwalKelas.getFullYear();
  const bulanKelas = jadwalKelas.getMonth();
  const tanggalKelas = jadwalKelas.getDate();
  const jamKelas = jadwalKelas.getHours();
  const menitKelas = (jadwalKelas.getMinutes() < 10 ? '0': '')+jadwalKelas.getMinutes();;

  const jadwalfix = `${tanggalKelas}-${bulanKelas}-${tahunKelas} ${jamKelas}:${menitKelas}`;

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div key={props.id} className="flex ml-auto mr-auto mt-[30px]">
      <div className="relative">
        <Image
          src={Card}
          alt="Card"
          className="w-[420px] md:w-[480px] h-[620px]"
        />
        <div className="absolute top-[20px] left-[30px] md:left-[40px] w-[360px] md:w-[400px]">
          <Image
            src={props.gambar}
            alt="image fitnes"
            width={1000}
            height={1000}
            className="w-[360px] md:w-[400px]  h-[300px]  py-[5px] ml-auto mr-auto"
          />
          <div className="flex justify-between items-center my-2">
            <div className="">
              <h3 className=" text-xl font-bold">{props.judul}</h3>
            </div>
            <p className="text-sm">{jadwalfix}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm">{props.tipe}</p>
            <p className="text-sm">{props.instruktur}</p>
          </div>
          <hr className=" w-[360px] h-[1.5px] my-4 bg-gradient-to-r from-transparent via-white to-transparent" />
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
          <div className="flex justify-end gap-4 mt-2">
            <div>
              {/* Edit */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="yellow_outline"
                    onClick={props.handleShowModal}
                    className=""
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Class</DialogTitle>
                    <DialogDescription>Please Fill the Required Field</DialogDescription>
                  </DialogHeader>
                  <form className="mt-[5px]" onSubmit={submitHandler}>
                    <label className="">Nama Lengkap</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" />
                    <label className="">Nomor Telepon</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" />
                    <label className="">Email</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2" />
                    <div className="flex justify-center">
                      <Button
                        variant="yellow_full"
                        className="my-[40px] w-full py-3"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              {/* Daftar */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="yellow_outline"
                    onClick={props.handleShowModal}
                    className=""
                  >
                    Daftar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{props.judul}</DialogTitle>
                    <DialogDescription>{props.instruktur}</DialogDescription>
                  </DialogHeader>
                  <hr></hr>
                  <p className="text-lg mt-[20px]">{props.deskripsi}</p>
                  <div className="flex justify-between mt-[40px]">
                    <p className="font-bold">Jadwal</p>
                    <p>
                      {tanggalKelas}-{bulanKelas}-{tahunKelas}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <p className="font-bold">Harga</p>
                    <p>Rp {props.harga}</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-full mt-[10px]">
                    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <span className="absolute px-3  font-medium bg-black -translate-x-[4px] text-white ">
                      Daftar
                    </span>
                  </div>
                  <form className="mt-[5px]" onSubmit={submitHandler}>
                    <label className="">Nama Lengkap</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" />
                    <label className="">Nomor Telepon</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2 mb-4" />
                    <label className="">Email</label>
                    <Input className="bg-white border-none outline-none focus:outline-[#FFD700] mt-2" />
                    <div className="flex justify-center">
                      <Button
                        variant="yellow_full"
                        className="my-[40px] w-full py-3"
                        type="submit"
                      >
                        Lanjut ke Pembayaran
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
