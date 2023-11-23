import Image from "next/image";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
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

  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfile(data.user);
      });
  }, []);



  const jadwalKelas = new Date(props.jadwal);

  const tahunKelas = jadwalKelas.getFullYear();
  const bulanKelas = jadwalKelas.getMonth();
  const tanggalKelas = jadwalKelas.getDate();
  const jamKelas = jadwalKelas.getHours();
  const menitKelas =
    (jadwalKelas.getMinutes() < 10 ? "0" : "") + jadwalKelas.getMinutes();

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
            <p className="text-sm">{jadwalfix}</p>
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
          {props.user === props.kapasitas ? (
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="ml-[180px] md:ml-[200px] w-1/2 mt-[10px]"
            >
              Kelas Penuh
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
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
                  <DialogDescription>{props.instruktur}</DialogDescription>
                </DialogHeader>
                <hr></hr>
                <p className="text-lg mt-[20px]">{props.deskripsi}</p>
                <div className="flex justify-between mt-[40px]">
                  <p className="font-bold">Jadwal</p>
                  <p>
                    {tanggalKelas} {bulanKelas} {tahunKelas}
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p className="font-bold">Harga</p>
                  <p>{props.harga}</p>
                </div>
                <div class="inline-flex items-center justify-center w-full mt-[10px]">
                  <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <span class="absolute px-3  font-medium bg-black -translate-x-[4px] text-white ">
                    Daftar
                  </span>
                </div>
                <form className="" onSubmit={submitHandler}>
                  <div className="flex justify-center">
                  {(profile.role === "NM") ?
                    <Link href="/payment">
                      <Button
                        variant="yellow_full"
                        className=" w-full py-3"
                        type="submit"
                      >
                        Lanjut ke Pembayaran
                      </Button>
                    </Link> :
                    <Button
                      variant="yellow_full"
                      className=" w-full py-3"
                      type="submit"
                    >
                      Daftar
                      </Button>
                  }
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
