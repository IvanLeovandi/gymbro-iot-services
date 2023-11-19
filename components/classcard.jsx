import Image from "next/image";
import Card from "../public/card.png";
import Img_dum from "../public/image_dummy.jpg";
import { Button } from "@/components/ui/button";
import { toDateString } from "date";

const ClassCard = (props) => {
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
          <Button
            variant="yellow_outline"
            onClick={props.handleShowModal}
            className="ml-[240px] md:ml-[280px]"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
