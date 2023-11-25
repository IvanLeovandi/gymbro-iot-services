import React, { useEffect } from "react";
import Image from "next/image";
import PlaceholderImage from "../public/placeholder.png";
import Card from "../public/card.png";
import { EditMemberModal } from "./EditMemberModal";
import { SendNotificationModal } from "./SendNotificationModal";
import SeePaymentModal from "./SeePaymentModal";
import { useState } from "react";

export default function Membercard({
  item,
  editMemberHandler,
  addNotification,
  payment,
}) {
  const [image, setImage] = useState(PlaceholderImage);

  useEffect(() => {
    if (item.profileImage) {
      setImage(item.profileImage);
    }
  });

  return (
    <div className="relative w-[400px] h-[570px] mx-auto mt-[30px]">
      <Image src={Card} alt="Card" className="w-full h-full" />
      <div className="absolute top-[1.5vw] left-[2vw] right-[2vw]">
        <Image
          src={image}
          width={1000}
          height={1000}
          alt="image fitnes"
          className="w-[300px] h-[300px] mx-auto py-2"
        />
        <hr className=" w-[280px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-[5px]" />
        <div className="relative flex-col justify-center items-center text-center">
          <div className="my-5">
            <div className="flex-col justify-center items">
              <p className="font-bold mb-2">{item.nama}</p>
            </div>
            <EditMemberModal user={item} onEditMember={editMemberHandler} />
            <SeePaymentModal user={item} />
            <SendNotificationModal
              item={item}
              onAddNotification={addNotification}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
