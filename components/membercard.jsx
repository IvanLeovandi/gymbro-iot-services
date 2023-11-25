import React, { useEffect } from "react";
import Image from "next/image";
// import { Button } from './ui/button'
import PlaceholderImage from "../public/placeholder.png";
import Card from "../public/card.png";
import { Button } from "@/components/ui/button";
import { Dice1 } from "lucide-react";
import { EditMemberModal } from "./EditMemberModal";
import { SendNotificationModal } from "./SendNotificationModal";
import SeePaymentModal from "./SeePaymentModal";
import { useState } from "react";
import PageLoader from "./PageLoader";

export default function Membercard({ user, editMemberHandler, addNotification }) {
  const [image, setImage] = useState(PlaceholderImage);

  useEffect(() => {
    if (user.profileImage) {
      setImage(user.profileImage);
    }
  });

  return (
    <div className="relative w-[400px] h-[570px] mx-auto mt-[30px]">
      <Image src={Card} alt="Card" className="w-full h-full" />
      <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
        <Image src={image} width={1000} height={1000} alt="image fitnes" className="w-[300px] h-[300px] mx-auto py-2" />
        <hr className=" w-[280px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]" />
        <div className="relative flex-col justify-center items-center text-center">
          <div className="my-5">
            <div className="flex-col justify-center items">
              <p className="font-bold mb-2">{user.nama}</p>
            </div>
            <EditMemberModal user={user} onEditMember={editMemberHandler} />
            <SeePaymentModal user={user}/>
            <SendNotificationModal user={user}
              onAddNotification={addNotification}/>
          </div>
        </div>
      </div>
    </div>
  );
}
