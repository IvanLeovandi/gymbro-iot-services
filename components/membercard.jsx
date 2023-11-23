import React from "react";
import Image from "next/image";
// import { Button } from './ui/button'
import Dummy from "../public/image_dummy.jpg";
import Card from "../public/card.png";
import { Button } from "@/components/ui/button";
import { Dice1 } from "lucide-react";
import { EditMemberModal } from "./EditMemberModal";
import { SendNotificationModal } from "./SendNotificationModal";

export default function Membercard({ item, editMemberHandler, addNotification }) {
  return (
    <div className="relative w-[400px] h-[570px] mx-auto mt-[30px]">
      <Image src={Card} alt="Card" className="w-full h-full" />
      <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
        <Image src={Dummy} alt="image fitnes" className="w-[300px] h-[300px] mx-auto py-2" />
        <hr className=" w-[280px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]" />
        <div className="relative flex-col justify-center items-center text-center">
          <div className="my-5">
            <div className="flex-col justify-center items">
              <p className="font-bold mb-2">{item.nama}</p>
            </div>
            <EditMemberModal user={item} onEditMember={editMemberHandler} />
            <Button
              variant="yellow_outline"
              // onClick={props.handleShowModal}
              className="mx-auto my-2 w-60"
            >
              Check Payment
            </Button>
            <SendNotificationModal item={item}
              onAddNotification={addNotification}/>
          </div>
        </div>
      </div>
    </div>
  );
}
